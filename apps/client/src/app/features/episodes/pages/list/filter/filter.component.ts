import {NgIf} from '@angular/common';
import {Component, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslocoModule} from '@ngneat/transloco';
import {NbFormFieldModule, NbInputModule} from '@nebular/theme';
import {debounceTime, distinctUntilChanged, skip} from 'rxjs';

import {EpisodeFilter} from '@libs/episodes';

@Component({
  standalone: true,
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  imports: [NgIf, ReactiveFormsModule, NbFormFieldModule, TranslocoModule, NbInputModule],
})
export class FilterComponent {
  public form: FormGroup<{
    name: FormControl<string>;
    episode: FormControl<string>;
  }> = this._formBuilder.group({
    name: [null],
    episode: [null],
  });

  @Input() set filter(filter: EpisodeFilter) {
    this.form.patchValue(filter);
  }

  public get filter(): EpisodeFilter {
    return this.form.value;
  }

  @Output() filterChange = this.form.valueChanges.pipe(
    skip(1),
    debounceTime(500),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
  );

  constructor(private _formBuilder: FormBuilder) {}
}
