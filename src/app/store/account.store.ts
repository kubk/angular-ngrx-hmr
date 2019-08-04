import {
  createAction,
  createReducer,
  createSelector,
  on,
  props
} from '@ngrx/store';
import { AppState } from './app-state';
import { Transaction } from './models';

export interface AccountState {
  history: Transaction[];
}

export const initialState: AccountState = {
  history: []
};

export const withdraw = createAction(
  '[Account] withdraw',
  props<{ amount: number }>()
);
export const deposit = createAction(
  '[Account] deposit',
  props<{ amount: number }>()
);

export const accountReducer = createReducer(
  initialState,
  on(withdraw, deposit, (state, { amount, type }) => {
    const transaction: Transaction = {
      type: type === withdraw.type ? 'withdraw' : 'deposit',
      value: amount
    };
    return {
      history: state.history.concat(transaction)
    };
  })
);

export const selectBalance = createSelector(
  (state: AppState) => state.account,
  account => {
    return account.history.reduce((balance, transaction) => {
      return transaction.type === 'deposit'
        ? balance + transaction.value
        : balance - transaction.value;
    }, 0);
  }
);
