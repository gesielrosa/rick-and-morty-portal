import {Component, OnInit} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';
import {map} from 'rxjs';

import {LanguageService} from '@libs/shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public menuItems$ = this._translateService
    .selectTranslate(['DASHBOARD', 'CHARACTERS', 'EPISODES', 'LOCATIONS', 'FAVORITES'])
    .pipe(
      map((texts) => {
        return [
          {
            title: texts[0],
            link: '/',
            icon: 'home-outline',
          },
          {
            title: texts[1],
            link: '/characters',
            icon: 'people-outline',
          },
          {
            title: texts[2],
            link: '/episodes',
            icon: 'film-outline',
          },
          {
            title: texts[3],
            link: '/locations',
            icon: 'pin-outline',
          },
          {
            title: texts[4],
            link: '/favorites',
            icon: 'heart-outline',
          },
        ];
      })
    );

  constructor(private _translateService: TranslocoService, private _languageService: LanguageService) {}

  public ngOnInit(): void {
    this._languageService.init();
  }
}
