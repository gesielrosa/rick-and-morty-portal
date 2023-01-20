import {AsyncPipe, NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {Component} from '@angular/core';

import {LanguageService} from '../../services';

@Component({
  standalone: true,
  selector: 'lib-lang-switch',
  templateUrl: './lang-switch.component.html',
  styleUrls: ['./lang-switch.component.scss'],
  imports: [NgIf, NgForOf, UpperCasePipe, AsyncPipe],
})
export class LangSwitchComponent {
  public activeLanguage$ = this._languageService.activeLanguage$;

  public get languages(): string[] {
    return this._languageService.availableLanguages();
  }

  constructor(private _languageService: LanguageService) {}

  public setLanguage(lang: string): void {
    this._languageService.setLanguage(lang);
  }
}
