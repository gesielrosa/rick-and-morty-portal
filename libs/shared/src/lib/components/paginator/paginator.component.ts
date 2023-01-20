import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {NbButtonModule, NbIconModule} from '@nebular/theme';

@Component({
  standalone: true,
  selector: 'lib-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  imports: [NgIf, NbButtonModule, NbIconModule],
})
export class GrPaginatorComponent {
  @Input() currentPage: number;

  @Input() totalItems: number;

  @Input() totalPages: number;

  @Input() ofText = 'de';

  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  public nextPage(): void {
    this.onChangePage(this.currentPage + 1);
  }

  public previousPage(): void {
    this.onChangePage(this.currentPage - 1);
  }

  public onChangePage(page: number): void {
    this.changePage.emit(page);
  }
}
