import { createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Person } from '../models/person.model';
import { Expense } from '../models/expense.model';
import { Summary } from '../models/summary.model';
import { Total } from '../models/total.model';
import { BaseStates } from './ducks/base/base.types';
import rootReducer from './ducks/rootReducer';

export interface ApplicationState {
    person: BaseStates<Person>;
    expense: BaseStates<Expense>;
    total: BaseStates<Total>;
    summary: BaseStates<Summary>;
}

const store: Store<ApplicationState> = createStore(
  rootReducer,
  composeWithDevTools(),
);

export * as Actions from './ducks/base/base.actions';
export default store;
