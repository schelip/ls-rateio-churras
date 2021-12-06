/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer } from 'redux';
import { Payment } from '../../../models/payment.model';
import { BaseStates } from '../base/base.types';
import { PaymentTypes } from './payments.types';

const PAYMENT_INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

function paymentReduce(
  state: BaseStates<Payment> = PAYMENT_INITIAL_STATE,
  action: any,
): BaseStates<Payment> {
  const data = [...state.data];
  switch (action.type) {
    case PaymentTypes.PAYMENT_CREATE_REQUEST:
      if (action.payload.data) {
        const existingPayment = data.find((p) => p.personPaying === action.payload.data.personPaying
          && p.personReceiving === action.payload.data.personReceiving);
        if (existingPayment) {
          existingPayment.value = action.payload.data.value;
        } else data.push(action.payload.data);
      }

      return {
        ...state, data, loading: true, error: false,
      };

    case PaymentTypes.PAYMENT_EDIT_REQUEST:
      if (action.payload.data) {
        const index = data.findIndex((p) => p.id === action.payload.data.id);
        if (index > -1) data[index] = { ...action.payload.data };
      }

      return {
        ...state, data, loading: true, error: false,
      };

    case PaymentTypes.PAYMENT_REMOVE_REQUEST:
      if (action.payload.data) {
        const index = data.indexOf(action.payload.data, 0);
        if (index > -1) {
          data.splice(index, 1);
        }
      }

      return {
        ...state, data, loading: true, error: false,
      };

    default:
      return state;
  }
}

// eslint-disable-next-line max-len
const paymentReducer: Reducer<BaseStates<Payment>> = (state, action) => paymentReduce(state, action);

export { paymentReducer };
