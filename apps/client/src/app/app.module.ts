import {AsyncPipe, NgIf} from '@angular/common';
import {NgModule} from '@angular/core';

import {LayoutComponent} from '@libs/shared';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {APP_CONFIG} from './app-config';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule, LayoutComponent, NgIf, AsyncPipe],
  providers: [
    {
      provide: 'CONFIG',
      useValue: APP_CONFIG,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
