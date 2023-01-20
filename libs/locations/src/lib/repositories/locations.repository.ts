import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {
  emptyListErrorOperator,
  ListResponse,
  paginationMapperOperator,
  PaginationParams,
  removeEmptyProps,
} from '@libs/shared';

import {Location, LocationFilter} from '../models';

@Injectable({
  providedIn: 'root',
})
export class LocationsRepository {
  constructor(@Inject('CONFIG') private _config: object, private _http: HttpClient) {}

  public list(params: LocationFilter & PaginationParams): Observable<ListResponse<Location>> {
    const httpParams = new HttpParams({fromObject: removeEmptyProps(params)});
    return this._http
      .get(`${this._config['apiUrl']}/location`, {params: httpParams})
      .pipe(emptyListErrorOperator(), paginationMapperOperator<Location>());
  }

  public get(args: number | number[]): Observable<Location | Location[]> {
    const param = Array.isArray(args) ? args.join(',') : args;
    return this._http.get<Location | Location[]>(`${this._config['apiUrl']}/location/${param}`);
  }
}
