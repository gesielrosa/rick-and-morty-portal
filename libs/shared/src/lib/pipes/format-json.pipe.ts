import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'formatJson',
  pure: true,
})
export class FormatJsonPipe implements PipeTransform {
  public transform(value: {[key: string]: any}): string {
    return JSON.stringify(value, null, 4);
  }
}
