/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer } from 'redux';
import { Person } from '../../../models/person.model';
import { BaseStates } from '../base/base.types';
import { PersonTypes } from './person.types';

const INITIAL_STATE_PERSON = {
  data: [],
  loading: false,
  error: false,
};

function personReduce(state: BaseStates<Person> = INITIAL_STATE_PERSON, action: any): any {
  const data = [...state.data];
  switch (action.type) {
    case PersonTypes.PERSON_CREATE_REQUEST:
      if (action.payload.data) {
        data.push(action.payload.data);
      }
      return {
        ...state, data, loading: true, error: false,
      };
    default:
      return state;
  }
}

const personReducer: Reducer<BaseStates<Person>> = (state, action) => personReduce(state, action);

export {
  personReducer,
};
