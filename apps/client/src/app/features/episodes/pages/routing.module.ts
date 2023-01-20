import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {EpisodeResolver} from '@libs/episodes';

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
          episode: EpisodeResolver,
        },
      },
    ]),
  ],
})
export class RoutingModule {}
