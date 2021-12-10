/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { Payment } from '../../../models/payment.model';
import { updateTotalRequest } from '../total/total.actions';
import { PaymentTypes } from './payments.types';

export type PaymentsPayload = {state: Payment[], data: Payment};

export const createPaymentRequest = (payload: PaymentsPayload) => (
  dispatch: any, getState: any,
) => {
  dispatch(action(PaymentTypes.PAYMENT_CREATE_REQUEST, payload));
  updateTotalRequest()(dispatch, getState);
};

export const editPaymentRequest = (payload: PaymentsPayload) => (
  dispatch: any, getState: any,
) => {
  dispatch(action(PaymentTypes.PAYMENT_EDIT_REQUEST, payload));
  updateTotalRequest()(dispatch, getState);
};
export const removePaymentRequest = (payload: PaymentsPayload) => (
  dispatch: any, getState: any,
) => {
  dispatch(action(PaymentTypes.PAYMENT_REMOVE_REQUEST, payload));
  updateTotalRequest()(dispatch, getState);
};
