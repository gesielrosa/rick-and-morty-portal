import {Component, Input} from '@angular/core';
import {TranslocoModule} from '@ngneat/transloco';

import {CardComponent, FavoriteButtonComponent} from '@libs/shared';

@Component({
  standalone: true,
  selector: 'lib-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
  imports: [TranslocoModule, CardComponent, FavoriteButtonComponent],
})
export class LocationCardComponent {
  @Input() id: number;

  @Input() name: string;

  @Input() dimension: string;

  @Input() type: string;
}
