package com.easylife.app.weekplan;

import com.easylife.app.shared.enums.WeekPlanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

interface WeekPlanRepository extends JpaRepository<WeekPlan, Long>, JpaSpecificationExecutor<WeekPlan> {

    Optional<WeekPlan> findByIdAndUserId(Long id, Long userId);

    List<WeekPlan> findAllByUserIdAndStatus(Long userId, WeekPlanStatus status);

    List<WeekPlan> findAllByUserIdAndStartDateGreaterThanEqual(Long userId, LocalDate date);

    boolean existsByUserIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(Long userId, LocalDate endDate, LocalDate startDate);

}
