import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FilterPanelComponent,
  FilterField,
  FilterValues,
} from '../../../shared/components/filter/filter';

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
  imports: [CommonModule, PaginationComponent, FilterPanelComponent],
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  readonly currentPage = signal(0);
  readonly totalPages = signal(3);
  readonly totalElements = computed(() =>
    this.activeTab() === 'following' ? this.following().length : this.followers().length,
  );
  readonly pageSize = signal(10);

  showFilter = signal(false);
  activeFilters = signal<FilterValues>({});

  readonly followingFilterFields: FilterField[] = [
    {
      key: 'search',
      label: 'Search',
      type: 'text',
      icon: 'search',
      placeholder: 'Search by name or username...',
    },
    {
      key: 'tab',
      label: 'View',
      type: 'select',
      icon: 'people',
      options: [
        { value: 'following', label: 'Following' },
        { value: 'followers', label: 'Followers' },
      ],
    },
    {
      key: 'followStatus',
      label: 'Follow Status',
      type: 'multiselect',
      icon: 'person_add',
      options: [
        { value: 'FOLLOWING', label: 'Following', icon: 'how_to_reg', color: '#43a047' },
        { value: 'REQUESTED', label: 'Requested', icon: 'schedule', color: '#f9a825' },
      ],
    },
    {
      key: 'hasPublicGoals',
      label: 'Has Public Goals',
      type: 'toggle',
      icon: 'flag',
    },
    {
      key: 'hasPublicContacts',
      label: 'Has Public Contacts',
      type: 'toggle',
      icon: 'people',
    },
  ];

  readonly pendingCount = computed(() => this.pendingRequests().length);

  readonly activeList = computed(() =>
    this.activeTab() === 'following' ? this.following() : this.followers(),
  );

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
    console.log('Following filter applied:', values);
  }

  onFilterReset() {
    this.activeFilters.set({});
  }

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

  goToSearch() {
    const username = this.route.snapshot.paramMap.get('username');
    this.router.navigate([`/workspace/${username}/network/search`]);
  }
}
