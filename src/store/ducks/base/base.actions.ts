/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { PersonTypes } from '../people/people.types';
import { ExpenseTypes } from '../expense/expense.types';
import { BaseTypes } from './base.types';
import { updateSummaryRequestThunk } from '../../thunks/summary.thunk';

// base
export const loadRequest = () => action(BaseTypes.LOAD_REQUEST);
export const createRequest = (data: any) => action(BaseTypes.CREATE_REQUEST, data);

// person
export const createPersonRequest = (data: any) => updateSummaryRequestThunk(
  action(PersonTypes.PERSON_CREATE_REQUEST, data),
);
export const editPersonRequest = (data: any) => updateSummaryRequestThunk(
  action(PersonTypes.PERSON_EDIT_REQUEST, data),
);
export const removePersonRequest = (data: any) => updateSummaryRequestThunk(
  action(PersonTypes.PERSON_REMOVE_REQUEST, data),
);

// expense
export const createExpenseRequest = (data: any) => updateSummaryRequestThunk(
  action(ExpenseTypes.EXPENSE_CREATE_REQUEST, data),
);

export const editExpenseRequest = (data: any) => updateSummaryRequestThunk(
  action(ExpenseTypes.EXPENSE_EDIT_REQUEST, data),
);
export const removeExpenseRequest = (data: any) => updateSummaryRequestThunk(
  action(ExpenseTypes.EXPENSE_REMOVE_REQUEST, data),
);
