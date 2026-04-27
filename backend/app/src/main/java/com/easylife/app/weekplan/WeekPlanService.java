package com.easylife.app.weekplan;

import com.easylife.app.shared.enums.WeekPlanStatus;
import com.easylife.app.shared.payload.PageResponse;
import com.easylife.app.weekplan.api.WeekPlanFilter;
import com.easylife.app.weekplan.api.WeekPlanRequest;
import com.easylife.app.weekplan.api.WeekPlanResponse;

public interface WeekPlanService {

    WeekPlanResponse create(WeekPlanRequest request, Long userId);

    WeekPlanResponse findById(Long id, Long userId);

    PageResponse<WeekPlanResponse> findAll(Long userId, WeekPlanFilter filter, int page, int size);

    WeekPlanResponse update(Long id, WeekPlanRequest request, Long userId);

    WeekPlanResponse updateStatus(Long id, WeekPlanStatus status, Long userId);

    WeekPlanResponse addReflection(Long id, String reflection, Long userId);

    void delete(Long id, Long userId);

}
