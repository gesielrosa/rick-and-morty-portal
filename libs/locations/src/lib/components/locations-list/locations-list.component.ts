import {NgForOf, NgIf} from '@angular/common';
import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslocoModule} from '@ngneat/transloco';

import {NgForElseDirective, TrackByKeyPipe} from '@libs/shared';

import {Location} from '../../models';
import {LocationCardComponent} from '../location-card';

@Component({
  standalone: true,
  selector: 'lib-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss'],
  imports: [NgIf, NgForOf, LocationCardComponent, RouterLink, TranslocoModule, NgForElseDirective, TrackByKeyPipe],
})
export class LocationsListComponent {
  @Input() set items(value: Location[]) {
    this._items = value;
  }

  get items(): Location[] {
    return this._items;
  }

  private _items: Location[] = [];
}
