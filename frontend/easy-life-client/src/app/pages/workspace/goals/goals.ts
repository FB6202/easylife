import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

type GoalStatus = 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
type AccessType = 'PRIVATE' | 'PUBLIC';

interface CategoryPreview {
  id: number;
  name: string;
  icon: string;
  color: string;
}

interface GoalTask {
  id: number;
  title: string;
  description: string;
  done: boolean;
  progressContribution: number;
  dueDate: string;
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
  categories: CategoryPreview[];
  tasks: GoalTask[];
}

interface GoalForm {
  title: string;
  description: string;
  measurableTarget: string;
  targetValue: number;
  targetUnit: string;
  currentProgress: number;
  deadline: string;
  status: GoalStatus;
  accessType: AccessType;
  categoryIds: number[];
  tasks: Omit<GoalTask, 'id'>[];
  imageFile: File | null;
}

@Component({
  selector: 'app-goals',
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './goals.html',
  styleUrl: './goals.scss',
})
export class GoalsComponent {
  readonly availableCategories = signal<CategoryPreview[]>([
    { id: 1, name: 'Work', icon: 'work', color: '#1976d2' },
    { id: 2, name: 'Finance', icon: 'payments', color: '#f57c00' },
    { id: 3, name: 'Health', icon: 'self_improvement', color: '#43a047' },
    { id: 4, name: 'Personal', icon: 'person', color: '#9c27b0' },
    { id: 5, name: 'Learning', icon: 'school', color: '#e91e63' },
  ]);

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
      categories: [
        { id: 3, name: 'Health', icon: 'self_improvement', color: '#43a047' },
        { id: 4, name: 'Personal', icon: 'person', color: '#9c27b0' },
      ],
      tasks: [
        {
          id: 1,
          title: 'Morning yoga session',
          description: '',
          done: true,
          progressContribution: 10,
          dueDate: '',
        },
        {
          id: 2,
          title: 'Evening walk 30min',
          description: '',
          done: true,
          progressContribution: 10,
          dueDate: '',
        },
        {
          id: 3,
          title: 'Track daily steps',
          description: '',
          done: false,
          progressContribution: 5,
          dueDate: '',
        },
      ],
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
      categories: [{ id: 2, name: 'Finance', icon: 'payments', color: '#f57c00' }],
      tasks: [
        {
          id: 1,
          title: 'Research ETF options',
          description: '',
          done: true,
          progressContribution: 15,
          dueDate: '',
        },
        {
          id: 2,
          title: 'Open brokerage account',
          description: '',
          done: true,
          progressContribution: 15,
          dueDate: '',
        },
        {
          id: 3,
          title: 'Allocate first investment',
          description: '',
          done: false,
          progressContribution: 20,
          dueDate: '',
        },
      ],
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
      categories: [{ id: 1, name: 'Work', icon: 'work', color: '#1976d2' }],
      tasks: [
        {
          id: 1,
          title: 'Create component library',
          description: '',
          done: true,
          progressContribution: 30,
          dueDate: '',
        },
        {
          id: 2,
          title: 'Write documentation',
          description: '',
          done: true,
          progressContribution: 30,
          dueDate: '',
        },
        {
          id: 3,
          title: 'Stakeholder review',
          description: '',
          done: true,
          progressContribution: 40,
          dueDate: '',
        },
      ],
    },
    {
      id: 4,
      title: 'Learn Spanish B2',
      description: 'Reach B2 level in Spanish through daily practice and immersion.',
      imagePath: null,
      measurableTarget: '200 hours',
      targetValue: 200,
      targetUnit: 'hours',
      currentProgress: 35,
      deadline: 'DEC 31, 2025',
      status: 'ACTIVE',
      accessType: 'PUBLIC',
      categories: [
        { id: 5, name: 'Learning', icon: 'school', color: '#e91e63' },
        { id: 4, name: 'Personal', icon: 'person', color: '#9c27b0' },
      ],
      tasks: [
        {
          id: 1,
          title: 'Daily Duolingo 20min',
          description: '',
          done: false,
          progressContribution: 10,
          dueDate: '',
        },
        {
          id: 2,
          title: 'Weekly conversation partner',
          description: '',
          done: false,
          progressContribution: 20,
          dueDate: '',
        },
      ],
    },
  ]);

  readonly currentPage = signal(0);
  readonly totalPages = signal(5);
  readonly totalElements = signal(18);
  readonly pageSize = signal(4);

  showCreateModal = signal(false);
  showEditModal = signal(false);
  showDeleteConfirm = signal(false);
  selectedGoal = signal<Goal | null>(null);

  readonly statuses: GoalStatus[] = ['ACTIVE', 'COMPLETED', 'ABANDONED'];

  readonly emptyForm = (): GoalForm => ({
    title: '',
    description: '',
    measurableTarget: '',
    targetValue: 0,
    targetUnit: '',
    currentProgress: 0,
    deadline: '',
    status: 'ACTIVE',
    accessType: 'PRIVATE',
    categoryIds: [],
    tasks: [],
    imageFile: null, // ← neu
  });

  createForm = signal<GoalForm>(this.emptyForm());
  editForm = signal<GoalForm>(this.emptyForm());

  // ── Tasks in Form ──────────────────────────────────────
  addTaskToCreate() {
    this.createForm.update((f) => ({
      ...f,
      tasks: [
        ...f.tasks,
        { title: '', description: '', done: false, progressContribution: 0, dueDate: '' },
      ],
    }));
  }

  removeTaskFromCreate(index: number) {
    this.createForm.update((f) => ({
      ...f,
      tasks: f.tasks.filter((_, i) => i !== index),
    }));
  }

  updateCreateTask(index: number, field: string, value: string | boolean | number) {
    this.createForm.update((f) => {
      const tasks = [...f.tasks];
      tasks[index] = { ...tasks[index], [field]: value };
      return { ...f, tasks };
    });
  }

  addTaskToEdit() {
    this.editForm.update((f) => ({
      ...f,
      tasks: [
        ...f.tasks,
        { title: '', description: '', done: false, progressContribution: 0, dueDate: '' },
      ],
    }));
  }

  removeTaskFromEdit(index: number) {
    this.editForm.update((f) => ({
      ...f,
      tasks: f.tasks.filter((_, i) => i !== index),
    }));
  }

  updateEditTask(index: number, field: string, value: string | boolean | number) {
    this.editForm.update((f) => {
      const tasks = [...f.tasks];
      tasks[index] = { ...tasks[index], [field]: value };
      return { ...f, tasks };
    });
  }

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

  // ── CRUD ───────────────────────────────────────────────
  openCreate() {
    this.createForm.set(this.emptyForm());
    this.showCreateModal.set(true);
  }

  submitCreate() {
    if (!this.createForm().title.trim()) return;
    console.log('Create goal:', this.createForm());
    this.showCreateModal.set(false);
  }

  openEdit(goal: Goal) {
    this.selectedGoal.set(goal);
    this.editForm.set({
      title: goal.title,
      description: goal.description,
      measurableTarget: goal.measurableTarget,
      targetValue: goal.targetValue,
      targetUnit: goal.targetUnit,
      currentProgress: goal.currentProgress,
      deadline: goal.deadline,
      status: goal.status,
      accessType: goal.accessType,
      imageFile: goal.imagePath ? null : null,
      categoryIds: goal.categories.map((c) => c.id),
      tasks: goal.tasks.map((t) => ({
        title: t.title,
        description: t.description,
        done: t.done,
        progressContribution: t.progressContribution,
        dueDate: t.dueDate,
      })),
    });
    this.showEditModal.set(true);
  }

  submitEdit() {
    if (!this.editForm().title.trim()) return;
    console.log('Update goal:', this.selectedGoal()?.id, this.editForm());
    this.showEditModal.set(false);
  }

  openDeleteConfirm(goal: Goal) {
    this.selectedGoal.set(goal);
    this.showEditModal.set(false);
    this.showDeleteConfirm.set(true);
  }

  confirmDelete() {
    const id = this.selectedGoal()?.id;
    if (id) this.goals.update((g) => g.filter((goal) => goal.id !== id));
    this.showDeleteConfirm.set(false);
    this.selectedGoal.set(null);
  }

  // ── Helpers ────────────────────────────────────────────
  getTasksDone(goal: Goal): number {
    return goal.tasks.filter((t) => t.done).length;
  }

  getStatusLabel(status: GoalStatus): string {
    const map: Record<GoalStatus, string> = {
      ACTIVE: 'Active',
      COMPLETED: 'Completed',
      ABANDONED: 'Abandoned',
    };
    return map[status];
  }

  getStatusIcon(status: GoalStatus): string {
    const map: Record<GoalStatus, string> = {
      ACTIVE: 'rocket_launch',
      COMPLETED: 'check_circle',
      ABANDONED: 'cancel',
    };
    return map[status];
  }

  getStatusClass(status: GoalStatus): string {
    const map: Record<GoalStatus, string> = {
      ACTIVE: 'status--active',
      COMPLETED: 'status--completed',
      ABANDONED: 'status--abandoned',
    };
    return map[status];
  }

  onCreateImageSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.createForm.update((f) => ({ ...f, imageFile: file }));
    }
  }

  onEditImageSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.editForm.update((f) => ({ ...f, imageFile: file }));
    }
  }

  getCreateImagePreview(): string | null {
    const file = this.createForm().imageFile;
    return file ? URL.createObjectURL(file) : null;
  }

  getEditImagePreview(): string | null {
    const file = this.editForm().imageFile;
    if (file) return URL.createObjectURL(file);
    return this.selectedGoal()?.imagePath ?? null;
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
  onAiClick() {
    console.log('AI clicked');
  }
}
