/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer } from 'redux';
import { Total } from '../../../models/total.model';
import { BaseStates } from '../base/base.types';
import { ExpenseTypes } from '../expense/expense.types';
import * as TotalService from '../../../services/total.service';
import { PersonTypes } from '../people/people.types';

const TOTAL_INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

function totalReduce(state: BaseStates<Total> = TOTAL_INITIAL_STATE, action: any): any {
  const data = [...state.data];
  switch (action.type) {
    case PersonTypes.PERSON_CREATE_REQUEST:
    case PersonTypes.PERSON_EDIT_REQUEST:
    case PersonTypes.PERSON_REMOVE_REQUEST:
      TotalService.updateTotalPeople(data, action.payload.state);

      return {
        ...state, data, loading: true, error: false,
      };

    case ExpenseTypes.EXPENSE_CREATE_REQUEST:
    case ExpenseTypes.EXPENSE_EDIT_REQUEST:
    case ExpenseTypes.EXPENSE_REMOVE_REQUEST:
      TotalService.updateTotalExpenses(data, action.payload.state);

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
