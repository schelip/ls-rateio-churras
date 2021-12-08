/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { Expense } from '../../../models/expense.model';
import { Payment } from '../../../models/payment.model';
import { ExpenseTypes } from '../expenses/expenses.types';
import { PaymentTypes } from '../payments/payments.types';
import { PersonTypes } from '../people/people.types';
import { SummaryTypes } from '../summary/summary.types';
import { TotalTypes } from '../total/total.types';

export const updateSummaryAndTotalRequestThunk = (act: any) => (dispatch: any, getState: any) => {
  dispatch(act);
  const { people, expenses, payments } = getState();
  dispatch(action(SummaryTypes.SUMMARY_UPDATE_REQUEST, { people, expenses }));
  dispatch(action(TotalTypes.TOTAL_UPDATE_REQUEST, { people, expenses, payments }));
};

export const editPersonRequestThunk = (payload: any) => (dispatch: any, getState: any) => {
  dispatch(action(PersonTypes.PERSON_EDIT_REQUEST, payload));
  const { expenses, payments } = getState();
  const person = payload.data;
  const personExpenses = expenses.data.filter((e: Expense) => e.person.id === person.id);
  const paymentList = payments.data.filter(
    (p: Payment) => p.personPaying.id === person.id || p.personReceiving.id === person.id,
  );

  personExpenses.forEach((expense: Expense) => {
    // remove expenses from removed days
    if (!person.dates.find((d: Date) => d.getDate() === expense.date.getDate())) {
      dispatch(
        action(ExpenseTypes.EXPENSE_REMOVE_REQUEST, {
          state: expenses.data,
          data: expense,
        }),
      );
    } else {
      dispatch(
        action(ExpenseTypes.EXPENSE_EDIT_REQUEST, {
          state: expenses.data,
          data: {
            ...expense, person,
          },
        }),
      );
    }
  });

  if (paymentList.length > 0) {
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
  }

  const { people, expenses: updatedExpenses, payments: updatedPayments } = getState();
  dispatch(action(SummaryTypes.SUMMARY_UPDATE_REQUEST, { people, expenses: updatedExpenses }));
  dispatch(action(TotalTypes.TOTAL_UPDATE_REQUEST, {
    people,
    expenses: updatedExpenses,
    payments: updatedPayments,
  }));
};

export const removePersonRequestThunk = (payload: any) => (dispatch: any, getState: any) => {
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
      action(PaymentTypes.PAYMENT_REMOVE_REQUEST, {
        state: payments.data,
        data: payment,
      });
    });
  }

  const { people, expenses: updatedExpenses, payments: updatedPayments } = getState();
  dispatch(action(SummaryTypes.SUMMARY_UPDATE_REQUEST, { people, expenses: updatedExpenses }));
  dispatch(action(TotalTypes.TOTAL_UPDATE_REQUEST, {
    people,
    expenses: updatedExpenses,
    payments: updatedPayments,
  }));
};
