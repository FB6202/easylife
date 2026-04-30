import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

type RelationshipType = 'FRIEND' | 'COLLEAGUE' | 'BUSINESS' | 'MENTOR' | 'OTHER';

interface NetworkTag {
  id: number;
  label: string;
}

interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  company: string;
  position: string;
  email: string | null;
  phone: string | null;
  linkedinUrl: string | null;
  relationshipType: RelationshipType;
  lastContactedAt: string;
  tags: NetworkTag[];
  initials: string;
  avatarColor: string;
}

@Component({
  selector: 'app-network',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './network.html',
  styleUrl: './network.scss',
})
export class NetworkComponent {
  // Tags – later stored per user in DB
  readonly availableTags = signal<NetworkTag[]>([
    { id: 1, label: 'All Contacts' },
    { id: 2, label: 'Business' },
    { id: 3, label: 'Colleague' },
    { id: 4, label: 'Mentor' },
    { id: 5, label: 'Friend' },
    { id: 6, label: 'Other' },
  ]);

  readonly activeTagId = signal<number>(1);

  readonly contacts = signal<Contact[]>([
    {
      id: 1,
      firstname: 'Eleanor',
      lastname: 'Vance',
      company: 'Global Systems',
      position: 'Director of Ops',
      email: 'eleanor@globalsystems.com',
      phone: '+49 123 456789',
      linkedinUrl: 'https://linkedin.com/in/eleanor-vance',
      relationshipType: 'BUSINESS',
      lastContactedAt: '2 days ago',
      tags: [{ id: 2, label: 'Business' }],
      initials: 'EV',
      avatarColor: '#1976d2',
    },
    {
      id: 2,
      firstname: 'Marcus',
      lastname: 'Thorne',
      company: 'Easy Life',
      position: 'Lead Designer',
      email: 'marcus@easylife.app',
      phone: null,
      linkedinUrl: null,
      relationshipType: 'COLLEAGUE',
      lastContactedAt: 'Today',
      tags: [{ id: 3, label: 'Colleague' }],
      initials: 'MT',
      avatarColor: '#43a047',
    },
    {
      id: 3,
      firstname: 'Sasha',
      lastname: 'Petrov',
      company: 'Silver Oak',
      position: 'Venture Partner',
      email: 'sasha@silveroak.vc',
      phone: '+49 987 654321',
      linkedinUrl: 'https://linkedin.com/in/sasha-petrov',
      relationshipType: 'MENTOR',
      lastContactedAt: '1 month ago',
      tags: [{ id: 4, label: 'Mentor' }],
      initials: 'SP',
      avatarColor: '#9c27b0',
    },
    {
      id: 4,
      firstname: 'Julian',
      lastname: 'Beck',
      company: 'Beck Strategies',
      position: 'Principal',
      email: 'julian@beckstrategies.com',
      phone: '+49 555 123456',
      linkedinUrl: 'https://linkedin.com/in/julian-beck',
      relationshipType: 'BUSINESS',
      lastContactedAt: '2 weeks ago',
      tags: [{ id: 2, label: 'Business' }],
      initials: 'JB',
      avatarColor: '#f57c00',
    },
    {
      id: 5,
      firstname: 'Aria',
      lastname: 'Stark',
      company: 'Freelance',
      position: 'Creative Consultant',
      email: 'aria@freelance.com',
      phone: null,
      linkedinUrl: null,
      relationshipType: 'FRIEND',
      lastContactedAt: '3 days ago',
      tags: [{ id: 5, label: 'Friend' }],
      initials: 'AS',
      avatarColor: '#e91e63',
    },
  ]);

  readonly currentPage = signal(0);
  readonly totalPages = signal(9);
  readonly totalElements = signal(42);
  readonly pageSize = signal(5);

  readonly filteredContacts = computed(() => {
    const activeTag = this.activeTagId();
    if (activeTag === 1) return this.contacts();
    const tag = this.availableTags().find((t) => t.id === activeTag);
    if (!tag) return this.contacts();
    return this.contacts().filter((c) => c.tags.some((t) => t.label === tag.label));
  });

  getRelationshipClass(type: RelationshipType): string {
    const map: Record<RelationshipType, string> = {
      BUSINESS: 'type--business',
      COLLEAGUE: 'type--colleague',
      MENTOR: 'type--mentor',
      FRIEND: 'type--friend',
      OTHER: 'type--other',
    };
    return map[type];
  }

  setActiveTag(id: number) {
    this.activeTagId.set(id);
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onAiClick() {
    console.log('AI clicked');
  }
}
