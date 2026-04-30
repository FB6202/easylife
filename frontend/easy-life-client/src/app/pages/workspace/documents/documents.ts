import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

type ViewMode = 'grid' | 'list';
type AccessType = 'PRIVATE' | 'PUBLIC';
type FileType = 'pdf' | 'docx' | 'xlsx' | 'png' | 'jpg' | 'zip';

interface Document {
  id: number;
  title: string;
  fileType: FileType;
  fileSizeBytes: number;
  accessType: AccessType;
  uploadedAt: string;
  categoryIds: number[];
}

@Component({
  selector: 'app-documents',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './documents.html',
  styleUrl: './documents.scss',
})
export class DocumentsComponent {
  readonly viewMode = signal<ViewMode>('grid');

  readonly documents = signal<Document[]>([
    {
      id: 1,
      title: 'Quarterly Financial Statement 2024',
      fileType: 'pdf',
      fileSizeBytes: 2400000,
      accessType: 'PRIVATE',
      uploadedAt: 'Aug 15, 2024',
      categoryIds: [1],
    },
    {
      id: 2,
      title: 'Product Design Manifesto v2',
      fileType: 'docx',
      fileSizeBytes: 850000,
      accessType: 'PUBLIC',
      uploadedAt: 'Oct 12, 2023',
      categoryIds: [2],
    },
    {
      id: 3,
      title: 'Brand Assets Package 2024',
      fileType: 'png',
      fileSizeBytes: 18500000,
      accessType: 'PRIVATE',
      uploadedAt: 'Sep 01, 2024',
      categoryIds: [3],
    },
    {
      id: 4,
      title: 'User Feedback Analysis',
      fileType: 'xlsx',
      fileSizeBytes: 1200000,
      accessType: 'PUBLIC',
      uploadedAt: 'Aug 28, 2024',
      categoryIds: [1, 2],
    },
    {
      id: 5,
      title: 'Service Agreement 2024',
      fileType: 'pdf',
      fileSizeBytes: 320000,
      accessType: 'PRIVATE',
      uploadedAt: 'Jul 12, 2024',
      categoryIds: [1],
    },
    {
      id: 6,
      title: 'Onboarding Guide',
      fileType: 'docx',
      fileSizeBytes: 560000,
      accessType: 'PUBLIC',
      uploadedAt: 'Jun 30, 2024',
      categoryIds: [2],
    },
    {
      id: 7,
      title: 'Office Renovation Photos',
      fileType: 'jpg',
      fileSizeBytes: 42000000,
      accessType: 'PRIVATE',
      uploadedAt: 'May 15, 2024',
      categoryIds: [],
    },
  ]);

  readonly currentPage = signal(0);
  readonly totalPages = signal(161);
  readonly totalElements = signal(1284);
  readonly pageSize = signal(8);

  readonly totalStorageBytes = computed(() =>
    this.documents().reduce((acc, d) => acc + d.fileSizeBytes, 0),
  );

  readonly totalStorageFormatted = computed(() => {
    const gb = this.totalStorageBytes() / 1e9;
    return gb.toFixed(1) + ' GB';
  });

  readonly totalFiles = computed(() => this.totalElements());

  getFileIcon(type: FileType): string {
    const map: Record<FileType, string> = {
      pdf: 'picture_as_pdf',
      docx: 'description',
      xlsx: 'table_chart',
      png: 'image',
      jpg: 'image',
      zip: 'folder_zip',
    };
    return map[type];
  }

  getFileColor(type: FileType): string {
    const map: Record<FileType, string> = {
      pdf: '#f44336',
      docx: '#1976d2',
      xlsx: '#43a047',
      png: '#f57c00',
      jpg: '#f57c00',
      zip: '#9c27b0',
    };
    return map[type];
  }

  formatSize(bytes: number): string {
    if (bytes >= 1e9) return (bytes / 1e9).toFixed(1) + ' GB';
    if (bytes >= 1e6) return (bytes / 1e6).toFixed(1) + ' MB';
    return (bytes / 1e3).toFixed(0) + ' KB';
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onAiClick() {
    console.log('AI clicked');
  }
}
