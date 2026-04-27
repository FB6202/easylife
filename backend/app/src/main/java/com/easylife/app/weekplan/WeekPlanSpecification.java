package com.easylife.app.weekplan;

import com.easylife.app.shared.enums.WeekPlanStatus;
import com.easylife.app.weekplan.api.WeekPlanFilter;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.List;

class WeekPlanSpecification {

    static Specification<WeekPlan> build(Long userId, WeekPlanFilter filter) {
        return Specification
                .where(byUserId(userId))
                .and(byStatus(filter.status()))
                .and(byStartDateBetween(filter.startDateFrom(), filter.startDateTo()))
                .and(byCategoryIds(filter.categoryIds()));
    }

    private static Specification<WeekPlan> byUserId(Long userId) {
        return (root, query, cb) -> cb.equal(root.get("userId"), userId);
    }

    private static Specification<WeekPlan> byStatus(WeekPlanStatus status) {
        return (root, query, cb) -> status == null ? null
                : cb.equal(root.get("status"), status);
    }

    private static Specification<WeekPlan> byStartDateBetween(LocalDate from, LocalDate to) {
        return (root, query, cb) -> {
            if (from == null && to == null) return null;
            if (from == null) return cb.lessThanOrEqualTo(root.get("startDate"), to);
            if (to == null) return cb.greaterThanOrEqualTo(root.get("startDate"), from);
            return cb.between(root.get("startDate"), from, to);
        };
    }

    private static Specification<WeekPlan> byCategoryIds(List<Long> categoryIds) {
        return (root, query, cb) ->
                categoryIds == null || categoryIds.isEmpty() ? null
                        : root.join("categoryIds").in(categoryIds);
    }

}
