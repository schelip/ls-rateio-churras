/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer } from 'redux';
import { Total } from '../../../models/total.model';
import { BaseStates } from '../base/base.types';
import { ExpenseTypes } from '../expense/expense.types';
import * as TotalService from '../../../services/total.service';
import { PersonTypes } from '../person/person.types';

const TOTAL_INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

function totalReduce(state: BaseStates<Total> = TOTAL_INITIAL_STATE, action: any): any {
  const people = [...state.data];
  const expenses = [...state.data];
  switch (action.type) {
    case PersonTypes.PERSON_CREATE_REQUEST:
      TotalService.addNewPerson(people, action.payload.data);

      return {
        ...state, data: people, loading: true, error: false,
      };
    case ExpenseTypes.EXPENSE_CREATE:
      TotalService.addNewExpense(expenses, action.payload.data);

      return {
        ...state, data: expenses, loading: true, error: false,
      };
    default:
      return state;
  }
}

const totalReducer: Reducer<BaseStates<Total>> = (state, action) => totalReduce(state, action);

export {
  totalReducer,
};
