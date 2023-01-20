import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'trackByKey',
  pure: true,
  standalone: true,
})
export class TrackByKeyPipe implements PipeTransform {
  public transform(key: string) {
    return (index, value) => {
      return value[key];
    };
  }
}
