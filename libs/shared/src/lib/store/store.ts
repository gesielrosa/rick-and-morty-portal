import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

export class Store<StateType = object> {
  private readonly _stateSubject: BehaviorSubject<StateType>;

  constructor(initialState: StateType) {
    this._stateSubject = new BehaviorSubject(initialState);
  }

  public getState(): Observable<StateType> {
    return this._stateSubject.pipe(distinctUntilChanged());
  }

  public getStateSnapshot(): StateType {
    return this._stateSubject.getValue();
  }

  public select<K extends keyof StateType>(key: K): Observable<StateType[K]> {
    return this._stateSubject.pipe(
      map((state: StateType) => {
        return state[key];
      }),
      distinctUntilChanged()
    );
  }

  public setState(partialState: Partial<StateType>): void {
    const currentState = this.getStateSnapshot();
    const nextState = Object.assign({}, currentState, partialState);
    this._stateSubject.next(nextState);
  }
}
