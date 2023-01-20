import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'extractId',
  pure: true,
})
export class ExtractIdPipe implements PipeTransform {
  public transform(url: string): number {
    return +url.split('/').pop();
  }
}
