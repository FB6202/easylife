import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

type ViewMode = 'month' | 'week' | 'day';
type EventType = 'APPOINTMENT' | 'REMINDER' | 'TASK' | 'BIRTHDAY';

interface CalendarEvent {
  id: number;
  title: string;
  time?: string;
  endTime?: string;
  location?: string;
  type: EventType;
  color: string;
  isPublic: boolean;
  accessLabel?: string;
  date: Date;
}

interface DayCell {
  date: Date;
  currentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

interface WeekDay {
  date: Date;
  isToday: boolean;
  events: CalendarEvent[];
}

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar-event.html',
  styleUrl: './calendar-event.scss'
})
export class CalendarComponent {

  readonly today = new Date(2026, 3, 29); // 29. April 2026
  readonly viewMode = signal<ViewMode>('month');
  readonly activeFilter = signal<EventType | 'ALL'>('ALL');
  readonly currentDate = signal(new Date(this.today));

  readonly eventTypes: { type: EventType; icon: string; label: string }[] = [
    { type: 'APPOINTMENT', icon: 'event', label: 'Appointments' },
    { type: 'REMINDER', icon: 'notifications', label: 'Reminders' },
    { type: 'TASK', icon: 'check_circle', label: 'Tasks' },
    { type: 'BIRTHDAY', icon: 'cake', label: 'Birthdays' },
  ];

  readonly weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  readonly hours = Array.from({ length: 24 }, (_, i) => i);

  readonly allEvents = signal<CalendarEvent[]>([
    {
      id: 1,
      title: 'Team Standup',
      time: '09:00',
      endTime: '09:30',
      location: 'Google Meet',
      type: 'APPOINTMENT',
      color: '#43a047',
      isPublic: true,
      date: new Date(2026, 3, 29)
    },
    {
      id: 2,
      title: 'Quarterly Review',
      time: '14:00',
      endTime: '15:30',
      location: 'Office',
      type: 'APPOINTMENT',
      color: '#1976d2',
      isPublic: false,
      accessLabel: 'PRIVATE',
      date: new Date(2026, 3, 29)
    },
    {
      id: 3,
      title: 'Deploy Backend',
      time: '11:00',
      endTime: '12:00',
      type: 'TASK',
      color: '#f57c00',
      isPublic: true,
      date: new Date(2026, 3, 30)
    },
    {
      id: 4,
      title: "Felix's Birthday",
      type: 'BIRTHDAY',
      color: '#e91e63',
      isPublic: false,
      date: new Date(2026, 3, 28)
    },
    {
      id: 5,
      title: 'Sprint Planning',
      time: '10:00',
      endTime: '11:30',
      location: 'Conference Room',
      type: 'APPOINTMENT',
      color: '#9c27b0',
      isPublic: true,
      date: new Date(2026, 3, 27)
    }
  ]);

  // ── Computed Header ────────────────────────────────────────

  readonly headerTitle = computed(() => {
    const d = this.currentDate();
    const view = this.viewMode();

    if (view === 'month') {
      return d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    }
    if (view === 'week') {
      const week = this.currentWeekDays();
      const first = week[0].date;
      const last = week[6].date;
      const sameMonth = first.getMonth() === last.getMonth();
      if (sameMonth) {
        return `${first.toLocaleString('en-US', { month: 'long' })} ${first.getDate()} – ${last.getDate()}, ${first.getFullYear()}`;
      }
      return `${first.toLocaleString('en-US', { month: 'short' })} ${first.getDate()} – ${last.toLocaleString('en-US', { month: 'short' })} ${last.getDate()}, ${last.getFullYear()}`;
    }
    // day
    return d.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  });

  readonly headerLabel = computed(() => {
    const view = this.viewMode();
    if (view === 'month') return `SCHEDULE ${this.currentDate().getFullYear()}`;
    if (view === 'week') return 'WEEK VIEW';
    return 'DAY VIEW';
  });

  readonly upcomingCount = computed(() => {
    const d = this.currentDate();
    const view = this.viewMode();
    if (view === 'month') {
      return this.allEvents().filter(e =>
        e.date.getMonth() === d.getMonth() &&
        e.date.getFullYear() === d.getFullYear()
      ).length;
    }
    if (view === 'week') {
      const week = this.currentWeekDays();
      const first = week[0].date;
      const last = week[6].date;
      return this.allEvents().filter(e => e.date >= first && e.date <= last).length;
    }
    return this.eventsForDay(d).length;
  });

  // ── Month View ─────────────────────────────────────────────

  readonly calendarDays = computed((): DayCell[] => {
    const date = this.currentDate();
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startDow = firstDay.getDay() - 1;
    if (startDow < 0) startDow = 6;

    const days: DayCell[] = [];

    for (let i = startDow - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      days.push({ date: d, currentMonth: false, isToday: false, events: [] });
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const cellDate = new Date(year, month, d);
      const isToday = this.isSameDay(cellDate, this.today);
      const events = this.eventsForDay(cellDate);
      days.push({ date: cellDate, currentMonth: true, isToday, events });
    }

    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const cellDate = new Date(year, month + 1, d);
      days.push({ date: cellDate, currentMonth: false, isToday: false, events: [] });
    }

    return days;
  });

  // ── Week View ──────────────────────────────────────────────

  readonly currentWeekDays = computed((): WeekDay[] => {
    const d = this.currentDate();
    const dow = d.getDay();
    const mondayOffset = dow === 0 ? -6 : 1 - dow;
    const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate() + mondayOffset);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
      return {
        date,
        isToday: this.isSameDay(date, this.today),
        events: this.eventsForDay(date)
      };
    });
  });

  // ── Day View ───────────────────────────────────────────────

  readonly dayEvents = computed(() =>
    this.eventsForDay(this.currentDate())
      .sort((a, b) => (a.time ?? '').localeCompare(b.time ?? ''))
  );

  // ── Today Panel ────────────────────────────────────────────

  readonly todayEvents = computed(() =>
    this.eventsForDay(this.today)
  );

  // ── Navigation ─────────────────────────────────────────────

  prev() {
    const d = this.currentDate();
    const view = this.viewMode();
    if (view === 'month') {
      this.currentDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
    } else if (view === 'week') {
      this.currentDate.set(new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7));
    } else {
      this.currentDate.set(new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1));
    }
  }

  next() {
    const d = this.currentDate();
    const view = this.viewMode();
    if (view === 'month') {
      this.currentDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
    } else if (view === 'week') {
      this.currentDate.set(new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7));
    } else {
      this.currentDate.set(new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1));
    }
  }

  goToday() {
    this.currentDate.set(new Date(this.today));
  }

  setView(mode: ViewMode) {
    this.viewMode.set(mode);
  }

  setFilter(type: EventType | 'ALL') {
    this.activeFilter.set(type);
  }

  // ── Helpers ────────────────────────────────────────────────

  eventsForDay(date: Date): CalendarEvent[] {
    return this.allEvents().filter(e => this.isSameDay(e.date, date));
  }

  isSameDay(a: Date, b: Date): boolean {
    return a.getDate() === b.getDate() &&
           a.getMonth() === b.getMonth() &&
           a.getFullYear() === b.getFullYear();
  }

  isWeekend(date: Date): boolean {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  formatDayShort(date: Date): string {
    return date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
  }

  formatHour(hour: number): string {
    return hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`;
  }

  getEventTopPercent(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return ((h * 60 + m) / (24 * 60)) * 100;
  }

  getEventHeightPercent(time: string, endTime: string): number {
    const [h1, m1] = time.split(':').map(Number);
    const [h2, m2] = endTime.split(':').map(Number);
    const duration = (h2 * 60 + m2) - (h1 * 60 + m1);
    return (duration / (24 * 60)) * 100;
  }
}