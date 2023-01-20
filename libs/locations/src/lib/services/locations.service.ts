import {Injectable} from '@angular/core';
import {map, Observable, switchMap} from 'rxjs';

import {ListResponse, PaginationParams} from '@libs/shared';

import {LocationsRepository} from '../repositories';
import {Location, LocationFilter} from '../models';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  constructor(private _repository: LocationsRepository) {}

  public list(params: LocationFilter & PaginationParams): Observable<ListResponse<Location>> {
    return this._repository.list(params);
  }

  public get(id: number): Observable<Location>;
  public get(ids: number[]): Observable<Location[]>;
  public get(args: number | number[]): Observable<Location | Location[]> {
    return this._repository.get(args);
  }

  public getAll(): Observable<Location[]> {
    return this._repository.list({page: 1}).pipe(
      switchMap(({pagination: {total}}) => {
        const ids = Array.from({length: total}, (_, i) => i + 1);
        return this._repository.get(ids).pipe(map((resp) => (Array.isArray(resp) ? resp : [resp])));
      })
    );
  }
}
