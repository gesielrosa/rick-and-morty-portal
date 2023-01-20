import {catchError, Observable, of, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

export function emptyListErrorOperator(): <T>(source: Observable<T>) => Observable<T> {
  return function <T>(source: Observable<T>): Observable<T> {
    return source.pipe(
      catchError((response) => {
        if (response instanceof HttpErrorResponse && response?.status === 404) {
          return of({
            info: {
              count: 0,
              pages: 0,
              next: null,
              prev: null,
            },
            results: [],
          } as T);
        }

        return throwError(() => response);
      })
    );
  };
}
