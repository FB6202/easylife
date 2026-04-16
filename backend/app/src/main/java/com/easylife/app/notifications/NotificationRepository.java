package com.easylife.app.notifications;

import com.easylife.app.shared.NotificationChannel;
import com.easylife.app.shared.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findAllByUserId(Long userId);

    List<Notification> findAllByUserIdAndRead(Long userId, Boolean read);

    List<Notification> findAllByUserIdAndChannel(Long userId, NotificationChannel channel);

    List<Notification> findAllByUserIdAndType(Long userId, NotificationType type);

    List<Notification> findAllByUserIdOrderByCreatedAtDesc(Long userId);

    List<Notification> findAllByScheduledAtBeforeAndSentAtIsNull(LocalDateTime now);

    long countByUserIdAndRead(Long userId, Boolean read);

    Optional<Notification> findByIdAndUserId(Long id, Long userId);

}
