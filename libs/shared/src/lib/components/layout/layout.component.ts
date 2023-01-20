import {AsyncPipe, NgIf} from '@angular/common';
import {Component, Input} from '@angular/core';
import {
  NbIconModule,
  NbLayoutModule,
  NbMenuItem,
  NbMenuModule,
  NbSidebarModule,
  NbSidebarService,
} from '@nebular/theme';

import {ComponentStore} from '../../store';
import {LangSwitchComponent} from '../lang-switch';

@Component({
  standalone: true,
  selector: 'lib-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [NbLayoutModule, NbMenuModule, NbSidebarModule, AsyncPipe, NgIf, NbIconModule, LangSwitchComponent],
  providers: [ComponentStore, {provide: 'STORE_STATE', useValue: {menuItems: []}}],
})
export class LayoutComponent {
  @Input() set menuItems(menuItems: NbMenuItem[]) {
    this._store.setState({menuItems: menuItems || []});
  }

  public menuItems$ = this._store.select('menuItems');

  constructor(private _store: ComponentStore<{menuItems: NbMenuItem[]}>, private _sidebarService: NbSidebarService) {}

  public toggleSidebar(): void {
    this._sidebarService.toggle(true, 'menu-sidebar');
  }
}
