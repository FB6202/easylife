import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class PaginationComponent {
  readonly currentPage = input.required<number>();
  readonly totalPages = input.required<number>();
  readonly totalElements = input.required<number>();
  readonly pageSize = input<number>(6);
  readonly showAiButton = input<boolean>(true);

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();
  readonly aiClick = output<void>();

  readonly pageSizeOptions = [6, 12, 24, 48];

  readonly visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i);
    }

    const pages: (number | 'ellipsis')[] = [];

    pages.push(0);

    if (current <= 3) {
      pages.push(1, 2, 3, 4, 'ellipsis');
    } else if (current >= total - 4) {
      pages.push('ellipsis', total - 5, total - 4, total - 3, total - 2);
    } else {
      pages.push('ellipsis', current - 1, current, current + 1, 'ellipsis');
    }

    pages.push(total - 1);
    return pages;
  });

  readonly startItem = computed(() => this.currentPage() * this.pageSize() + 1);

  readonly endItem = computed(() =>
    Math.min((this.currentPage() + 1) * this.pageSize(), this.totalElements()),
  );

  goTo(page: number) {
    if (page < 0 || page >= this.totalPages() || page === this.currentPage()) return;
    this.pageChange.emit(page);
  }

  prev() {
    this.goTo(this.currentPage() - 1);
  }
  next() {
    this.goTo(this.currentPage() + 1);
  }

  onSizeChange(size: number) {
    this.pageSizeChange.emit(size);
    this.pageChange.emit(0);
  }

  onAiClick() {
    this.aiClick.emit();
  }

  isEllipsis(page: number | 'ellipsis'): boolean {
    return page === 'ellipsis';
  }

  asNumber(page: number | 'ellipsis'): number {
    return page as number;
  }
}
