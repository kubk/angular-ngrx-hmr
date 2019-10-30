import { ApplicationRef, Injectable } from '@angular/core';
import {
  createInputTransfer,
  createNewHosts,
  removeNgStyles
} from '@angularclass/hmr';
import { ActionReducer, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: any) => {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

@Injectable()
export class HmrModule {
  constructor(public appRef: ApplicationRef, public store: Store<any>) {}

  hmrOnInit(store: any) {
    if (!store || !store.state) {
      return;
    }
    if (store.state) {
      this.store.dispatch({ type: 'SET_ROOT_STATE', payload: store.state });
    }

    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: any) {
    const cmpLocation = this.appRef.components.map(
      cmp => cmp.location.nativeElement
    );
    this.store.pipe(take(1)).subscribe((s: any) => (store.state = s));
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles();
  }

  hmrAfterDestroy(store: any) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
