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

import {Episode, EpisodeFilter} from '../models';

@Injectable({
  providedIn: 'root',
})
export class EpisodesRepository {
  constructor(@Inject('CONFIG') private _config: object, private _http: HttpClient) {}

  public list(params: EpisodeFilter & PaginationParams): Observable<ListResponse<Episode>> {
    const httpParams = new HttpParams({fromObject: removeEmptyProps(params)});
    return this._http
      .get(`${this._config['apiUrl']}/episode`, {params: httpParams})
      .pipe(emptyListErrorOperator(), paginationMapperOperator<Episode>());
  }

  public get(args: number | number[]): Observable<Episode | Episode[]> {
    const param = Array.isArray(args) ? args.join(',') : args;
    return this._http.get<Episode | Episode[]>(`${this._config['apiUrl']}/episode/${param}`);
  }
}
