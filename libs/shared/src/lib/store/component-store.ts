import {Inject, Injectable, Optional} from '@angular/core';

import {Store} from './store';

@Injectable()
export class ComponentStore<StateType = object> extends Store<StateType> {
  constructor(@Optional() @Inject('STORE_STATE') initialState: StateType) {
    super(initialState);
  }
}
