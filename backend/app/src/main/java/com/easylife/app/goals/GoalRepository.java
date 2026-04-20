package com.easylife.app.goals;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

interface GoalRepository extends JpaRepository<Goal, Long>, JpaSpecificationExecutor<Goal> {

    Optional<Goal> findByIdAndUserId(Long id, Long userId);

}
