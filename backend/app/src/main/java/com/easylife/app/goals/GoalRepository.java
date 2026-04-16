package com.easylife.app.goals;

import com.easylife.app.shared.AccessType;
import com.easylife.app.shared.GoalStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

interface GoalRepository extends JpaRepository<Goal, Long> {

    List<Goal> findAllByUserId(Long userId);

    List<Goal> findAllByUserIdAndStatus(Long userId, GoalStatus status);

    List<Goal> findAllByUserIdAndAccessType(Long userId, AccessType accessType);

    Optional<Goal> findByIdAndUserId(Long id, Long userId);

}
