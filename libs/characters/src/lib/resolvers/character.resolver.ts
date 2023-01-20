import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, map, Observable, throwError} from 'rxjs';

import {Character} from '../models';
import {CharactersService} from '../services';

@Injectable({
  providedIn: 'root',
})
export class CharacterResolver implements Resolve<Character> {
  constructor(private _service: CharactersService, private _router: Router) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Character> {
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
