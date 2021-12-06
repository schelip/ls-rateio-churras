/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { PersonTypes } from '../people/people.types';
import { ExpenseTypes } from '../expenses/expenses.types';
import { BaseTypes } from './base.types';
import { editPersonRequestThunk, removePersonRequestThunk, updateSummaryAndTotalRequestThunk } from './base.thunks';
import { PaymentTypes } from '../payments/payments.types';

// base
export const loadRequest = () => action(BaseTypes.LOAD_REQUEST);
export const createRequest = (data: any) => action(BaseTypes.CREATE_REQUEST, data);

// person
export const createPersonRequest = (data: any) => updateSummaryAndTotalRequestThunk(
  action(PersonTypes.PERSON_CREATE_REQUEST, data),
);
export const editPersonRequest = (data: any) => editPersonRequestThunk(data);
export const removePersonRequest = (data: any) => removePersonRequestThunk(data);

// expense
export const createExpenseRequest = (data: any) => updateSummaryAndTotalRequestThunk(
  action(ExpenseTypes.EXPENSE_CREATE_REQUEST, data),
);
export const editExpenseRequest = (data: any) => updateSummaryAndTotalRequestThunk(
  action(ExpenseTypes.EXPENSE_EDIT_REQUEST, data),
);
export const removeExpenseRequest = (data: any) => updateSummaryAndTotalRequestThunk(
  action(ExpenseTypes.EXPENSE_REMOVE_REQUEST, data),
);

// payments
export const createPaymentRequest = (data: any) => updateSummaryAndTotalRequestThunk(
  action(PaymentTypes.PAYMENT_CREATE_REQUEST, data),
);

export const editPaymentRequest = (data: any) => updateSummaryAndTotalRequestThunk(
  action(PaymentTypes.PAYMENT_EDIT_REQUEST, data),
);

export const removePaymentRequest = (data: any) => updateSummaryAndTotalRequestThunk(
  action(PaymentTypes.PAYMENT_REMOVE_REQUEST, data),
);
