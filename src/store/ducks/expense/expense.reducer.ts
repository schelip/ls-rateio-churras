/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer } from 'redux';
import { Expense } from '../../../models/expense.model';
import { BaseStates } from '../base/base.types';
import { ExpenseTypes } from './expense.types';

const EXPENSE_INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

function expenseReduce(
  state: BaseStates<Expense> = EXPENSE_INITIAL_STATE,
  action: any,
): any {
  const data = [...state.data];
  switch (action.type) {
    case ExpenseTypes.EXPENSE_CREATE:
      if (action.payload.data) {
        data.push(action.payload.data);
      }

      return {
        ...state, data, loading: true, error: false,
      };
    default:
      return state;
  }
}

// eslint-disable-next-line max-len
const expenseReducer: Reducer<BaseStates<Expense>> = (state, action) => expenseReduce(state, action);

export { expenseReducer };
