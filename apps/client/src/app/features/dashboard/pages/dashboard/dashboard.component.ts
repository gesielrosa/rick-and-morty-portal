import {AsyncPipe, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Character, CharactersService} from '@libs/characters';
import {TranslocoModule} from '@ngneat/transloco';
import {NbCardModule} from '@nebular/theme';
import {map} from 'rxjs';

import {BaseComponent, ComponentStore} from '@libs/shared';

import {StatusPerLocationChartComponent, StatusPerSpeciesChartComponent} from '../../components';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  imports: [
    AsyncPipe,
    StatusPerSpeciesChartComponent,
    NgIf,
    TranslocoModule,
    NbCardModule,
    StatusPerLocationChartComponent,
  ],
  providers: [BaseComponent, ComponentStore, {provide: 'INITIAL_STATE', useValue: {charactersData: []}}],
})
export class DashboardComponent implements OnInit {
  public charactersData$ = this._store.select('charactersData');

  constructor(
    public base: BaseComponent,
    private _store: ComponentStore<{
      charactersData: {location: string; status: string; species: string; item: Character}[];
    }>,
    private _charactersService: CharactersService
  ) {}

  public ngOnInit(): void {
    this._fetchData();
  }

  private _fetchData(): void {
    this._charactersService
      .getAll()
      .pipe(
        this.base.stateOperator(),
        map((resp) => {
          return resp.map((character) => {
            return {
              location: character.location.name,
              status: character.status,
              species: character.species,
              item: character,
            };
          });
        })
      )
      .subscribe((data) => {
        this._store.setState({charactersData: data});
      });
  }
}
