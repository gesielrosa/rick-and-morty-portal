import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {LocationResolver} from '@libs/locations';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadComponent: () => import('./list').then(({ListComponent}) => ListComponent),
      },
      {
        path: ':id',
        loadComponent: () => import('./details').then(({DetailsComponent}) => DetailsComponent),
        resolve: {
          location: LocationResolver,
        },
      },
    ]),
  ],
})
export class RoutingModule {}
