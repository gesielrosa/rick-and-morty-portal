import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, map, Observable, throwError} from 'rxjs';

import {Episode} from '../models';
import {EpisodesService} from '../services';

@Injectable({
  providedIn: 'root',
})
export class EpisodeResolver implements Resolve<Episode> {
  constructor(private _service: EpisodesService, private _router: Router) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Episode> {
    const {id} = route.params;

    return this._service.get(id).pipe(
      map((data) => data),
      catchError((err) => {
        this._router.navigate(['/not-found']);
        throw throwError(() => err);
      })
    );
  }
}
