import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {TranslocoModule} from '@ngneat/transloco';
import {NbTabsetModule} from '@nebular/theme';
import {forkJoin, map, of, switchMap} from 'rxjs';

import {BaseComponent, ComponentStore, FavoritesService} from '@libs/shared';
import {Character, CharactersListComponent, CharactersService} from '@libs/characters';
import {Episode, EpisodesListComponent, EpisodesService} from '@libs/episodes';
import {Location, LocationsListComponent, LocationsService} from '@libs/locations';

@Component({
  standalone: true,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
  imports: [
    NgIf,
    AsyncPipe,
    TranslocoModule,
    NbTabsetModule,
    CharactersListComponent,
    EpisodesListComponent,
    LocationsListComponent,
  ],
  providers: [
    BaseComponent,
    ComponentStore,
    {provide: 'STORE_STATE', useValue: {characters: [], episodes: [], locations: []}},
  ],
})
export class ListComponent implements OnInit {
  public characters$ = this._store.select('characters');

  public episodes$ = this._store.select('episodes');

  public locations$ = this._store.select('locations');

  constructor(
    public base: BaseComponent,
    private _store: ComponentStore<{
      characters: Character[];
      episodes: Episode[];
      locations: Location[];
    }>,
    private _charactersService: CharactersService,
    private _episodesService: EpisodesService,
    private _locationsService: LocationsService,
    private _favoritesService: FavoritesService
  ) {}

  public ngOnInit(): void {
    this._fetch();
  }

  private _fetch(): void {
    this._favoritesService.favorites$
      .pipe(
        switchMap(({characters, locations, episodes}) => {
          const charactersRequest = characters?.length ? this._charactersService.get(characters) : of([]);

          const episodesRequest = episodes?.length ? this._episodesService.get(episodes) : of([]);

          const locationsRequest = locations?.length ? this._locationsService.get(locations) : of([]);

          return forkJoin([charactersRequest, episodesRequest, locationsRequest]).pipe(
            map(([characters, episodes, locations]) => {
              return {
                characters: this._toArray(characters),
                episodes: this._toArray(episodes),
                locations: this._toArray(locations),
              };
            }),
            this.base.stateOperator()
          );
        })
      )
      .subscribe(({characters, episodes, locations}) => {
        this._store.setState({characters, episodes, locations});
      });
  }

  private _toArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
  }
}
