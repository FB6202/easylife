import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class PaginationComponent {
  currentPage = input<number>(0);
  totalPages = input<number>(0);
  totalElements = input<number>(0);
  pageSize = input<number>(20);
  showAiButton = input<boolean>(true);

  pageChange = output<number>();
  aiClick = output<void>();

  get startItem(): number {
    return this.currentPage() * this.pageSize() + 1;
  }

  get endItem(): number {
    return Math.min((this.currentPage() + 1) * this.pageSize(), this.totalElements());
  }

  get pages(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    if (total <= 5) return Array.from({ length: total }, (_, i) => i);
    if (current <= 2) return [0, 1, 2, 3, 4];
    if (current >= total - 3) return [total - 5, total - 4, total - 3, total - 2, total - 1];
    return [current - 2, current - 1, current, current + 1, current + 2];
  }

  goTo(page: number) {
    if (page >= 0 && page < this.totalPages()) {
      this.pageChange.emit(page);
    }
  }
}
