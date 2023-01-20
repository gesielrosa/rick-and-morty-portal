import {AsyncPipe, NgIf} from '@angular/common';
import {Component, HostListener, Input} from '@angular/core';
import {NbButtonModule, NbIconModule} from '@nebular/theme';
import {filter, map} from 'rxjs';

import {FavoritesService} from '../../services';

@Component({
  standalone: true,
  selector: 'lib-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
  imports: [NbIconModule, NgIf, AsyncPipe],
})
export class FavoriteButtonComponent {
  @Input() id: number;

  @Input() type: 'characters' | 'locations' | 'episodes';

  protected isFavorite$ = this._favoritesService.favorites$.pipe(
    filter(() => !!this.type && !!this.id),
    map((favorites) => favorites[this.type]?.includes(this.id))
  );

  constructor(private readonly _favoritesService: FavoritesService) {}

  @HostListener('click', ['$event'])
  private _onClick(event: Event): void {
    this._favoritesService.toggleFavorite(this.type, this.id);
    event.stopPropagation();
  }
}
