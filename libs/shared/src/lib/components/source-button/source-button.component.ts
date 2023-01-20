import {Component, HostListener, Input} from '@angular/core';
import {NbButtonModule, NbDialogService, NbIconModule} from '@nebular/theme';

import {JsonDialogComponent} from '../json-dialog';

@Component({
  standalone: true,
  selector: 'lib-source-button',
  templateUrl: './source-button.component.html',
  styleUrls: ['./source-button.component.scss'],
  imports: [NbButtonModule, NbIconModule],
})
export class SourceButtonComponent {
  @Input() data: string;

  constructor(private _dialogService: NbDialogService) {}

  @HostListener('click', ['$event'])
  private _onClick(event: Event): void {
    this._dialogService.open(JsonDialogComponent, {context: {data: this.data}});
    event.stopPropagation();
  }
}
