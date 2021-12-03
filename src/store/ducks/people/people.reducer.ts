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
  const { data } = state;
  switch (action.type) {
    case PersonTypes.PERSON_CREATE_REQUEST:
      if (action.payload.data) {
        data.push(action.payload.data);
      }
      return {
        ...state, data: [...data], loading: true, error: false,
      };

    case PersonTypes.PERSON_EDIT_REQUEST:
      if (action.payload.data) {
        const person = data.find((p) => p.id === action.payload.data.id);
        if (person) person.name = action.payload.data.name;
      }
      return {
        ...state, data: [...data], loading: true, error: false,
      };
    default:
      return state;
  }
}

const peopleReducer: Reducer<BaseStates<Person>> = (state, action) => peopleReduce(state, action);

export {
  peopleReducer,
};
