/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { Expense } from '../../../models/expense.model';
import { updateSummaryRequest } from '../summary/summary.actions';
import { updateTotalRequest } from '../total/total.actions';
import { ExpenseTypes } from './expenses.types';

export type ExpensesPayload = {state: Expense[], data: Expense};

export const createExpenseRequest = (payload: ExpensesPayload) => (
  dispatch: any, getState: any,
) => {
  dispatch(action(ExpenseTypes.EXPENSE_CREATE_REQUEST, payload));
  updateSummaryRequest(payload.data.date)(dispatch, getState);
  updateTotalRequest()(dispatch, getState);
};
export const editExpenseRequest = (payload: ExpensesPayload) => (
  dispatch: any, getState: any,
) => {
  dispatch(action(ExpenseTypes.EXPENSE_EDIT_REQUEST, payload));
  const date = payload.state.find((e) => e.id === payload.data.id)?.date;
  if (date) updateSummaryRequest(date)(dispatch, getState);
  updateSummaryRequest(payload.data.date)(dispatch, getState);
  updateTotalRequest()(dispatch, getState);
};

export const removeExpenseRequest = (payload: ExpensesPayload) => (
  dispatch: any, getState: any,
) => {
  dispatch(action(ExpenseTypes.EXPENSE_REMOVE_REQUEST, payload));
  updateSummaryRequest(payload.data.date)(dispatch, getState);
  updateTotalRequest()(dispatch, getState);
};
