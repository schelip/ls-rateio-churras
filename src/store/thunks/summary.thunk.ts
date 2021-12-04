/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { SummaryTypes } from '../ducks/summary/summary.types';

// summary
export const updateSummaryRequestThunk = (request: any) => (dispatch: any, getState: any) => {
  dispatch(request);

  const { people, expenses } = getState();
  dispatch(action(SummaryTypes.SUMMARY_UPDATE_REQUEST, { people, expenses }));
};
