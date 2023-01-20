import {NgForOf, NgIf} from '@angular/common';
import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslocoModule} from '@ngneat/transloco';

import {NgForElseDirective, TrackByKeyPipe} from '@libs/shared';

import {EpisodeCardComponent} from '../episode-card';
import {Episode} from '../../models';

@Component({
  standalone: true,
  selector: 'lib-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss'],
  imports: [NgIf, NgForOf, NgForElseDirective, EpisodeCardComponent, RouterLink, TranslocoModule, TrackByKeyPipe],
})
export class EpisodesListComponent {
  @Input() set items(value: Episode[]) {
    this._items = value;
  }

  get items(): Episode[] {
    return this._items;
  }

  private _items: Episode[] = [];
}
