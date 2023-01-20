import {Component} from '@angular/core';
import {NbCardModule} from '@nebular/theme';

@Component({
  standalone: true,
  selector: 'lib-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [NbCardModule],
})
export class CardComponent {}
