/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { TotalTypes } from './total.types';

export const updateTotalRequest = () => (dispatch: any, getState: any) => {
  const { people, expenses, payments } = getState();
  dispatch(action(TotalTypes.TOTAL_UPDATE_REQUEST, {
    people: people.data, expenses: expenses.data, payments: payments.data,
  }));
};
