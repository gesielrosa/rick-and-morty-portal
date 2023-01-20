import {NgModule} from '@angular/core';

import {
  NbDialogModule,
  NbGlobalPhysicalPosition,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';

@NgModule({
  imports: [
    NbThemeModule.forRoot({name: 'default'}),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot({
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    }),
    NbEvaIconsModule,
  ],
})
export class NebularRootModule {}
