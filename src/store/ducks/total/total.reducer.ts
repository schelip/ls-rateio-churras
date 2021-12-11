/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer } from 'redux';
import { Total } from '../../../models/total.model';
import { BaseStates } from '../base/base.types';
import * as TotalService from '../../../services/total.service';
import { TotalTypes } from './total.types';

const TOTAL_INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

function totalReduce(state: BaseStates<Total> = TOTAL_INITIAL_STATE, action: any): any {
  const data = [...state.data];
  switch (action.type) {
    case TotalTypes.TOTAL_CREATE_REQUEST:
      TotalService.createTotal(
        data, action.payload.person,
      );

      return {
        ...state, data, loading: true, error: false,
      };

    case TotalTypes.TOTAL_UPDATE_REQUEST:
      TotalService.updateTotalState(
        data,
        action.payload.people,
        action.payload.expenses,
        action.payload.payments,
      );

      return {
        ...state, data, loading: true, error: false,
      };

    case TotalTypes.TOTAL_REMOVE_REQUEST:
      TotalService.removeTotal(
        data, action.payload.person,
      );

      return {
        ...state, data, loading: true, error: false,
      };

    default:
      return state;
  }
}

const totalReducer: Reducer<BaseStates<Total>> = (state, action) => totalReduce(state, action);

export {
  totalReducer,
};
