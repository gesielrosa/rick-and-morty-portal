import {finalize, Observable} from 'rxjs';

import {BaseComponent} from '../common';

export function stateOperator(base: BaseComponent): <T>(source: Observable<T>) => Observable<T> {
  base.setState('loading');
  return function <T>(source: Observable<T>): Observable<T> {
    return source.pipe(finalize(() => base.setState('none')));
  };
}
