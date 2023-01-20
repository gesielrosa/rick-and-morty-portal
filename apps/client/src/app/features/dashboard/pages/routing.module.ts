import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadComponent: () => import('./dashboard').then(({DashboardComponent}) => DashboardComponent),
      },
    ]),
  ],
})
export class RoutingModule {}
