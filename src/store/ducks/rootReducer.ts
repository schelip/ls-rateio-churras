import { combineReducers } from 'redux';
import { personReducer } from './person/person.reducer';
import { expenseReducer } from './expense/expense.reducer';
import { totalReducer } from './total/total.reducer';
import { summaryReducer } from './summary/summary.reducer';

export default combineReducers({
    person: personReducer,
    expense: expenseReducer,
    total: totalReducer,
    summary: summaryReducer
});