import { combineReducers } from 'redux';
import { peopleReducer } from './people/people.reducer';
import { expenseReducer } from './expense/expense.reducer';
import { totalReducer } from './total/total.reducer';
import { summaryReducer } from './summary/summary.reducer';

export default combineReducers({
  people: peopleReducer,
  expense: expenseReducer,
  total: totalReducer,
  summary: summaryReducer,
});
