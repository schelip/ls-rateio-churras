/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer } from 'redux';
import { Person } from '../../../models/person.model';
import { BaseStates } from '../base/base.types';
import { PersonTypes } from './people.types';

const INITIAL_STATE_PEOPLE = {
  data: [],
  loading: false,
  error: false,
};

function peopleReduce(state: BaseStates<Person> = INITIAL_STATE_PEOPLE, action: any): any {
  const data = [...state.data];
  switch (action.type) {
    case PersonTypes.PERSON_CREATE_REQUEST:
      if (action.payload.data) {
        data.push(action.payload.data);
      }
      return {
        ...state, data, loading: true, error: false,
      };

    case PersonTypes.PERSON_EDIT_REQUEST:
      if (action.payload.data) {
        const index = data.findIndex((p) => p.id === action.payload.data.id);
        if (index > -1) Object.assign(data[index], action.payload.data);
      }
      return {
        ...state, data, loading: true, error: false,
      };

    case PersonTypes.PERSON_REMOVE_REQUEST:
      if (action.payload.data) {
        const index = data.indexOf(action.payload.data, 0);
        if (index > -1) data.splice(index, 1);
      }

      return {
        ...state, data, loading: true, error: false,
      };

    default:
      return state;
  }
}

const peopleReducer: Reducer<BaseStates<Person>> = (state, action) => peopleReduce(state, action);

export {
  peopleReducer,
};
