package com.easylife.app.weekplan;

import com.easylife.app.categories.api.CategoryApi;
import com.easylife.app.shared.enums.WeekPlanStatus;
import com.easylife.app.shared.payload.PageResponse;
import com.easylife.app.weekplan.api.WeekPlanFilter;
import com.easylife.app.weekplan.api.WeekPlanRequest;
import com.easylife.app.weekplan.api.WeekPlanResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
class WeekPlanServiceImpl implements WeekPlanService {

    private final WeekPlanRepository weekPlanRepository;
    private final WeekPlanMapper weekPlanMapper;
    private final CategoryApi categoryApi;

    private void validateCategories(List<Long> categoryIds, Long userId) {
        if (categoryIds != null && !categoryIds.isEmpty()) {
            if (categoryIds.size() > 5) {
                throw new IllegalArgumentException("Maximum 5 categories allowed");
            }
            categoryIds.forEach(categoryId -> {
                if (!categoryApi.existsByIdAndUserId(categoryId, userId)) {
                    throw new EntityNotFoundException("Category not found: " + categoryId);
                }
            });
        }
    }

    @Override
    public WeekPlanResponse create(WeekPlanRequest request, Long userId) {
        if (request.endDate().isBefore(request.startDate())) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }
        validateCategories(request.categoryIds(), userId);
        WeekPlan weekPlan = weekPlanMapper.toEntity(request, userId);
        weekPlan.setCreatedAt(LocalDateTime.now());
        return weekPlanMapper.toResponse(weekPlanRepository.save(weekPlan));
    }

    @Override
    public WeekPlanResponse findById(Long id, Long userId) {
        return weekPlanRepository.findByIdAndUserId(id, userId)
                .map(weekPlanMapper::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Week plan not found"));
    }

    @Override
    public PageResponse<WeekPlanResponse> findAll(Long userId, WeekPlanFilter filter, int page, int size) {
        Specification<WeekPlan> spec = WeekPlanSpecification.build(userId, filter);
        Page<WeekPlan> result = weekPlanRepository.findAll(spec,
                PageRequest.of(page, size, Sort.by("startDate").descending()));
        return new PageResponse<>(
                result.getContent().stream().map(weekPlanMapper::toResponse).toList(),
                result.getNumber(),
                result.getSize(),
                result.getTotalElements(),
                result.getTotalPages()
        );
    }

    @Override
    public WeekPlanResponse update(Long id, WeekPlanRequest request, Long userId) {
        WeekPlan weekPlan = weekPlanRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new EntityNotFoundException("Week plan not found"));
        if (request.endDate().isBefore(request.startDate())) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }
        validateCategories(request.categoryIds(), userId);
        weekPlanMapper.update(weekPlan, request);
        weekPlan.setUpdatedAt(LocalDateTime.now());
        return weekPlanMapper.toResponse(weekPlanRepository.save(weekPlan));
    }

    @Override
    public WeekPlanResponse updateStatus(Long id, WeekPlanStatus status, Long userId) {
        WeekPlan weekPlan = weekPlanRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new EntityNotFoundException("Week plan not found"));
        weekPlan.setStatus(status);
        weekPlan.setUpdatedAt(LocalDateTime.now());
        return weekPlanMapper.toResponse(weekPlanRepository.save(weekPlan));
    }

    @Override
    public WeekPlanResponse addReflection(Long id, String reflection, Long userId) {
        WeekPlan weekPlan = weekPlanRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new EntityNotFoundException("Week plan not found"));
        weekPlan.setReflection(reflection);
        weekPlan.setUpdatedAt(LocalDateTime.now());
        return weekPlanMapper.toResponse(weekPlanRepository.save(weekPlan));
    }

    @Override
    public void delete(Long id, Long userId) {
        WeekPlan weekPlan = weekPlanRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new EntityNotFoundException("Week plan not found"));
        weekPlanRepository.delete(weekPlan);
    }

}
