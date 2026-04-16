package com.easylife.app.goals;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "goal_tasks")
class GoalTask {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    private String description;
    private Boolean done;
    private Integer progressContribution; // amount of total goal in %
    private LocalDate dueDate;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "goal_id")
    private Goal goal;

}
