import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

interface CategoryForm {
  name: string;
  description: string;
  color: string;
  icon: string;
  accessType: AccessType;
}

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule, PaginationComponent],
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

  readonly availableColors: string[] = [
    '#1b5e20',
    '#2e7d32',
    '#388e3c',
    '#43a047',
    '#66bb6a',
    '#a5d6a7',
    '#0d47a1',
    '#1565c0',
    '#1976d2',
    '#1e88e5',
    '#42a5f5',
    '#90caf9',
    '#b71c1c',
    '#c62828',
    '#d32f2f',
    '#e53935',
    '#ef5350',
    '#ef9a9a',
    '#e65100',
    '#ef6c00',
    '#f57c00',
    '#fb8c00',
    '#ffa726',
    '#ffcc80',
    '#4a148c',
    '#6a1b9a',
    '#7b1fa2',
    '#8e24aa',
    '#ab47bc',
    '#ce93d8',
    '#880e4f',
    '#ad1457',
    '#c2185b',
    '#d81b60',
    '#e91e63',
    '#f48fb1',
    '#004d40',
    '#00695c',
    '#00796b',
    '#00897b',
    '#009688',
    '#26a69a',
    '#006064',
    '#00838f',
    '#0097a7',
    '#00acc1',
    '#00bcd4',
    '#80deea',
    '#bf360c',
    '#d84315',
    '#e64a19',
    '#f4511e',
    '#ff5722',
    '#ff8a65',
    '#212121',
    '#424242',
    '#616161',
    '#757575',
    '#9e9e9e',
    '#bdbdbd',
  ];

  readonly allIcons: string[] = [
    'work',
    'payments',
    'self_improvement',
    'rocket_launch',
    'school',
    'edit_note',
    'biotech',
    'flag',
    'star',
    'favorite',
    'home',
    'fitness_center',
    'book',
    'code',
    'travel_explore',
    'groups',
    'category',
    'lightbulb',
    'calendar_month',
    'description',
    'shopping_cart',
    'restaurant',
    'flight',
    'hotel',
    'directions_car',
    'sports_soccer',
    'music_note',
    'movie',
    'photo_camera',
    'brush',
    'build',
    'science',
    'psychology',
    'health_and_safety',
    'medical_services',
    'attach_money',
    'savings',
    'account_balance',
    'trending_up',
    'bar_chart',
    'email',
    'chat',
    'phone',
    'video_call',
    'public',
    'lock',
    'security',
    'settings',
    'admin_panel_settings',
    'manage_accounts',
    'folder',
    'cloud',
    'storage',
    'devices',
    'computer',
    'nature',
    'park',
    'pets',
    'child_care',
    'family_restroom',
    'sports_esports',
    'sports_basketball',
    'sports_tennis',
    'pool',
    'hiking',
    'restaurant_menu',
    'coffee',
    'local_bar',
    'cake',
    'fastfood',
    'auto_stories',
    'library_books',
    'menu_book',
    'newspaper',
    'article',
    'palette',
    'design_services',
    'architecture',
    'draw',
    'format_paint',
    'volunteer_activism',
    'handshake',
    'diversity_3',
    'people',
    'person',
  ];

  iconSearchQuery = signal('');

  readonly filteredIcons = computed(() => {
    const q = this.iconSearchQuery().toLowerCase().trim();
    if (!q) return this.allIcons;
    return this.allIcons.filter((icon) => icon.includes(q));
  });

  showCreateModal = signal(false);
  showEditModal = signal(false);
  showDeleteConfirm = signal(false);
  selectedCategory = signal<Category | null>(null);

  createForm = signal<CategoryForm>({
    name: '',
    description: '',
    color: '#43a047',
    icon: 'category',
    accessType: 'PRIVATE',
  });

  editForm = signal<CategoryForm>({
    name: '',
    description: '',
    color: '#43a047',
    icon: 'category',
    accessType: 'PRIVATE',
  });

  openCreate() {
    this.iconSearchQuery.set('');
    this.createForm.set({
      name: '',
      description: '',
      color: '#43a047',
      icon: 'category',
      accessType: 'PRIVATE',
    });
    this.showCreateModal.set(true);
  }

  submitCreate() {
    if (!this.createForm().name.trim()) return;
    console.log('Create:', this.createForm());
    this.showCreateModal.set(false);
  }

  openEdit(cat: Category, event?: Event) {
    event?.stopPropagation();
    this.iconSearchQuery.set('');
    this.selectedCategory.set(cat);
    this.editForm.set({
      name: cat.name,
      description: cat.description,
      color: cat.color,
      icon: cat.icon,
      accessType: cat.accessType,
    });
    this.showEditModal.set(true);
  }

  submitEdit() {
    if (!this.editForm().name.trim()) return;
    console.log('Update:', this.selectedCategory()?.id, this.editForm());
    this.showEditModal.set(false);
  }

  openDeleteConfirm(cat: Category, event?: Event) {
    event?.stopPropagation();
    this.selectedCategory.set(cat);
    this.showEditModal.set(false);
    this.showDeleteConfirm.set(true);
  }

  confirmDelete() {
    const id = this.selectedCategory()?.id;
    if (id) this.categories.update((c) => c.filter((cat) => cat.id !== id));
    this.showDeleteConfirm.set(false);
    this.selectedCategory.set(null);
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
  onAiClick() {
    console.log('AI clicked');
  }
}
