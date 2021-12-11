/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { Expense } from '../../../models/expense.model';
import { Payment } from '../../../models/payment.model';
import { Person } from '../../../models/person.model';
import { ExpenseTypes } from '../expenses/expenses.types';
import { PaymentTypes } from '../payments/payments.types';
import { updateSummariesRequest, updateSummaryRequest } from '../summary/summary.actions';
import { updateTotalRequest } from '../total/total.actions';
import { PersonTypes } from './people.types';

export type PeoplePayload = {state: Person[], data: Person}

export const createPersonRequest = (payload: PeoplePayload) => (dispatch: any, getState: any) => {
  dispatch(action(PersonTypes.PERSON_CREATE_REQUEST, payload));
  updateSummariesRequest()(dispatch, getState);
  updateTotalRequest()(dispatch, getState);
};

export const editPersonRequest = (payload: PeoplePayload) => (dispatch: any, getState: any) => {
  dispatch(action(PersonTypes.PERSON_EDIT_REQUEST, payload));

  const { expenses, payments } = getState();
  const person = payload.data;
  const personExpenses = expenses.data.filter((e: Expense) => e.person.id === person.id);
  const paymentList = payments.data.filter(
    (p: Payment) => p.personPaying.id === person.id || p.personReceiving.id === person.id,
  );
  personExpenses.forEach((expense: Expense) => {
    dispatch(
      action(ExpenseTypes.EXPENSE_EDIT_REQUEST, {
        state: expenses.data,
        data: {
          ...expense, person,
        },
      }),
    );
  });
  paymentList.forEach((payment: Payment) => {
    dispatch(
      action(PaymentTypes.PAYMENT_EDIT_REQUEST, {
        state: payments.data,
        data: person.id === payment.personPaying.id
          ? { ...payment, personPaying: person }
          : { ...payment, personReceiving: person },
      }),
    );
  });
  person.dates.forEach((date: Date) => {
    updateSummaryRequest(date)(dispatch, getState);
  });

  updateTotalRequest()(dispatch, getState);
};

export const removePersonRequest = (payload: any) => (dispatch: any, getState: any) => {
  dispatch(action(PersonTypes.PERSON_REMOVE_REQUEST, payload));

  const { expenses, payments } = getState();
  const person = payload.data;
  const expense = expenses.data.find((e: Expense) => e.person.id === person.id);
  const paymentList = payments.data.filter(
    (p: Payment) => p.personPaying.id === person.id || p.personReceiving.id === person.id,
  );
  if (expense) {
    dispatch(
      action(ExpenseTypes.EXPENSE_REMOVE_REQUEST, {
        state: expenses.data,
        data: expense,
      }),
    );
  }
  if (paymentList.length > 0) {
    paymentList.forEach((payment: Payment) => {
      dispatch(
        action(PaymentTypes.PAYMENT_REMOVE_REQUEST, {
          state: payments.data,
          data: payment,
        }),
      );
    });
  }
  person.dates.forEach((date: Date) => {
    updateSummaryRequest(date)(dispatch, getState);
  });
  updateTotalRequest()(dispatch, getState);
};

export const addDatePersonRequest = (payload: PeoplePayload) => (dispatch: any, getState: any) => {
  dispatch(action(PersonTypes.PERSON_EDIT_REQUEST, payload));

  const person = payload.data;
  person.dates.forEach((date: Date) => {
    updateSummaryRequest(date)(dispatch, getState);
  });
  updateTotalRequest()(dispatch, getState);
};

export const removeDatePersonRequest = (payload: PeoplePayload) => (
  dispatch: any, getState: any,
) => {
  dispatch(action(PersonTypes.PERSON_EDIT_REQUEST, payload));

  const { expenses } = getState();
  const person = payload.data;
  const oldPerson = { ...payload.state.find((p) => p.id === person.id) };
  const personExpenses = expenses.data.filter((e: Expense) => e.person.id === person.id);
  personExpenses.forEach((expense: Expense) => {
    if (!person.dates.find((d: Date) => d.getDate() === expense.date.getDate())) {
      dispatch(
        action(ExpenseTypes.EXPENSE_REMOVE_REQUEST, {
          state: expenses.data,
          data: expense,
        }),
      );
    }
  });
  if (oldPerson && oldPerson.dates) {
    oldPerson.dates.forEach((date: Date) => {
      updateSummaryRequest(date)(dispatch, getState);
    });
  }
  updateTotalRequest()(dispatch, getState);
};
