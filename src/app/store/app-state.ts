import { accountReducer, AccountState } from './account.store';
import { InjectionToken } from '@angular/core';

export interface AppState {
  account: AccountState;
}

export const reducers = {
  account: accountReducer
};

export const ROOT_REDUCER = new InjectionToken('Root Reducer', {
  factory: () => reducers
});
