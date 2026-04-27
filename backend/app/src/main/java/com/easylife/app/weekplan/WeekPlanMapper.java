package com.easylife.app.weekplan;

import com.easylife.app.shared.enums.WeekPlanStatus;
import com.easylife.app.weekplan.api.WeekPlanRequest;
import com.easylife.app.weekplan.api.WeekPlanResponse;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Component
class WeekPlanMapper {

    public WeekPlanResponse toResponse(WeekPlan weekPlan) {
        return new WeekPlanResponse(
                weekPlan.getId(),
                weekPlan.getTitle(),
                weekPlan.getIntention(),
                weekPlan.getStartDate(),
                weekPlan.getEndDate(),
                weekPlan.getStatus(),
                weekPlan.getReflection(),
                weekPlan.getCreatedAt(),
                weekPlan.getUpdatedAt(),
                weekPlan.getCategoryIds()
        );
    }

    public WeekPlan toEntity(WeekPlanRequest request, Long userId) {
        return WeekPlan.builder()
                .title(request.title())
                .intention(request.intention())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .status(request.status() != null ? request.status() : WeekPlanStatus.DRAFT)
                .reflection(request.reflection())
                .createdAt(LocalDateTime.now())
                .userId(userId)
                .categoryIds(request.categoryIds() != null ? request.categoryIds() : new ArrayList<>())
                .build();
    }

    public void update(WeekPlan weekPlan, WeekPlanRequest request) {
        weekPlan.setTitle(request.title());
        weekPlan.setIntention(request.intention());
        weekPlan.setStartDate(request.startDate());
        weekPlan.setEndDate(request.endDate());
        weekPlan.setStatus(request.status());
        weekPlan.setReflection(request.reflection());
        weekPlan.setCategoryIds(request.categoryIds() != null ? request.categoryIds() : new ArrayList<>());
    }

}
