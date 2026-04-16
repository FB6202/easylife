package com.easylife.app.todos;

import com.easylife.app.shared.AccessType;
import com.easylife.app.shared.Priority;
import com.easylife.app.shared.TodoStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findAllByUserId(Long userId);

    List<Todo> findAllByUserIdAndStatus(Long userId, TodoStatus status);

    List<Todo> findAllByUserIdAndPriority(Long userId, Priority priority);

    List<Todo> findAllByUserIdAndAccessType(Long userId, AccessType accessType);

    List<Todo> findAllByUserIdOrderByDueDateAsc(Long userId);

    List<Todo> findAllByUserIdAndDueDateBefore(Long userId, LocalDate date);

    Optional<Todo> findByIdAndUserId(Long id, Long userId);

}
