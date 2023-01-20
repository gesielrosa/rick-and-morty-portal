import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () => import('./features/dashboard').then(({RoutingModule}) => RoutingModule),
        },
        {
          path: 'characters',
          loadChildren: () => import('./features/characters').then(({RoutingModule}) => RoutingModule),
        },
        {
          path: 'episodes',
          loadChildren: () => import('./features/episodes').then(({RoutingModule}) => RoutingModule),
        },
        {
          path: 'locations',
          loadChildren: () => import('./features/locations').then(({RoutingModule}) => RoutingModule),
        },
        {
          path: 'favorites',
          loadChildren: () => import('./features/favorites').then(({RoutingModule}) => RoutingModule),
        },
        {
          path: 'not-found',
          loadComponent: () => import('./features/errors').then(({NotFoundComponent}) => NotFoundComponent),
        },
        {
          path: '**',
          redirectTo: 'not-found',
        },
      ],
      {scrollPositionRestoration: 'top'}
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
