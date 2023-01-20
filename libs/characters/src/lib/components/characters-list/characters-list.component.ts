import {NgForOf, NgIf} from '@angular/common';
import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslocoModule} from '@ngneat/transloco';

import {NgForElseDirective, TrackByKeyPipe} from '@libs/shared';

import {Character} from '../../models';
import {CharacterCardComponent} from '../character-card';

@Component({
  standalone: true,
  selector: 'lib-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
  imports: [NgIf, NgForOf, NgForElseDirective, CharacterCardComponent, RouterLink, TranslocoModule, TrackByKeyPipe],
})
export class CharactersListComponent {
  @Input() set items(value: Character[]) {
    this._items = value;
  }

  get items(): Character[] {
    return this._items;
  }

  private _items: Character[] = [];
}
