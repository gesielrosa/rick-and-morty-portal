import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {ListResponse} from '../models';

export function paginationMapperOperator<DataType>(): <T>(source: Observable<T>) => Observable<ListResponse<DataType>> {
  return function <T>(source: Observable<T>): Observable<ListResponse<DataType>> {
    return source.pipe(
      map((response: any) => {
        const nextPage: number = response.info.next ? +getQueryParam(response.info.next, 'page') : null;
        const prevPage: number = response.info.prev ? +getQueryParam(response.info.next, 'page') : null;

        return {
          ...response,
          pagination: {
            total: response.info.count,
            pages: response.info.pages,
            page: nextPage ? nextPage - 1 : prevPage ? prevPage + 1 : 1,
            size: response.results.length,
          },
        };
      })
    );
  };
}

function getQueryParam(url: string, param: string): string {
  const queryString = url.split('?')[1];
  const nextUrlParams = new URLSearchParams(queryString);
  return nextUrlParams.has(param) && nextUrlParams.get(param);
}
