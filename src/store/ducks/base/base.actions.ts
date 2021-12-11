/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { BaseTypes } from './base.types';

export * from '../expenses/expenses.actions';
export * from '../people/people.actions';
export * from '../payments/payments.actions';
export * from '../summary/summary.actions';
export * from '../total/total.actions';

// base
export const loadRequest = () => action(BaseTypes.LOAD_REQUEST);
export const createRequest = (payload: any) => action(BaseTypes.CREATE_REQUEST, payload);
