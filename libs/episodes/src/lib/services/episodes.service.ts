import {Injectable} from '@angular/core';
import {map, Observable, switchMap} from 'rxjs';

import {ListResponse, PaginationParams} from '@libs/shared';

import {EpisodesRepository} from '../repositories';
import {Episode, EpisodeFilter} from '../models';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  constructor(private _repository: EpisodesRepository) {}

  public list(params: EpisodeFilter & PaginationParams): Observable<ListResponse<Episode>> {
    return this._repository.list(params);
  }

  public get(id: number): Observable<Episode>;
  public get(ids: number[]): Observable<Episode[]>;
  public get(args: number | number[]): Observable<Episode | Episode[]> {
    return this._repository.get(args);
  }

  public getAll(): Observable<Episode[]> {
    return this._repository.list({page: 1}).pipe(
      switchMap(({pagination: {total}}) => {
        const ids = Array.from({length: total}, (_, i) => i + 1);
        return this._repository.get(ids).pipe(map((resp) => (Array.isArray(resp) ? resp : [resp])));
      })
    );
  }
}
