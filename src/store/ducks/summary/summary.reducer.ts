/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer } from 'redux';
import { Summary } from '../../../models/summary.model';
import { BaseStates } from '../base/base.types';
import { ExpenseTypes } from '../expense/expense.types';
import * as SummaryService from '../../../services/summary.service';
import { PersonTypes } from '../person/person.types';

const SUMMARY_INITIAL_STATE : BaseStates<Summary> = {
  data: [
    {
      id: 'b4fcb9db-0158-44d8-bbb2-2b4c8c5cf3bd',
      peopleCount: 0,
      peopleReceiving: [],
      expensesPerPerson: 0,
    },
  ],
  loading: false,
  error: false,
};

function summaryReduce(state: BaseStates<Summary> = SUMMARY_INITIAL_STATE, action: any): any {
  const data = [...state.data];
  switch (action.type) {
    case PersonTypes.PERSON_CREATE_REQUEST:
      SummaryService.updateSummaryPeople(data[0]);

      return {
        ...state, data, loading: true, error: false,
      };
    case ExpenseTypes.EXPENSE_CREATE:
      SummaryService.updateSummaryExpenses(data[0], action.payload.state);

      return {
        ...state, data, loading: true, error: false,
      };
    default:
      return state;
  }
}

// eslint-disable-next-line max-len
const summaryReducer: Reducer<BaseStates<Summary>> = (state, action) => summaryReduce(state, action);

export { summaryReducer };
