import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadComponent: () => import('./list').then(({ListComponent}) => ListComponent),
      },
    ]),
  ],
})
export class RoutingModule {}
