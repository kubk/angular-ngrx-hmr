import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import { FormsModule } from '@angular/forms';
import { ActionReducer, Store, StoreModule } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/app-state';

const stateSetter = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state: any, action: any) => {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers: [stateSetter] }),
    StoreDevtoolsModule.instrument(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
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
