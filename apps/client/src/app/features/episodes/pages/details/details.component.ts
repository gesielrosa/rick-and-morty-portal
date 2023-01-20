import {AsyncPipe, DatePipe, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {TranslocoModule} from '@ngneat/transloco';
import {map, Observable, switchMap} from 'rxjs';

import {
  BaseComponent,
  CardComponent,
  ComponentStore,
  FormatJsonPipe,
  FavoriteButtonComponent,
  SourceButtonComponent,
} from '@libs/shared';
import {Episode} from '@libs/episodes';
import {Character, CharactersListComponent, CharactersService} from '@libs/characters';

@Component({
  standalone: true,
  selector: 'app-details',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.scss'],
  providers: [BaseComponent, ComponentStore, {provide: 'STORE_STATE', useValue: {item: null}}],
  imports: [
    NgIf,
    AsyncPipe,
    CardComponent,
    TranslocoModule,
    DatePipe,
    CharactersListComponent,
    FavoriteButtonComponent,
    FormatJsonPipe,
    SourceButtonComponent,
  ],
})
export class DetailsComponent implements OnInit {
  public item$ = this._store.select('item');

  public characters$: Observable<Character[]> = this.item$.pipe(
    map((item) => {
      return item?.characters?.map((url) => +url?.split('/').pop());
    }),
    switchMap((ids) => {
      return this._charactersService.get(ids).pipe(this.base.stateOperator());
    }),
    map((items) => (Array.isArray(items) ? items : [items]))
  );

  constructor(
    public readonly base: BaseComponent,
    private readonly _store: ComponentStore<{item: Episode}>,
    private _charactersService: CharactersService
  ) {}

  public ngOnInit(): void {
    this.base.routeData$.subscribe(({episode}) => {
      this._store.setState({item: episode});
    });
  }
}
