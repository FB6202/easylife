import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

type MoodLevel = 'GREAT' | 'GOOD' | 'OKAY' | 'BAD' | 'TERRIBLE';

interface CategoryPreview {
  id: number;
  icon: string;
  color: string;
}

interface JournalEntry {
  id: number;
  title: string;
  mood: MoodLevel;
  wentWell: string;
  wentBad: string;
  learnings: string | null;
  gratitude: string | null;
  entryDate: string;
  entryDay: string;
  entryMonth: string;
  entryYear: string;
  categories: CategoryPreview[]; // statt categoryIds
  wordCount: number;
  readMinutes: number;
}

@Component({
  selector: 'app-journal',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './journal.html',
  styleUrl: './journal.scss',
})
export class JournalComponent {
  readonly entries = signal<JournalEntry[]>([
    {
      id: 1,
      title: 'Quarterly Review & Future Strategy',
      mood: 'GREAT',
      wentWell: 'Successfully finalized the product roadmap for Q4 and received enthusiasti...',
      wentBad: 'Communication with the remote design team felt lagged, resulting in two...',
      learnings: 'Clear async communication protocols are essential for distributed teams.',
      gratitude: 'Grateful for the team that pushed through despite the challenges.',
      entryDate: 'Oct 12, 2023',
      entryDay: '12',
      entryMonth: 'OCT',
      entryYear: '2023',
      categories: [
        { id: 1, icon: 'payments', color: '#f57c00' },
        { id: 2, icon: 'rocket_launch', color: '#43a047' },
      ],
      wordCount: 2400,
      readMinutes: 15,
    },
    {
      id: 2,
      title: 'Mindful Morning & Technical Debt',
      mood: 'GOOD',
      wentWell: 'The deep-work block in the morning was incredibly productive; cleared through...',
      wentBad: 'Skipped lunch to meet a minor deadline, which led to a significant energy crash...',
      learnings: 'Always protect lunch breaks — energy management is productivity management.',
      gratitude: null,
      entryDate: 'Oct 11, 2023',
      entryDay: '11',
      entryMonth: 'OCT',
      entryYear: '2023',
      categories: [{ id: 1, icon: 'work', color: '#1976d2' }],
      wordCount: 1120,
      readMinutes: 8,
    },
    {
      id: 3,
      title: 'Cross-Functional Friction Points',
      mood: 'OKAY',
      wentWell: 'Connected with Sarah from Marketing over coffee; we found a better way to...',
      wentBad: 'Realized the scope of the animation project was under-estimated; need to...',
      learnings: null,
      gratitude: "Grateful for Sarah's patience and collaborative mindset.",
      entryDate: 'Oct 10, 2023',
      entryDay: '10',
      entryMonth: 'OCT',
      entryYear: '2023',
      categories: [
        { id: 2, icon: 'self_improvement', color: '#9c27b0' },
        { id: 3, icon: 'groups', color: '#00bcd4' },
      ],
      wordCount: 850,
      readMinutes: 5,
    },
  ]);

  readonly currentPage = signal(0);
  readonly totalPages = signal(12);
  readonly totalElements = signal(48);
  readonly pageSize = signal(3);

  getMoodIcon(mood: MoodLevel): string {
    const map: Record<MoodLevel, string> = {
      GREAT: 'sentiment_very_satisfied',
      GOOD: 'sentiment_satisfied',
      OKAY: 'sentiment_neutral',
      BAD: 'sentiment_dissatisfied',
      TERRIBLE: 'sentiment_very_dissatisfied',
    };
    return map[mood];
  }

  getMoodColor(mood: MoodLevel): string {
    const map: Record<MoodLevel, string> = {
      GREAT: '#43a047',
      GOOD: '#1976d2',
      OKAY: '#f9a825',
      BAD: '#f57c00',
      TERRIBLE: '#d32f2f',
    };
    return map[mood];
  }

  getMoodLabel(mood: MoodLevel): string {
    const map: Record<MoodLevel, string> = {
      GREAT: 'Great',
      GOOD: 'Good',
      OKAY: 'Okay',
      BAD: 'Bad',
      TERRIBLE: 'Terrible',
    };
    return map[mood];
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onAiClick() {
    console.log('AI clicked');
  }
}
