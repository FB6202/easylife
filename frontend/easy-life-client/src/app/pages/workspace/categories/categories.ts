import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import {
  FilterPanelComponent,
  FilterField,
  FilterValues,
} from '../../../shared/components/filter/filter';

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
  imports: [CommonModule, FormsModule, PaginationComponent, FilterPanelComponent],
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
    {
      id: 7,
      name: 'Learning & Growth',
      description: 'Books, courses, podcasts and continuous education.',
      color: '#e91e63',
      icon: 'school',
      accessType: 'PUBLIC',
      createdAt: 'Feb 10',
    },
    {
      id: 8,
      name: 'Health & Wellness',
      description: 'Fitness tracking, nutrition logs and mental health.',
      color: '#4caf50',
      icon: 'fitness_center',
      accessType: 'PRIVATE',
      createdAt: 'Mar 15',
    },
    {
      id: 9,
      name: 'Travel & Adventures',
      description: 'Trip planning, travel journals and destination wishlist.',
      color: '#ff9800',
      icon: 'flight',
      accessType: 'PUBLIC',
      createdAt: 'Apr 22',
    },
    {
      id: 10,
      name: 'Side Projects',
      description: 'Personal experiments, open source and creative builds.',
      color: '#607d8b',
      icon: 'code',
      accessType: 'PRIVATE',
      createdAt: 'May 01',
    },
    {
      id: 11,
      name: 'Networking',
      description: 'Professional connections, events and community involvement.',
      color: '#3f51b5',
      icon: 'groups',
      accessType: 'PUBLIC',
      createdAt: 'May 18',
    },
    {
      id: 12,
      name: 'Mindfulness',
      description: 'Meditation, journaling and daily reflection practice.',
      color: '#795548',
      icon: 'self_improvement',
      accessType: 'PRIVATE',
      createdAt: 'Jun 03',
    },
  ]);

  readonly currentPage = signal(0);
  readonly pageSize = signal(10);

  readonly totalElements = computed(() => this.categories().length);
  readonly totalPages = computed(() => Math.ceil(this.totalElements() / this.pageSize()));

  readonly paginatedCategories = computed(() => {
    const all = this.categories();
    const start = this.currentPage() * this.pageSize();
    // Reserve last slot for Add New card
    return all.slice(start, start + this.pageSize());
  });

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
  onPageSizeChange(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(0);
  }

  showFilter = signal(false);
  activeFilters = signal<FilterValues>({});

  readonly categoryFilterFields: FilterField[] = [
    {
      key: 'search',
      label: 'Search',
      type: 'text',
      icon: 'search',
      placeholder: 'Search categories...',
    },
    {
      key: 'accessType',
      label: 'Access',
      type: 'multiselect',
      icon: 'lock',
      options: [
        { value: 'PUBLIC', label: 'Public', icon: 'travel_explore', color: '#43a047' },
        { value: 'PRIVATE', label: 'Private', icon: 'lock', color: '#757575' },
      ],
    },
    {
      key: 'color',
      label: 'Color',
      type: 'multiselect',
      icon: 'palette',
      options: [
        { value: 'green', label: 'Green', color: '#43a047' },
        { value: 'blue', label: 'Blue', color: '#1976d2' },
        { value: 'red', label: 'Red', color: '#d32f2f' },
        { value: 'orange', label: 'Orange', color: '#f57c00' },
        { value: 'purple', label: 'Purple', color: '#7b1fa2' },
        { value: 'pink', label: 'Pink', color: '#c2185b' },
        { value: 'teal', label: 'Teal', color: '#00796b' },
        { value: 'cyan', label: 'Cyan', color: '#0097a7' },
      ],
    },
    {
      key: 'createdAt',
      label: 'Created',
      type: 'date-range',
      icon: 'calendar_today',
    },
  ];

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

  readonly activeFilterCount = computed(
    () =>
      Object.values(this.activeFilters()).filter((v) => {
        if (!v || v === '') return false;
        if (Array.isArray(v)) return v.length > 0;
        return true;
      }).length,
  );

  onFilterApply(values: FilterValues) {
    this.activeFilters.set(values);
    this.showFilter.set(false);
    console.log('Category filter applied:', values);
    // later: reload categories with filter params
  }

  onFilterReset() {
    this.activeFilters.set({});
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

  onAiClick() {
    console.log('AI clicked');
  }
}
