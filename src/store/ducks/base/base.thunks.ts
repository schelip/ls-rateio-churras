/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { Expense } from '../../../models/expense.model';
import { ExpenseTypes } from '../expenses/expenses.types';
import { PersonTypes } from '../people/people.types';
import { SummaryTypes } from '../summary/summary.types';

// summary
export const updateSummaryRequestThunk = (request: any) => (dispatch: any, getState: any) => {
  dispatch(request);
  const { people, expenses } = getState();
  dispatch(action(SummaryTypes.SUMMARY_UPDATE_REQUEST, { people, expenses }));
};

// person
export const editPersonRequestThunk = (payload: any) => (dispatch: any, getState: any) => {
  dispatch(action(PersonTypes.PERSON_EDIT_REQUEST, payload));
  const { expenses } = getState();
  const expense = expenses.data.find((e: Expense) => e.person.id === payload.data.id);
  if (expense) {
    dispatch(
      action(ExpenseTypes.EXPENSE_EDIT_REQUEST, {
        state: expenses.data,
        data: {
          ...expense, person: payload.data,
        },
      }),
    );
  }
  const { people, expenses: newExpenses } = getState();
  dispatch(action(SummaryTypes.SUMMARY_UPDATE_REQUEST, { people, expenses: newExpenses }));
};

export const removePersonRequestThunk = (payload: any) => (dispatch: any, getState: any) => {
  dispatch(action(PersonTypes.PERSON_REMOVE_REQUEST, payload));
  const { expenses } = getState();
  const expense = expenses.data.find((e: Expense) => e.person.id === payload.data.id);
  if (expense) {
    dispatch(
      action(ExpenseTypes.EXPENSE_REMOVE_REQUEST, {
        state: expenses.data,
        data: expense,
      }),
    );
  }
  const { people, expenses: newExpenses } = getState();
  dispatch(action(SummaryTypes.SUMMARY_UPDATE_REQUEST, { people, expenses: newExpenses }));
};
