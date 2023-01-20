import {Injectable} from '@angular/core';
import {filter} from 'rxjs';

import {LocalStorageSubject} from '../utils';
import {Store} from '../store';

type Favorites = {
  locations: number[];
  episodes: number[];
  characters: number[];
};

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly _favorites$ = new LocalStorageSubject<Favorites>('favorites');

  private _store = new Store<Favorites>({locations: [], episodes: [], characters: []});

  public favorites$ = this._store.getState();

  public locations$ = this._store.select('locations');

  public episodes$ = this._store.select('episodes');

  public characters$ = this._store.select('characters');

  constructor() {
    this._favorites$.pipe(filter(Boolean)).subscribe((favorites) => {
      this._store.setState(favorites);
    });
  }

  public toggleFavorite(type: keyof Favorites, id: number) {
    const favorites = this._store.getStateSnapshot();
    const ids = favorites[type];
    const index = ids.indexOf(id);
    if (index === -1) {
      ids.push(id);
    } else {
      ids.splice(index, 1);
    }
    this._favorites$.next(favorites);
  }
}
