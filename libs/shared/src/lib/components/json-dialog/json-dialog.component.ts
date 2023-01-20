import {JsonPipe, NgIf} from '@angular/common';
import {Component} from '@angular/core';
import {NbButtonModule, NbCardModule, NbDialogRef, NbInputModule} from '@nebular/theme';
import {TranslocoModule} from '@ngneat/transloco';

@Component({
  standalone: true,
  selector: 'lib-json-dialog',
  templateUrl: './json-dialog.component.html',
  styleUrls: ['./json-dialog.component.scss'],
  imports: [NbCardModule, NgIf, NbButtonModule, JsonPipe, TranslocoModule, NbInputModule],
})
export class JsonDialogComponent {
  public data: string;

  constructor(private _dialogRef: NbDialogRef<JsonDialogComponent>) {}

  public close(): void {
    this._dialogRef.close();
  }
}
