import {UpperCasePipe} from '@angular/common';
import {Component, Input} from '@angular/core';
import {TranslocoModule} from '@ngneat/transloco';

import {AvatarComponent, CardComponent, FavoriteButtonComponent, StopPropagationDirective} from '@libs/shared';

import {StatusColorDirective} from '../../directives';
import {CharacterGender, CharacterStatus} from '../../models';

@Component({
  standalone: true,
  selector: 'lib-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  imports: [
    CardComponent,
    AvatarComponent,
    StatusColorDirective,
    UpperCasePipe,
    TranslocoModule,
    FavoriteButtonComponent,
    StopPropagationDirective,
  ],
})
export class CharacterCardComponent {
  @Input() id: number;

  @Input() image: string;

  @Input() name: string;

  @Input() status: CharacterStatus;

  @Input() species: string;

  @Input() gender: CharacterGender;
}
