import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BehaviorSubject, map, noop, Observable, Subject, takeUntil} from 'rxjs';

import {stateOperator} from '../utils';
import {LoaderService} from '../services';

@Injectable()
export class BaseComponent implements OnDestroy {
  private _state$ = new BehaviorSubject<'loading' | 'initializing' | 'none'>('none');

  private _destroy$ = new Subject<void>();

  public state$ = this._state$.asObservable();

  public onDestroy$ = this._destroy$.asObservable();

  public routeParams$ = this._activatedRoute.params;

  public routeData$ = this._activatedRoute.data;

  constructor(
    private readonly _loaderService: LoaderService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {
    this.state$
      .pipe(
        takeUntil(this.onDestroy$),
        map((state) => state === 'loading')
      )
      .subscribe((isLoading) => {
        isLoading ? this._loaderService.show() : this._loaderService.hide();
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._state$.complete();
  }

  public navigate(path: any[], params?: {queryParams?: Params; relativeToRoot?: boolean}): void {
    const relativeTo = params?.relativeToRoot ? null : this._activatedRoute;
    this._router.navigate(path, {queryParams: params?.queryParams, relativeTo}).then(noop);
  }

  public isState(state: 'loading' | 'initializing' | 'none'): boolean {
    return this._state$.getValue() === state;
  }

  public isState$(state: 'loading' | 'initializing' | 'none'): Observable<boolean> {
    return this._state$.asObservable().pipe(map((_state) => _state === state));
  }

  public setState(state: 'loading' | 'initializing' | 'none'): void {
    this._state$.next(state);
  }

  public stateOperator(): <T>(source: Observable<T>) => Observable<T> {
    return stateOperator(this);
  }
}
