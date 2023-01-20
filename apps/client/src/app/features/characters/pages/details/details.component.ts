import {AsyncPipe, NgIf, UpperCasePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {TranslocoModule} from '@ngneat/transloco';
import {map, Observable, switchMap} from 'rxjs';

import {
  AvatarComponent,
  BaseComponent,
  CardComponent,
  ComponentStore,
  FormatJsonPipe,
  FavoriteButtonComponent,
  SourceButtonComponent,
  ExtractIdPipe,
} from '@libs/shared';
import {Character, StatusColorDirective} from '@libs/characters';
import {Episode, EpisodesListComponent, EpisodesService} from '@libs/episodes';
import {RouterLink} from '@angular/router';
import {NbIconModule} from '@nebular/theme';

@Component({
  standalone: true,
  selector: 'app-details',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.scss'],
  providers: [BaseComponent, ComponentStore, {provide: 'STORE_STATE', useValue: {item: null}}],
  imports: [
    NgIf,
    AsyncPipe,
    AvatarComponent,
    CardComponent,
    TranslocoModule,
    StatusColorDirective,
    UpperCasePipe,
    EpisodesListComponent,
    FavoriteButtonComponent,
    FormatJsonPipe,
    SourceButtonComponent,
    RouterLink,
    ExtractIdPipe,
    NbIconModule,
  ],
})
export class DetailsComponent implements OnInit {
  public item$ = this._store.select('item');

  public episodes$: Observable<Episode[]> = this.item$.pipe(
    map((item) => {
      return item?.episode?.map((url) => +url?.split('/').pop());
    }),
    switchMap((ids) => {
      return this._episodesService.get(ids).pipe(this.base.stateOperator());
    }),
    map((items) => (Array.isArray(items) ? items : [items]))
  );

  constructor(
    public readonly base: BaseComponent,
    private readonly _store: ComponentStore<{item: Character}>,
    private _episodesService: EpisodesService
  ) {}

  public ngOnInit(): void {
    this.base.routeData$.subscribe(({character}) => {
      this._store.setState({item: character});
    });
  }
}
