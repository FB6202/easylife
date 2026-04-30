import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

type NotificationType = 'REMINDER' | 'INFO' | 'WARNING' | 'SUCCESS';
type NotificationChannel = 'IN_APP' | 'EMAIL' | 'PUSH';
type ReferenceType =
  | 'TODO'
  | 'GOAL'
  | 'EVENT'
  | 'DOCUMENT'
  | 'CONTACT'
  | 'JOURNAL_ENTRY'
  | 'WEEK_PLAN';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  channel: NotificationChannel;
  referenceType: ReferenceType;
  referenceId: number;
  alreadyRead: boolean;
  sentAt: string;
  actionLabel?: string;
}

@Component({
  selector: 'app-notifications',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class NotificationsComponent {
  readonly activeFilter = signal<NotificationType | 'ALL'>('ALL');

  readonly notifications = signal<Notification[]>([
    {
      id: 1,
      title: 'Goal Accomplished: Q3 Review',
      message:
        'You have successfully completed 100% of your primary goals for this quarter. Great job staying focused!',
      type: 'SUCCESS',
      channel: 'IN_APP',
      referenceType: 'GOAL',
      referenceId: 1,
      alreadyRead: false,
      sentAt: 'Today, 9:41 AM',
      actionLabel: 'View Report',
    },
    {
      id: 2,
      title: 'Storage Limit Approaching',
      message:
        'Your document storage is at 85% capacity. Consider upgrading your plan to avoid interruption.',
      type: 'WARNING',
      channel: 'IN_APP',
      referenceType: 'DOCUMENT',
      referenceId: 0,
      alreadyRead: true,
      sentAt: 'Yesterday, 4:20 PM',
      actionLabel: 'Manage Storage',
    },
    {
      id: 3,
      title: 'Upcoming Project Sync',
      message:
        "Sync meeting for 'Easy Life Rebrand' starts in 15 minutes. Don't forget to bring the updated assets.",
      type: 'REMINDER',
      channel: 'IN_APP',
      referenceType: 'EVENT',
      referenceId: 2,
      alreadyRead: false,
      sentAt: 'Yesterday, 10:00 AM',
      actionLabel: 'Join Meeting',
    },
    {
      id: 4,
      title: 'Weekly Journal Reminder',
      message:
        "You haven't written a journal entry this week. Take a few minutes to reflect on your progress.",
      type: 'REMINDER',
      channel: 'IN_APP',
      referenceType: 'JOURNAL_ENTRY',
      referenceId: 0,
      alreadyRead: true,
      sentAt: 'Oct 24, 2023',
      actionLabel: 'Write Entry',
    },
    {
      id: 5,
      title: 'Goal Deadline Tomorrow',
      message:
        "Your goal 'Portfolio Diversification' is due tomorrow. You're at 42% — push for a final sprint!",
      type: 'REMINDER',
      channel: 'IN_APP',
      referenceType: 'GOAL',
      referenceId: 2,
      alreadyRead: false,
      sentAt: 'Oct 23, 2023',
      actionLabel: 'View Goal',
    },
    {
      id: 6,
      title: 'New Follower',
      message:
        '@max_builder started following you. They have 12 public goals you might find inspiring.',
      type: 'INFO',
      channel: 'IN_APP',
      referenceType: 'CONTACT',
      referenceId: 5,
      alreadyRead: true,
      sentAt: 'Oct 23, 2023',
      actionLabel: 'View Profile',
    },
  ]);

  readonly currentPage = signal(0);
  readonly totalPages = signal(4);
  readonly totalElements = signal(24);
  readonly pageSize = signal(6);

  readonly unreadCount = computed(() => this.notifications().filter((n) => !n.alreadyRead).length);

  readonly countByType = computed(() => {
    const all = this.notifications();
    return {
      REMINDER: all.filter((n) => n.type === 'REMINDER' && !n.alreadyRead).length,
      INFO: all.filter((n) => n.type === 'INFO' && !n.alreadyRead).length,
      WARNING: all.filter((n) => n.type === 'WARNING' && !n.alreadyRead).length,
      SUCCESS: all.filter((n) => n.type === 'SUCCESS' && !n.alreadyRead).length,
    };
  });

  readonly filteredNotifications = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'ALL') return this.notifications();
    return this.notifications().filter((n) => n.type === filter);
  });

  getTypeIcon(type: NotificationType): string {
    const map: Record<NotificationType, string> = {
      REMINDER: 'alarm',
      INFO: 'info',
      WARNING: 'warning',
      SUCCESS: 'check_circle',
    };
    return map[type];
  }

  getTypeClass(type: NotificationType): string {
    const map: Record<NotificationType, string> = {
      REMINDER: 'type--reminder',
      INFO: 'type--info',
      WARNING: 'type--warning',
      SUCCESS: 'type--success',
    };
    return map[type];
  }

  getReferenceLabel(type: ReferenceType): string {
    const map: Record<ReferenceType, string> = {
      TODO: 'Task',
      GOAL: 'Goal',
      EVENT: 'Calendar',
      DOCUMENT: 'Document',
      CONTACT: 'People',
      JOURNAL_ENTRY: 'Journal',
      WEEK_PLAN: 'My Week',
    };
    return map[type];
  }

  markAllRead() {
    this.notifications.update((list) => list.map((n) => ({ ...n, alreadyRead: true })));
  }

  markRead(id: number) {
    this.notifications.update((list) =>
      list.map((n) => (n.id === id ? { ...n, alreadyRead: true } : n)),
    );
  }

  setFilter(filter: NotificationType | 'ALL') {
    this.activeFilter.set(filter);
    this.currentPage.set(0);
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onAiClick() {
    console.log('AI clicked');
  }
}
