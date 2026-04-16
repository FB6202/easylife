package com.easylife.app.notifications;

import com.easylife.app.shared.NotificationChannel;
import com.easylife.app.shared.NotificationType;
import com.easylife.app.shared.ReferenceType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "notifications")
class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    private String message;
    private Long referenceId;
    private Boolean read;
    private LocalDateTime scheduledAt;
    private LocalDateTime sentAt;
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private NotificationType type;
    @Enumerated(EnumType.STRING)
    private NotificationChannel channel;
    @Enumerated(EnumType.STRING)
    private ReferenceType referenceType;

    @Column(nullable = false)
    private Long userId;

}
