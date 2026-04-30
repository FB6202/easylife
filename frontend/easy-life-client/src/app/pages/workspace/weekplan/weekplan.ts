import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

type WeekPlanStatus = 'ACTIVE' | 'COMPLETED' | 'DRAFT' | 'ABANDONED';

interface CategoryDot {
  color: string;
  icon: string;
}

interface WeekPlan {
  id: number;
  title: string;
  intention: string;
  startDate: string;
  endDate: string;
  status: WeekPlanStatus;
  reflection: string | null;
  createdAt: string;
  tasksDone: number;
  tasksTotal: number;
  categoryDots: CategoryDot[];
}

@Component({
  selector: 'app-weekplan',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './weekplan.html',
  styleUrl: './weekplan.scss',
})
export class WeekplanComponent {
  readonly searchQuery = signal('');

  readonly weekplans = signal<WeekPlan[]>([
    {
      id: 1,
      title: 'Scaling the Creative Horizon',
      intention: 'Focus on intentional output over reactive checking.',
      startDate: 'Oct 23',
      endDate: 'Oct 29, 2023',
      status: 'ACTIVE',
      reflection: 'Mid-week check-in shows high...',
      createdAt: 'Oct 20, 2023',
      tasksDone: 12,
      tasksTotal: 18,
      categoryDots: [
        { color: '#43a047', icon: 'work' },
        { color: '#f57c00', icon: 'brush' },
        { color: '#1976d2', icon: 'flag' },
      ],
    },
    {
      id: 2,
      title: 'Deep Work Foundations',
      intention: 'Building the infrastructure for the Q4 launch.',
      startDate: 'Oct 16',
      endDate: 'Oct 22, 2023',
      status: 'COMPLETED',
      reflection: 'Successfully established 4am wake...',
      createdAt: 'Oct 13, 2023',
      tasksDone: 24,
      tasksTotal: 24,
      categoryDots: [
        { color: '#9c27b0', icon: 'rocket_launch' },
        { color: '#43a047', icon: 'groups' },
        { color: '#00bcd4', icon: 'bar_chart' },
        { color: '#e91e63', icon: 'star' },
      ],
    },
    {
      id: 3,
      title: 'Q4 Strategy & Planning',
      intention: 'Define the roadmap for the final sprint of the year.',
      startDate: 'Oct 30',
      endDate: 'Nov 05, 2023',
      status: 'DRAFT',
      reflection: null,
      createdAt: 'Oct 26, 2023',
      tasksDone: 0,
      tasksTotal: 8,
      categoryDots: [
        { color: '#f57c00', icon: 'rocket_launch' },
        { color: '#3f51b5', icon: 'groups' },
      ],
    },
    {
      id: 4,
      title: 'Systems Overhaul (Postponed)',
      intention: 'Revisiting internal workflows and automation.',
      startDate: 'Oct 09',
      endDate: 'Oct 15, 2023',
      status: 'ABANDONED',
      reflection: 'Pivoted to urgent client project...',
      createdAt: 'Oct 05, 2023',
      tasksDone: 2,
      tasksTotal: 14,
      categoryDots: [{ color: '#757575', icon: 'settings' }],
    },
  ]);

  readonly currentPage = signal(0);
  readonly totalPages = signal(13);
  readonly totalElements = signal(52);
  readonly pageSize = signal(4);

  getStatusClass(status: WeekPlanStatus): string {
    const map: Record<WeekPlanStatus, string> = {
      ACTIVE: 'status--active',
      COMPLETED: 'status--completed',
      DRAFT: 'status--draft',
      ABANDONED: 'status--abandoned',
    };
    return map[status];
  }

  getProgressPercent(done: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((done / total) * 100);
  }

  getActionLabel(status: WeekPlanStatus): string {
    const map: Record<WeekPlanStatus, string> = {
      ACTIVE: 'View Details',
      COMPLETED: 'View Report',
      DRAFT: 'Edit Draft',
      ABANDONED: 'Archived',
    };
    return map[status];
  }

  getProgressLabel(status: WeekPlanStatus): string {
    return status === 'DRAFT' ? 'Planned Tasks' : 'Tasks Progress';
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onAiClick() {
    console.log('AI clicked');
  }
}
