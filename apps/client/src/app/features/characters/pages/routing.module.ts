import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CharacterResolver} from '@libs/characters';

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
          character: CharacterResolver,
        },
      },
    ]),
  ],
})
export class RoutingModule {}
