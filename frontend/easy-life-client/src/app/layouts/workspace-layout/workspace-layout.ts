import { Component, signal, inject, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-workspace-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './workspace-layout.html',
  styleUrl: './workspace-layout.scss',
})
export class WorkspaceLayoutComponent {
  private route = inject(ActivatedRoute);

  sidebarCollapsed = signal(false);
  readonly username = this.route.snapshot.paramMap.get('username') ?? 'user';

  readonly managementItems: NavItem[] = [
    { label: 'Dashboard', route: 'dashboard', icon: 'grid_view' },
    { label: 'Tasks', route: 'tasks', icon: 'check_circle' },
    { label: 'Categories', route: 'categories', icon: 'category' },
    { label: 'Goals', route: 'goals', icon: 'flag' },
    { label: 'Calendar', route: 'calendar', icon: 'calendar_month' },
    { label: 'Documents', route: 'documents', icon: 'description' },
    { label: 'My Week', route: 'my-week', icon: 'view_week' },
    { label: 'Journal', route: 'journal', icon: 'menu_book' },
  ];

  readonly accountItems: NavItem[] = [
    { label: 'Profile', route: 'profile', icon: 'person' },
    { label: 'People', route: 'network', icon: 'people' },
    { label: 'Network', route: 'following', icon: 'person_add' },
    { label: 'Notifications', route: 'notifications', icon: 'notifications' },
  ];

  toggleSidebar() {
    this.sidebarCollapsed.update((v) => !v);
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth < 1024) {
      this.sidebarCollapsed.set(true);
    }
  }
}
