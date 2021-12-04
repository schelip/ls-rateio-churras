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
): BaseStates<Expense> {
  const { data } = state;
  switch (action.type) {
    case ExpenseTypes.EXPENSE_CREATE_REQUEST:
      if (action.payload.data) {
        const existingExpense = data.find((e) => e.person === action.payload.data.person);
        if (existingExpense) {
          existingExpense.value += action.payload.data.value;
        } else data.push(action.payload.data);
      }

      return {
        ...state, data: [...data], loading: true, error: false,
      };

    case ExpenseTypes.EXPENSE_EDIT_REQUEST:
      if (action.payload.data) {
        if (action.payload.data) {
          const index = data.findIndex((e) => e.id === action.payload.data.id);
          if (index > -1) Object.assign(data[index], action.payload.data);
        }
      }

      return {
        ...state, data: [...data], loading: true, error: false,
      };

    case ExpenseTypes.EXPENSE_REMOVE_REQUEST:
      if (action.payload.data) {
        const index = data.indexOf(action.payload.data, 0);
        if (index > -1) {
          data.splice(index, 1);
        }
      }

      return {
        ...state, data: [...data], loading: true, error: false,
      };

    default:
      return state;
  }
}

// eslint-disable-next-line max-len
const expenseReducer: Reducer<BaseStates<Expense>> = (state, action) => expenseReduce(state, action);

export { expenseReducer };
