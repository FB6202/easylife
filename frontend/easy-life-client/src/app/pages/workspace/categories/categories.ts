import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

type AccessType = 'PRIVATE' | 'PUBLIC';

interface Category {
  id: number;
  name: string;
  description: string;
  color: string;
  icon: string;
  accessType: AccessType;
  createdAt: string;
}

@Component({
  selector: 'app-categories',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class CategoriesComponent {
  readonly categories = signal<Category[]>([
    {
      id: 1,
      name: 'Business Strategy',
      description: 'Quarterly roadmaps, stakeholder meetings and growth planning.',
      color: '#43a047',
      icon: 'work',
      accessType: 'PUBLIC',
      createdAt: 'Oct 12',
    },
    {
      id: 2,
      name: 'Financial Goals',
      description: 'Personal investment tracking, budget and savings.',
      color: '#1976d2',
      icon: 'payments',
      accessType: 'PRIVATE',
      createdAt: 'Sep 28',
    },
    {
      id: 3,
      name: 'Content Pipeline',
      description: 'Editorial calendars, blog drafts and publishing schedule.',
      color: '#f57c00',
      icon: 'edit_note',
      accessType: 'PUBLIC',
      createdAt: 'Aug 14',
    },
    {
      id: 4,
      name: 'Lifestyle & Focus',
      description: 'Wellness tracking, hobby projects and personal growth.',
      color: '#9c27b0',
      icon: 'self_improvement',
      accessType: 'PRIVATE',
      createdAt: 'Nov 02',
    },
    {
      id: 5,
      name: 'Project Alpha',
      description: 'Core development sprint for the new product release.',
      color: '#f44336',
      icon: 'rocket_launch',
      accessType: 'PRIVATE',
      createdAt: 'Dec 20',
    },
    {
      id: 6,
      name: 'R&D Lab',
      description: 'Experimental features, technical research and prototypes.',
      color: '#00bcd4',
      icon: 'biotech',
      accessType: 'PUBLIC',
      createdAt: 'Jan 05',
    },
  ]);

  readonly currentPage = signal(0);
  readonly totalPages = signal(3);
  readonly totalElements = signal(24);
  readonly pageSize = signal(6);

  readonly publicCount = computed(
    () => this.categories().filter((c) => c.accessType === 'PUBLIC').length,
  );

  readonly privateCount = computed(
    () => this.categories().filter((c) => c.accessType === 'PRIVATE').length,
  );

  showCreateModal = signal(false);

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onAiClick() {
    console.log('AI clicked');
  }
}
