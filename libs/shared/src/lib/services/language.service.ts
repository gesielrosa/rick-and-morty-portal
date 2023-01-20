import {Inject, Injectable} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';

import {LocalStorageSubject} from '../utils';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _languageSubject$ = new LocalStorageSubject<string>('language');

  public activeLanguage$ = this._languageSubject$.asObservable();

  public availableLanguages(): string[] {
    return this._translocoService.getAvailableLangs() as string[];
  }

  constructor(@Inject('CONFIG') private _config: object, private _translocoService: TranslocoService) {
    this._languageChangesSubscription();
  }

  private _languageChangesSubscription(): void {
    this._languageSubject$.subscribe((language) => {
      this._translocoService.setActiveLang(language);
    });
  }

  public init(): void {
    this._languageSubject$.next(this._languageSubject$.getValue() || this._config['defaultLang']);
  }

  public setLanguage(lang: string): void {
    this._languageSubject$.next(lang);
  }
}
