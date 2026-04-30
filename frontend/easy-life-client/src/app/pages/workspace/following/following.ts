import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

type FollowStatus = 'ACCEPTED' | 'PENDING';

interface FollowUser {
  id: number;
  username: string;
  displayName: string;
  initials: string;
  avatarColor: string;
  status: FollowStatus;
}

interface PendingRequest {
  id: number;
  username: string;
  displayName: string;
  initials: string;
  avatarColor: string;
}

type ActiveTab = 'following' | 'followers';

@Component({
  selector: 'app-following',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './following.html',
  styleUrl: './following.scss',
})
export class FollowingComponent {
  readonly activeTab = signal<ActiveTab>('following');

  readonly pendingRequests = signal<PendingRequest[]>([
    {
      id: 1,
      username: '@arivers_design',
      displayName: 'Alex Rivers',
      initials: 'AR',
      avatarColor: '#1976d2',
    },
    {
      id: 2,
      username: '@ev_strat',
      displayName: 'Elena Vance',
      initials: 'EV',
      avatarColor: '#9c27b0',
    },
  ]);

  readonly following = signal<FollowUser[]>([
    {
      id: 1,
      username: '@jsmith_exec',
      displayName: 'Jordan Smith',
      initials: 'JS',
      avatarColor: '#43a047',
      status: 'ACCEPTED',
    },
    {
      id: 2,
      username: '@sarah_c_vision',
      displayName: 'Sarah Chen',
      initials: 'SC',
      avatarColor: '#f57c00',
      status: 'PENDING',
    },
    {
      id: 3,
      username: '@lowe_m_dev',
      displayName: 'Marcus Lowe',
      initials: 'ML',
      avatarColor: '#e91e63',
      status: 'ACCEPTED',
    },
    {
      id: 4,
      username: '@julia_ortiz_ux',
      displayName: 'Julia Ortiz',
      initials: 'JO',
      avatarColor: '#00bcd4',
      status: 'ACCEPTED',
    },
  ]);

  readonly followers = signal<FollowUser[]>([
    {
      id: 5,
      username: '@max_builder',
      displayName: 'Max Builder',
      initials: 'MB',
      avatarColor: '#ff5722',
      status: 'ACCEPTED',
    },
    {
      id: 6,
      username: '@anna_k_pro',
      displayName: 'Anna Kovalski',
      initials: 'AK',
      avatarColor: '#607d8b',
      status: 'ACCEPTED',
    },
  ]);

  readonly currentPage = signal(0);
  readonly totalPages = signal(3);
  readonly totalElements = computed(() =>
    this.activeTab() === 'following' ? this.following().length : this.followers().length,
  );
  readonly pageSize = signal(10);

  readonly pendingCount = computed(() => this.pendingRequests().length);

  readonly activeList = computed(() =>
    this.activeTab() === 'following' ? this.following() : this.followers(),
  );

  acceptRequest(id: number) {
    this.pendingRequests.update((r) => r.filter((p) => p.id !== id));
  }

  declineRequest(id: number) {
    this.pendingRequests.update((r) => r.filter((p) => p.id !== id));
  }

  unfollow(id: number) {
    this.following.update((f) => f.filter((u) => u.id !== id));
  }

  cancelRequest(id: number) {
    this.following.update((f) => f.filter((u) => u.id !== id));
  }

  setTab(tab: ActiveTab) {
    this.activeTab.set(tab);
    this.currentPage.set(0);
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onAiClick() {
    console.log('AI clicked');
  }
}
