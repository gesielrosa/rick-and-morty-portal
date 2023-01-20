import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {TranslocoRootModule} from './transloco-root.module';
import {NebularRootModule} from './nebular-root.module';

@NgModule({
  imports: [BrowserModule, HttpClientModule, TranslocoRootModule, BrowserAnimationsModule, NebularRootModule],
})
export class CoreModule {}
