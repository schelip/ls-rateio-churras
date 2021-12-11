/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { Person } from '../../../models/person.model';
import { TotalTypes } from './total.types';

export const updateTotalStateRequest = () => (dispatch: any, getState: any) => {
  const {
    people, expenses, payments,
  } = getState();
  dispatch(action(TotalTypes.TOTAL_UPDATE_REQUEST, {
    people: people.data, expenses: expenses.data, payments: payments.data,
  }));
};

export const createTotalRequest = (person: Person) => (dispatch: any, getState: any) => {
  dispatch(action(TotalTypes.TOTAL_CREATE_REQUEST, { person }));
  updateTotalStateRequest()(dispatch, getState);
};

export const removeTotalRequest = (person: Person) => (dispatch: any, getState: any) => {
  dispatch(action(TotalTypes.TOTAL_REMOVE_REQUEST, { person }));
  updateTotalStateRequest()(dispatch, getState);
};
