/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer } from 'redux';
import { Summary } from '../../../models/summary.model';
import { BaseStates } from '../base/base.types';
import * as SummaryService from '../../../services/summary.service';
import { SummaryTypes } from './summary.types';

const SUMMARY_INITIAL_STATE : BaseStates<Summary> = {
  data: [
    {
      id: 'b4fcb9db-0158-44d8-bbb2-2b4c8c5cf3bd',
      peopleCount: 0,
      peopleReceiving: [],
      expensesTotal: 0,
      expensesPerPerson: 0,
    },
  ],
  loading: false,
  error: false,
};

function summaryReduce(state: BaseStates<Summary> = SUMMARY_INITIAL_STATE, action: any): any {
  const data = [...state.data];
  switch (action.type) {
    case SummaryTypes.SUMMARY_UPDATE_REQUEST:
      data[0] = SummaryService.updateSummary(
        data[0], action.payload.people.data, action.payload.expenses.data,
      );

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
