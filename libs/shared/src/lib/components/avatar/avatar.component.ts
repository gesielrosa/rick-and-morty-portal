import {Component, HostBinding, Input} from '@angular/core';

@Component({
  standalone: true,
  selector: 'lib-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input()
  set image(value: string) {
    this._image = value ? `url(${value})` : '';
  }

  @HostBinding('style.--avatar-image-url')
  private _image: string;
}
