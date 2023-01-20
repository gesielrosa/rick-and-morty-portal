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

import {Character, CharacterFilter} from '../models';

@Injectable({
  providedIn: 'root',
})
export class CharactersRepository {
  constructor(@Inject('CONFIG') private _config: object, private _http: HttpClient) {}

  public list(params: CharacterFilter & PaginationParams): Observable<ListResponse<Character>> {
    const httpParams = new HttpParams({fromObject: removeEmptyProps(params)});
    return this._http
      .get(`${this._config['apiUrl']}/character`, {params: httpParams})
      .pipe(emptyListErrorOperator(), paginationMapperOperator<Character>());
  }

  public get(args: number | number[]): Observable<Character | Character[]> {
    const param = Array.isArray(args) ? args.join(',') : args;
    return this._http.get<Character | Character[]>(`${this._config['apiUrl']}/character/${param}`);
  }
}
