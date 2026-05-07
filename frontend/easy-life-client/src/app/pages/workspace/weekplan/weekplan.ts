import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import {
  FilterPanelComponent,
  FilterField,
  FilterValues,
} from '../../../shared/components/filter/filter';

type WeekPlanStatus = 'ACTIVE' | 'COMPLETED' | 'DRAFT' | 'ABANDONED';

interface CategoryPreview {
  id: number;
  name: string;
  icon: string;
  color: string;
}

interface WeekPlanItem {
  id: number;
  title: string;
  description: string;
  done: boolean;
  dueDate: string;
}

interface WeekPlanFormItem {
  title: string;
  description: string;
  done: boolean;
  dueDate: string;
  createAsTask: boolean;
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
  items: WeekPlanItem[];
  itemsDone: number;
  itemsTotal: number;
  categories: CategoryPreview[];
}

interface WeekPlanForm {
  title: string;
  intention: string;
  startDate: string;
  endDate: string;
  status: WeekPlanStatus;
  reflection: string;
  categoryIds: number[];
  items: WeekPlanFormItem[];
}

@Component({
  selector: 'app-weekplan',
  imports: [CommonModule, FormsModule, PaginationComponent, FilterPanelComponent],
  templateUrl: './weekplan.html',
  styleUrl: './weekplan.scss',
})
export class WeekplanComponent {
  readonly availableCategories = signal<CategoryPreview[]>([
    { id: 1, name: 'Work', icon: 'work', color: '#1976d2' },
    { id: 2, name: 'Finance', icon: 'payments', color: '#f57c00' },
    { id: 3, name: 'Health', icon: 'self_improvement', color: '#43a047' },
    { id: 4, name: 'Personal', icon: 'person', color: '#9c27b0' },
    { id: 5, name: 'Learning', icon: 'school', color: '#e91e63' },
  ]);

  readonly weekplans = signal<WeekPlan[]>([
    {
      id: 1,
      title: 'Scaling the Creative Horizon',
      intention: 'Focus on intentional output over reactive checking.',
      startDate: 'Oct 23',
      endDate: 'Oct 29, 2023',
      status: 'ACTIVE',
      reflection: 'Mid-week check-in shows high output days correlate with morning planning...',
      createdAt: 'Oct 20, 2023',
      items: [
        { id: 1, title: 'Define Q4 OKRs', description: '', done: true, dueDate: '' },
        { id: 2, title: 'Review marketing strategy', description: '', done: true, dueDate: '' },
        { id: 3, title: 'Team 1:1 meetings', description: '', done: false, dueDate: '' },
        { id: 4, title: 'Write weekly newsletter', description: '', done: false, dueDate: '' },
      ],
      itemsDone: 2,
      itemsTotal: 4,
      categories: [
        { id: 1, name: 'Work', icon: 'work', color: '#1976d2' },
        { id: 4, name: 'Personal', icon: 'person', color: '#9c27b0' },
      ],
    },
    {
      id: 2,
      title: 'Deep Work Foundations',
      intention: 'Building the infrastructure for the Q4 launch.',
      startDate: 'Oct 16',
      endDate: 'Oct 22, 2023',
      status: 'COMPLETED',
      reflection: 'Successfully established 4am wake routine and deep work blocks...',
      createdAt: 'Oct 13, 2023',
      items: [
        { id: 1, title: 'Ship v2 backend', description: '', done: true, dueDate: '' },
        { id: 2, title: 'Code review all PRs', description: '', done: true, dueDate: '' },
        { id: 3, title: 'Update documentation', description: '', done: true, dueDate: '' },
      ],
      itemsDone: 3,
      itemsTotal: 3,
      categories: [
        { id: 1, name: 'Work', icon: 'work', color: '#1976d2' },
        { id: 3, name: 'Health', icon: 'self_improvement', color: '#43a047' },
        { id: 5, name: 'Learning', icon: 'school', color: '#e91e63' },
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
      items: [
        { id: 1, title: 'Draft Q4 roadmap', description: '', done: false, dueDate: '' },
        { id: 2, title: 'Budget forecast', description: '', done: false, dueDate: '' },
      ],
      itemsDone: 0,
      itemsTotal: 2,
      categories: [
        { id: 1, name: 'Work', icon: 'work', color: '#1976d2' },
        { id: 2, name: 'Finance', icon: 'payments', color: '#f57c00' },
      ],
    },
    {
      id: 4,
      title: 'Systems Overhaul (Postponed)',
      intention: 'Revisiting internal workflows and automation.',
      startDate: 'Oct 09',
      endDate: 'Oct 15, 2023',
      status: 'ABANDONED',
      reflection: 'Pivoted to urgent client project — rescheduled for Q1...',
      createdAt: 'Oct 05, 2023',
      items: [],
      itemsDone: 0,
      itemsTotal: 0,
      categories: [{ id: 1, name: 'Work', icon: 'work', color: '#1976d2' }],
    },
  ]);

  readonly currentPage = signal(0);
  readonly totalPages = signal(13);
  readonly totalElements = signal(52);
  readonly pageSize = signal(4);

  showFilter = signal(false);
  activeFilters = signal<FilterValues>({});

  readonly weekplanFilterFields: FilterField[] = [
    {
      key: 'search',
      label: 'Search',
      type: 'text',
      icon: 'search',
      placeholder: 'Search week plans...',
    },
    {
      key: 'status',
      label: 'Status',
      type: 'multiselect',
      icon: 'play_circle',
      options: [
        { value: 'DRAFT', label: 'Draft', icon: 'edit_note', color: '#757575' },
        { value: 'ACTIVE', label: 'Active', icon: 'play_circle', color: '#43a047' },
        { value: 'COMPLETED', label: 'Completed', icon: 'check_circle', color: '#1976d2' },
        { value: 'ABANDONED', label: 'Abandoned', icon: 'cancel', color: '#9e9e9e' },
      ],
    },
    {
      key: 'categories',
      label: 'Categories',
      type: 'multiselect',
      icon: 'category',
      options: [
        { value: '1', label: 'Work', icon: 'work', color: '#1976d2' },
        { value: '2', label: 'Finance', icon: 'payments', color: '#f57c00' },
        { value: '3', label: 'Health', icon: 'self_improvement', color: '#43a047' },
        { value: '4', label: 'Personal', icon: 'person', color: '#9c27b0' },
        { value: '5', label: 'Learning', icon: 'school', color: '#e91e63' },
      ],
    },
    {
      key: 'startDate',
      label: 'Start Date Range',
      type: 'date-range',
      icon: 'calendar_today',
    },
    {
      key: 'hasReflection',
      label: 'Has Reflection',
      type: 'toggle',
      icon: 'rate_review',
    },
    {
      key: 'progress',
      label: 'Progress',
      type: 'select',
      icon: 'trending_up',
      options: [
        { value: 'not_started', label: 'Not started (0 items done)' },
        { value: 'in_progress', label: 'In progress' },
        { value: 'completed', label: 'All items done' },
      ],
    },
  ];

  showCreateModal = signal(false);
  showEditModal = signal(false);
  showDeleteConfirm = signal(false);
  selectedPlan = signal<WeekPlan | null>(null);

  readonly statuses: WeekPlanStatus[] = ['DRAFT', 'ACTIVE', 'COMPLETED', 'ABANDONED'];

  readonly emptyForm = (): WeekPlanForm => ({
    title: '',
    intention: '',
    startDate: '',
    endDate: '',
    status: 'DRAFT',
    reflection: '',
    categoryIds: [],
    items: [],
  });

  createForm = signal<WeekPlanForm>(this.emptyForm());
  editForm = signal<WeekPlanForm>(this.emptyForm());

  // ── Computed ────────────────────────────────────────────
  readonly createTaskCount = computed(
    () => this.createForm().items.filter((i) => i.createAsTask).length,
  );

  readonly editTaskCount = computed(
    () => this.editForm().items.filter((i) => i.createAsTask).length,
  );

  // ── Categories ─────────────────────────────────────────
  toggleCreateCategory(id: number) {
    this.createForm.update((f) => {
      const ids = f.categoryIds.includes(id)
        ? f.categoryIds.filter((i) => i !== id)
        : f.categoryIds.length < 5
          ? [...f.categoryIds, id]
          : f.categoryIds;
      return { ...f, categoryIds: ids };
    });
  }

  toggleEditCategory(id: number) {
    this.editForm.update((f) => {
      const ids = f.categoryIds.includes(id)
        ? f.categoryIds.filter((i) => i !== id)
        : f.categoryIds.length < 5
          ? [...f.categoryIds, id]
          : f.categoryIds;
      return { ...f, categoryIds: ids };
    });
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
    console.log('WeekPlan filter applied:', values);
  }

  onFilterReset() {
    this.activeFilters.set({});
  }

  // ── Items – Create ─────────────────────────────────────
  addItemToCreate() {
    this.createForm.update((f) => ({
      ...f,
      items: [
        ...f.items,
        {
          title: '',
          description: '',
          done: false,
          dueDate: '',
          createAsTask: false,
        },
      ],
    }));
  }

  removeItemFromCreate(index: number) {
    this.createForm.update((f) => ({
      ...f,
      items: f.items.filter((_, i) => i !== index),
    }));
  }

  updateCreateItem(index: number, field: string, value: string | boolean) {
    this.createForm.update((f) => {
      const items = [...f.items];
      items[index] = { ...items[index], [field]: value };
      return { ...f, items };
    });
  }

  toggleCreateAsTask(index: number, form: 'create' | 'edit') {
    if (form === 'create') {
      this.createForm.update((f) => {
        const items = [...f.items];
        items[index] = { ...items[index], createAsTask: !items[index].createAsTask };
        return { ...f, items };
      });
    } else {
      this.editForm.update((f) => {
        const items = [...f.items];
        items[index] = { ...items[index], createAsTask: !items[index].createAsTask };
        return { ...f, items };
      });
    }
  }

  convertAllToTasks(form: 'create' | 'edit') {
    const target = form === 'create' ? this.createForm : this.editForm;
    target.update((f) => ({
      ...f,
      items: f.items.map((item) => ({ ...item, createAsTask: true })),
    }));
  }

  // ── Items – Edit ───────────────────────────────────────
  addItemToEdit() {
    this.editForm.update((f) => ({
      ...f,
      items: [
        ...f.items,
        {
          title: '',
          description: '',
          done: false,
          dueDate: '',
          createAsTask: false,
        },
      ],
    }));
  }

  removeItemFromEdit(index: number) {
    this.editForm.update((f) => ({
      ...f,
      items: f.items.filter((_, i) => i !== index),
    }));
  }

  updateEditItem(index: number, field: string, value: string | boolean) {
    this.editForm.update((f) => {
      const items = [...f.items];
      items[index] = { ...items[index], [field]: value };
      return { ...f, items };
    });
  }

  // ── CRUD ───────────────────────────────────────────────
  openCreate() {
    this.createForm.set(this.emptyForm());
    this.showCreateModal.set(true);
  }

  submitCreate() {
    if (!this.createForm().title.trim()) return;
    const tasksToCreate = this.createForm().items.filter((i) => i.createAsTask);
    console.log('Create week plan:', this.createForm());
    if (tasksToCreate.length > 0) {
      console.log('Also create as tasks:', tasksToCreate);
      // later: AI agent / API call to create tasks
    }
    this.showCreateModal.set(false);
  }

  openEdit(plan: WeekPlan) {
    this.selectedPlan.set(plan);
    this.editForm.set({
      title: plan.title,
      intention: plan.intention,
      startDate: plan.startDate,
      endDate: plan.endDate,
      status: plan.status,
      reflection: plan.reflection ?? '',
      categoryIds: plan.categories.map((c) => c.id),
      items: plan.items.map((i) => ({
        title: i.title,
        description: i.description,
        done: i.done,
        dueDate: i.dueDate,
        createAsTask: false,
      })),
    });
    this.showEditModal.set(true);
  }

  submitEdit() {
    if (!this.editForm().title.trim()) return;
    const tasksToCreate = this.editForm().items.filter((i) => i.createAsTask);
    console.log('Update week plan:', this.selectedPlan()?.id, this.editForm());
    if (tasksToCreate.length > 0) {
      console.log('Also create as tasks:', tasksToCreate);
    }
    this.showEditModal.set(false);
  }

  openDeleteConfirm() {
    this.showEditModal.set(false);
    this.showDeleteConfirm.set(true);
  }

  confirmDelete() {
    const id = this.selectedPlan()?.id;
    if (id) this.weekplans.update((w) => w.filter((p) => p.id !== id));
    this.showDeleteConfirm.set(false);
    this.selectedPlan.set(null);
  }

  // ── Helpers ────────────────────────────────────────────
  getStatusClass(status: WeekPlanStatus): string {
    const map: Record<WeekPlanStatus, string> = {
      ACTIVE: 'status--active',
      COMPLETED: 'status--completed',
      DRAFT: 'status--draft',
      ABANDONED: 'status--abandoned',
    };
    return map[status];
  }

  getStatusLabel(status: WeekPlanStatus): string {
    const map: Record<WeekPlanStatus, string> = {
      ACTIVE: 'Active',
      COMPLETED: 'Completed',
      DRAFT: 'Draft',
      ABANDONED: 'Abandoned',
    };
    return map[status];
  }

  getStatusIcon(status: WeekPlanStatus): string {
    const map: Record<WeekPlanStatus, string> = {
      ACTIVE: 'play_circle',
      COMPLETED: 'check_circle',
      DRAFT: 'edit_note',
      ABANDONED: 'cancel',
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
    return status === 'DRAFT' ? 'Planned Items' : 'Items Progress';
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
  onAiClick() {
    console.log('AI clicked');
  }
}
