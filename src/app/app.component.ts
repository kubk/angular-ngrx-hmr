import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {AccountState, deposit, selectBalance, withdraw} from './store/account.store';
import {AppState} from './store/app-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  withdrawInput = 1;
  depositInput = 3;

  account$ = this.store.pipe(select(state => state.account));
  balance$ = this.store.pipe(select(selectBalance));

  constructor(private store: Store<AppState>) {}

  deposit(amount: number) {
    this.store.dispatch(deposit({ amount }));
  }

  withdraw(amount: number) {
    this.store.dispatch(withdraw({ amount }));
  }
}
