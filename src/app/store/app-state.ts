import { accountReducer, AccountState } from './account.store';

export interface AppState {
  account: AccountState;
}

export const reducers = {
  account: accountReducer
};
