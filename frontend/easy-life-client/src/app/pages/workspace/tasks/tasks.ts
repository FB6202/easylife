import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'OPTIONAL';
type Status = 'OPEN' | 'IN_PROGRESS' | 'DONE';

interface Category {
  icon: string;
  color: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  categories: Category[];
  status: Status;
  dueDay: string;
  dueMonth: string;
  dueYear: string;
  priority: Priority;
  isPublic: boolean;
  done: boolean;
}

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class TasksComponent {
  readonly tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Review Annual Financial Report Q4',
      description: 'Analyze the fiscal growth trends for this quarter',
      categories: [
        { icon: 'payments', color: '#f57c00' },
        { icon: 'work', color: '#1976d2' },
        { icon: 'description', color: '#9c27b0' },
      ],
      status: 'IN_PROGRESS',
      dueDay: '24',
      dueMonth: 'OCT',
      dueYear: '2025',
      priority: 'HIGH',
      isPublic: false,
      done: false,
    },
    {
      id: 2,
      title: 'Monthly Team Synergy Workshop',
      description: 'Interactive session focusing on team collaboration',
      categories: [
        { icon: 'groups', color: '#43a047' },
        { icon: 'school', color: '#e91e63' },
        { icon: 'chat', color: '#00bcd4' },
        { icon: 'celebration', color: '#ff5722' },
      ],
      status: 'OPEN',
      dueDay: '02',
      dueMonth: 'NOV',
      dueYear: '2025',
      priority: 'MEDIUM',
      isPublic: true,
      done: false,
    },
    {
      id: 3,
      title: 'Product Website Refresh Design',
      description: 'Finalizing the visual identity and component library',
      categories: [
        { icon: 'rocket_launch', color: '#ff5722' },
        { icon: 'brush', color: '#8bc34a' },
        { icon: 'language', color: '#2196f3' },
      ],
      status: 'DONE',
      dueDay: '12',
      dueMonth: 'OCT',
      dueYear: '2025',
      priority: 'LOW',
      isPublic: true,
      done: true,
    },
    {
      id: 4,
      title: 'R&D Lab Protocol Audit',
      description: 'Safety inspection and documentation review',
      categories: [
        { icon: 'push_pin', color: '#3f51b5' },
        { icon: 'verified', color: '#43a047' },
        { icon: 'inventory', color: '#f44336' },
        { icon: 'manage_accounts', color: '#ff9800' },
        { icon: 'assignment', color: '#009688' },
      ],
      status: 'IN_PROGRESS',
      dueDay: '28',
      dueMonth: 'OCT',
      dueYear: '2025',
      priority: 'HIGH',
      isPublic: false,
      done: false,
    },
  ]);

  readonly currentPage = signal(0);
  readonly totalPages = signal(3);
  readonly totalElements = signal(24);
  readonly pageSize = signal(4);

  // Dynamisch aus echten Task-Daten
  readonly pendingCount = computed(() => this.tasks().filter((t) => t.status !== 'DONE').length);

  readonly inProgressCount = computed(
    () => this.tasks().filter((t) => t.status === 'IN_PROGRESS').length,
  );

  readonly doneCount = computed(() => this.tasks().filter((t) => t.status === 'DONE').length);

  // Wie viele sind heute fällig (Mock: dueMonth OCT + dueDay <= 24)
  readonly dueTodayCount = computed(() =>
    this.tasks().filter((t) => t.status !== 'DONE').length > 0 ? 2 : 0,
  );

  // Wie viele IN_PROGRESS sind bald fällig
  readonly nearDueCount = computed(
    () => this.tasks().filter((t) => t.status === 'IN_PROGRESS').length,
  );

  // Completion rate in %
  readonly completionRate = computed(() => {
    const total = this.tasks().length;
    if (total === 0) return 0;
    return Math.round((this.doneCount() / total) * 100);
  });

  // Productivity Score (0-10) basierend auf completion rate
  readonly productivityScore = computed(() => {
    const rate = this.completionRate();
    return (rate / 10).toFixed(1);
  });

  readonly productivityLabel = computed(() => {
    const score = parseFloat(this.productivityScore());
    if (score >= 9) return 'Elite';
    if (score >= 7) return 'High';
    if (score >= 5) return 'Good';
    return 'Building';
  });

  showCreateModal = signal(false);
  activeMenu = signal<number | null>(null);

  getPriorityClass(priority: Priority): string {
    const map: Record<Priority, string> = {
      CRITICAL: 'priority--critical',
      HIGH: 'priority--high',
      MEDIUM: 'priority--medium',
      LOW: 'priority--low',
      OPTIONAL: 'priority--optional',
    };
    return map[priority];
  }

  getStatusClass(status: Status): string {
    const map: Record<Status, string> = {
      OPEN: 'status--open',
      IN_PROGRESS: 'status--in-progress',
      DONE: 'status--done',
    };
    return map[status];
  }

  getStatusLabel(status: Status): string {
    const map: Record<Status, string> = {
      OPEN: 'Open',
      IN_PROGRESS: 'Ongoing',
      DONE: 'Done',
    };
    return map[status];
  }

  toggleMenu(id: number) {
    this.activeMenu.update((v) => (v === id ? null : id));
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onAiClick() {
    console.log('AI clicked');
  }
}
