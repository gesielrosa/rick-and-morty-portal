import {Injectable} from '@angular/core';
import {map, Observable, switchMap} from 'rxjs';

import {ListResponse, PaginationParams} from '@libs/shared';

import {Character, CharacterFilter} from '../models';
import {CharactersRepository} from '../repositories';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private _repository: CharactersRepository) {}

  public list(params: CharacterFilter & PaginationParams): Observable<ListResponse<Character>> {
    return this._repository.list(params);
  }

  public get(id: number): Observable<Character>;
  public get(ids: number[]): Observable<Character[]>;
  public get(args: number | number[]): Observable<Character | Character[]> {
    return this._repository.get(args);
  }

  public getAll(): Observable<Character[]> {
    return this._repository.list({page: 1}).pipe(
      switchMap(({pagination: {total}}) => {
        const ids = Array.from({length: total}, (_, i) => i + 1);
        return this._repository.get(ids).pipe(map((resp) => (Array.isArray(resp) ? resp : [resp])));
      })
    );
  }
}
