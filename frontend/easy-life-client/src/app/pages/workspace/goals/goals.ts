import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

type GoalStatus = 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
type AccessType = 'PRIVATE' | 'PUBLIC';

interface CategoryDot {
  color: string;
}

interface GoalTask {
  done: boolean;
}

interface Goal {
  id: number;
  title: string;
  description: string;
  imagePath: string | null;
  measurableTarget: string;
  targetValue: number;
  targetUnit: string;
  currentProgress: number;
  deadline: string;
  status: GoalStatus;
  accessType: AccessType;
  categoryDots: CategoryDot[];
  tasks: GoalTask[];
}

@Component({
  selector: 'app-goals',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './goals.html',
  styleUrl: './goals.scss',
})
export class GoalsComponent {
  readonly goals = signal<Goal[]>([
    {
      id: 1,
      title: 'Daily Mindful Movement',
      description:
        'Incorporate at least 30 minutes of intentional physical activity every morning.',
      imagePath: null,
      measurableTarget: '365 milestones',
      targetValue: 365,
      targetUnit: 'milestones',
      currentProgress: 68,
      deadline: 'DEC 31, 2024',
      status: 'ACTIVE',
      accessType: 'PUBLIC',
      categoryDots: [{ color: '#43a047' }, { color: '#f57c00' }, { color: '#9c27b0' }],
      tasks: Array(365)
        .fill(null)
        .map((_, i) => ({ done: i < 248 })),
    },
    {
      id: 2,
      title: 'Portfolio Diversification',
      description: 'Optimize investment portfolio by reallocating assets into green energy.',
      imagePath: null,
      measurableTarget: '7 milestones',
      targetValue: 7,
      targetUnit: 'milestones',
      currentProgress: 42,
      deadline: 'AUG 15, 2024',
      status: 'ACTIVE',
      accessType: 'PRIVATE',
      categoryDots: [{ color: '#1976d2' }, { color: '#f9a825' }],
      tasks: Array(7)
        .fill(null)
        .map((_, i) => ({ done: i < 3 })),
    },
    {
      id: 3,
      title: 'Design System V2 Launch',
      description: 'Complete documentation and implementation of atomic design principles.',
      imagePath: null,
      measurableTarget: '12 milestones',
      targetValue: 12,
      targetUnit: 'milestones',
      currentProgress: 100,
      deadline: 'MAR 02, 2024',
      status: 'COMPLETED',
      accessType: 'PUBLIC',
      categoryDots: [{ color: '#f44336' }],
      tasks: Array(12)
        .fill(null)
        .map((_, i) => ({ done: true })),
    },
  ]);

  readonly currentPage = signal(0);
  readonly totalPages = signal(6);
  readonly totalElements = signal(18);
  readonly pageSize = signal(3);

  readonly activeCount = computed(() => this.goals().filter((g) => g.status === 'ACTIVE').length);

  readonly completedCount = computed(
    () => this.goals().filter((g) => g.status === 'COMPLETED').length,
  );

  showCreateModal = signal(false);

  getTasksDone(goal: Goal): number {
    return goal.tasks.filter((t) => t.done).length;
  }

  getStatusClass(status: GoalStatus): string {
    const map: Record<GoalStatus, string> = {
      ACTIVE: 'status--active',
      COMPLETED: 'status--completed',
      ABANDONED: 'status--abandoned',
    };
    return map[status];
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onAiClick() {
    console.log('AI clicked');
  }
}
