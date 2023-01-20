import {Directive, ElementRef, Input} from '@angular/core';

import {CharacterStatus} from '../models';

@Directive({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[statusColor]',
})
export class StatusColorDirective {
  @Input() set status(value: CharacterStatus) {
    this._setColor(value);
  }

  constructor(private _el: ElementRef<HTMLElement>) {}

  private _setColor(status: CharacterStatus): void {
    switch (status) {
      case 'Alive':
        this._el.nativeElement.style.color = 'var(--text-primary-color)';
        break;
      case 'Dead':
        this._el.nativeElement.style.color = 'var(--text-danger-color)';
        break;
    }
  }
}
