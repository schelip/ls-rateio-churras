/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { Summary } from '../../../models/summary.model';
import { SummaryTypes } from './summary.types';

export const updateSummariesRequest = () => (dispatch: any, getState: any) => {
  const { summaries, people, expenses } = getState();
  dispatch(action(SummaryTypes.SUMMARIES_UPDATE_REQUEST, {
    state: summaries.data, people: people.data, expenses: expenses.data,
  }));
};

export const updateSummaryRequest = (date: Date) => (dispatch: any, getState: any) => {
  const { people, expenses, summaries } = getState();
  const summary = summaries.data.slice(1).find((s: Summary) => s.date && date
      && s.date.getTime() === date.getTime());

  if (!summary && date) {
    dispatch(action(SummaryTypes.SUMMARY_CREATE_REQUEST, {
      state: summaries.data, date, people: people.data, expenses: expenses.data,
    }));
  } else {
    dispatch(action(SummaryTypes.SUMMARY_EDIT_REQUEST, {
      state: summaries.data, date, people: people.data, expenses: expenses.data,
    }));
  }

  updateSummariesRequest()(dispatch, getState);
};
