import {NgIf} from '@angular/common';
import {Component, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslocoModule} from '@ngneat/transloco';
import {NbFormFieldModule, NbInputModule, NbSelectModule} from '@nebular/theme';
import {debounceTime, distinctUntilChanged, skip} from 'rxjs';

import {CharacterFilter, CharacterGender, CharacterStatus} from '@libs/characters';

@Component({
  standalone: true,
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  imports: [TranslocoModule, NgIf, ReactiveFormsModule, NbSelectModule, NbFormFieldModule, NbInputModule],
})
export class FilterComponent {
  public form: FormGroup<{
    name: FormControl<string>;
    status: FormControl<CharacterStatus>;
    species: FormControl<string>;
    type: FormControl<string>;
    gender: FormControl<CharacterGender>;
  }> = this._formBuilder.group({
    name: [null],
    status: [null],
    species: [null],
    type: [null],
    gender: [null],
  });

  @Input() set filter(filter: CharacterFilter) {
    this.form.patchValue(filter);
  }

  public get filter(): CharacterFilter {
    return this.form.value;
  }

  @Output() filterChange = this.form.valueChanges.pipe(
    skip(1),
    debounceTime(500),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
  );

  constructor(private _formBuilder: FormBuilder) {}
}
