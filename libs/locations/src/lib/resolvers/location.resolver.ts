import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, map, Observable, throwError} from 'rxjs';

import {Location} from '../models';
import {LocationsService} from '../services';

@Injectable({
  providedIn: 'root',
})
export class LocationResolver implements Resolve<Location> {
  constructor(private _service: LocationsService, private _router: Router) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Location> {
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
