import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {TranslocoModule} from '@ngneat/transloco';

import {BaseComponent, ComponentStore, GrPaginatorComponent, PaginationInfo} from '@libs/shared';
import {Character, CharacterFilter, CharactersListComponent, CharactersService} from '@libs/characters';

import {FilterComponent} from './filter';

@Component({
  standalone: true,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
  imports: [TranslocoModule, NgIf, AsyncPipe, FilterComponent, CharactersListComponent, GrPaginatorComponent],
  providers: [
    BaseComponent,
    ComponentStore,
    {provide: 'STORE_STATE', useValue: {items: [], filter: {}, pagination: {}, page: 1}},
  ],
})
export class ListComponent implements OnInit {
  public items$ = this._store.select('items');

  public pagination$ = this._store.select('pagination');

  public filter$ = this._store.select('filter');

  constructor(
    public base: BaseComponent,
    private _store: ComponentStore<{
      items: Character[];
      filter: CharacterFilter;
      pagination: PaginationInfo;
      page: number;
    }>,
    private _charactersService: CharactersService
  ) {}

  public ngOnInit(): void {
    this._getCharacters();
  }

  private _getCharacters(): void {
    const {page, filter} = this._store.getStateSnapshot();

    this._charactersService
      .list({...filter, page})
      .pipe(this.base.stateOperator())
      .subscribe(({results, pagination}) => {
        this._store.setState({items: results, pagination});
      });
  }

  public onFilterChange(filter: CharacterFilter): void {
    this._resetPage();
    this._store.setState({filter});
    this._getCharacters();
  }

  private _resetPage(): void {
    this._store.setState({page: 1});
  }

  public onPageChange(page: number): void {
    this._store.setState({page});
    this._getCharacters();
  }
}
