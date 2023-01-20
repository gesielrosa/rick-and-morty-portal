import {Component, Input} from '@angular/core';
import {TranslocoModule} from '@ngneat/transloco';
import {DatePipe} from '@angular/common';

import {CardComponent, FavoriteButtonComponent} from '@libs/shared';

@Component({
  standalone: true,
  selector: 'lib-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss'],
  imports: [TranslocoModule, CardComponent, DatePipe, FavoriteButtonComponent],
})
export class EpisodeCardComponent {
  @Input() id: number;

  @Input() name: string;

  @Input() episode: string;

  @Input() airDate: string;
}
