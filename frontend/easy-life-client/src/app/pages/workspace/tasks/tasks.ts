import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'OPTIONAL';
type Status = 'OPEN' | 'IN_PROGRESS' | 'DONE';
type AccessType = 'PRIVATE' | 'PUBLIC';

interface CategoryOption {
  id: number;
  name: string;
  icon: string;
  color: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  categories: CategoryOption[];
  status: Status;
  priority: Priority;
  accessType: AccessType;
  dueDay: string;
  dueMonth: string;
  dueYear: string;
  dueDate: string;
  done: boolean;
}

interface TaskForm {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  accessType: AccessType;
  dueDate: string;
  categoryIds: number[];
}

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss'
})
export class TasksComponent {

  // Available categories (later from API)
  readonly availableCategories = signal<CategoryOption[]>([
    { id: 1, name: 'Work', icon: 'work', color: '#1976d2' },
    { id: 2, name: 'Finance', icon: 'payments', color: '#f57c00' },
    { id: 3, name: 'Health', icon: 'self_improvement', color: '#43a047' },
    { id: 4, name: 'Personal', icon: 'person', color: '#9c27b0' },
    { id: 5, name: 'Learning', icon: 'school', color: '#e91e63' },
  ]);

  readonly tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Review Annual Financial Report Q4',
      description: 'Analyze the fiscal growth trends for this quarter',
      categories: [
        { id: 2, name: 'Finance', icon: 'payments', color: '#f57c00' },
        { id: 1, name: 'Work', icon: 'work', color: '#1976d2' },
      ],
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      accessType: 'PRIVATE',
      dueDay: '24', dueMonth: 'OCT', dueYear: '2025',
      dueDate: '2025-10-24',
      done: false
    },
    {
      id: 2,
      title: 'Monthly Team Synergy Workshop',
      description: 'Interactive session focusing on team collaboration',
      categories: [
        { id: 1, name: 'Work', icon: 'work', color: '#1976d2' },
        { id: 3, name: 'Health', icon: 'self_improvement', color: '#43a047' },
      ],
      status: 'OPEN',
      priority: 'MEDIUM',
      accessType: 'PUBLIC',
      dueDay: '02', dueMonth: 'NOV', dueYear: '2025',
      dueDate: '2025-11-02',
      done: false
    },
    {
      id: 3,
      title: 'Product Website Refresh Design',
      description: 'Finalizing the visual identity and component library',
      categories: [
        { id: 4, name: 'Personal', icon: 'person', color: '#9c27b0' },
      ],
      status: 'DONE',
      priority: 'LOW',
      accessType: 'PUBLIC',
      dueDay: '12', dueMonth: 'OCT', dueYear: '2025',
      dueDate: '2025-10-12',
      done: true
    },
    {
      id: 4,
      title: 'R&D Lab Protocol Audit',
      description: 'Safety inspection and documentation review',
      categories: [
        { id: 1, name: 'Work', icon: 'work', color: '#1976d2' },
        { id: 2, name: 'Finance', icon: 'payments', color: '#f57c00' },
        { id: 5, name: 'Learning', icon: 'school', color: '#e91e63' },
      ],
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      accessType: 'PRIVATE',
      dueDay: '28', dueMonth: 'OCT', dueYear: '2025',
      dueDate: '2025-10-28',
      done: false
    }
  ]);

  readonly currentPage = signal(0);
  readonly totalPages = signal(3);
  readonly totalElements = signal(24);
  readonly pageSize = signal(4);

  // Stats
  readonly pendingCount = computed(() =>
    this.tasks().filter(t => t.status !== 'DONE').length
  );
  readonly inProgressCount = computed(() =>
    this.tasks().filter(t => t.status === 'IN_PROGRESS').length
  );
  readonly doneCount = computed(() =>
    this.tasks().filter(t => t.status === 'DONE').length
  );
  readonly completionRate = computed(() => {
    const total = this.tasks().length;
    if (total === 0) return 0;
    return Math.round((this.doneCount() / total) * 100);
  });
  readonly productivityScore = computed(() =>
    (this.completionRate() / 10).toFixed(1)
  );
  readonly productivityLabel = computed(() => {
    const score = parseFloat(this.productivityScore());
    if (score >= 9) return 'Elite';
    if (score >= 7) return 'High';
    if (score >= 5) return 'Good';
    return 'Building';
  });

  // Modals
  showCreateModal = signal(false);
  showEditModal = signal(false);
  showDeleteConfirm = signal(false);
  showDoneConfirm = signal(false);
  selectedTask = signal<Task | null>(null);
  activeMenu = signal<number | null>(null);

  // Create Form
  createForm = signal<TaskForm>({
    title: '',
    description: '',
    priority: 'MEDIUM',
    status: 'OPEN',
    accessType: 'PRIVATE',
    dueDate: '',
    categoryIds: []
  });

  // Edit Form
  editForm = signal<TaskForm>({
    title: '',
    description: '',
    priority: 'MEDIUM',
    status: 'OPEN',
    accessType: 'PRIVATE',
    dueDate: '',
    categoryIds: []
  });

  readonly priorities: Priority[] = ['OPTIONAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
  readonly statuses: Status[] = ['OPEN', 'IN_PROGRESS', 'DONE'];

  // ── Create ──────────────────────────────────────────────
  openCreate() {
    this.createForm.set({
      title: '', description: '', priority: 'MEDIUM',
      status: 'OPEN', accessType: 'PRIVATE', dueDate: '', categoryIds: []
    });
    this.showCreateModal.set(true);
  }

  toggleCreateCategory(id: number) {
    this.createForm.update(f => {
      const ids = f.categoryIds.includes(id)
        ? f.categoryIds.filter(i => i !== id)
        : f.categoryIds.length < 5 ? [...f.categoryIds, id] : f.categoryIds;
      return { ...f, categoryIds: ids };
    });
  }

  submitCreate() {
    if (!this.createForm().title.trim()) return;
    // later: API call
    console.log('Create task:', this.createForm());
    this.showCreateModal.set(false);
  }

  // ── Edit / Details ──────────────────────────────────────
  openEdit(task: Task) {
    this.selectedTask.set(task);
    this.editForm.set({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      accessType: task.accessType,
      dueDate: task.dueDate,
      categoryIds: task.categories.map(c => c.id)
    });
    this.activeMenu.set(null);
    this.showEditModal.set(true);
  }

  toggleEditCategory(id: number) {
    this.editForm.update(f => {
      const ids = f.categoryIds.includes(id)
        ? f.categoryIds.filter(i => i !== id)
        : f.categoryIds.length < 5 ? [...f.categoryIds, id] : f.categoryIds;
      return { ...f, categoryIds: ids };
    });
  }

  submitEdit() {
    if (!this.editForm().title.trim()) return;
    // later: API call
    console.log('Update task:', this.selectedTask()?.id, this.editForm());
    this.showEditModal.set(false);
  }

  // ── Delete ──────────────────────────────────────────────
  openDeleteConfirm(task: Task) {
    this.selectedTask.set(task);
    this.activeMenu.set(null);
    this.showDeleteConfirm.set(true);
  }

  confirmDelete() {
    const id = this.selectedTask()?.id;
    if (id) {
      this.tasks.update(t => t.filter(task => task.id !== id));
    }
    this.showDeleteConfirm.set(false);
    this.selectedTask.set(null);
  }

  // ── Mark Done ───────────────────────────────────────────
  openDoneConfirm(task: Task) {
    this.selectedTask.set(task);
    this.activeMenu.set(null);
    this.showDoneConfirm.set(true);
  }

  confirmDone() {
    const id = this.selectedTask()?.id;
    if (id) {
      this.tasks.update(t =>
        t.map(task => task.id === id
          ? { ...task, status: 'DONE', done: true }
          : task
        )
      );
    }
    this.showDoneConfirm.set(false);
    this.selectedTask.set(null);
  }

  // ── Helpers ─────────────────────────────────────────────
  toggleMenu(id: number, event: Event) {
    event.stopPropagation();
    this.activeMenu.update(v => v === id ? null : id);
  }

  getPriorityClass(priority: Priority): string {
    return `priority--${priority.toLowerCase()}`;
  }

  getStatusClass(status: Status): string {
    const map: Record<Status, string> = {
      OPEN: 'status--open',
      IN_PROGRESS: 'status--in-progress',
      DONE: 'status--done'
    };
    return map[status];
  }

  getStatusLabel(status: Status): string {
    const map: Record<Status, string> = {
      OPEN: 'Open', IN_PROGRESS: 'Ongoing', DONE: 'Done'
    };
    return map[status];
  }

  onPageChange(page: number) { this.currentPage.set(page); }
  onAiClick() { console.log('AI clicked'); }
}