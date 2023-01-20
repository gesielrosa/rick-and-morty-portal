import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {TranslocoModule} from '@ngneat/transloco';

import {BaseComponent, ComponentStore, GrPaginatorComponent, PaginationInfo} from '@libs/shared';
import {Location, LocationFilter, LocationsListComponent, LocationsService} from '@libs/locations';

import {FilterComponent} from './filter';

@Component({
  standalone: true,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
  imports: [TranslocoModule, NgIf, AsyncPipe, FilterComponent, LocationsListComponent, GrPaginatorComponent],
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
      items: Location[];
      filter: LocationFilter;
      pagination: PaginationInfo;
      page: number;
    }>,
    private _locationsService: LocationsService
  ) {}

  public ngOnInit(): void {
    this._getLocations();
  }

  private _getLocations(): void {
    const {page, filter} = this._store.getStateSnapshot();

    this._locationsService
      .list({...filter, page})
      .pipe(this.base.stateOperator())
      .subscribe(({results, pagination}) => {
        this._store.setState({items: results, pagination});
      });
  }

  public onFilterChange(filter: LocationFilter): void {
    this._resetPage();
    this._store.setState({filter});
    this._getLocations();
  }

  private _resetPage(): void {
    this._store.setState({page: 1});
  }

  public onPageChange(page: number): void {
    this._store.setState({page});
    this._getLocations();
  }
}
