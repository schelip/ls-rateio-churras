/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
import { Reducer } from "redux";
import { Expense } from "../../../models/expense.model";
import { BaseStates } from "../base/base.types";
import { ExpenseTypes } from "./expense.types";

const SPEND_INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

function expenseReduce(
  state: BaseStates<Expense> = SPEND_INITIAL_STATE,
  action: any
): any {
  console.log(action.type, state, action);

  switch (action.type) {
    case ExpenseTypes.EXPENSE_CREATE:
      const data = [...state.data];
      if (action.payload.data) {
        data.push(action.payload.data);
      }

      console.log("state com push ->>>", action.payload.state);

      return { ...state, data, loading: true, error: false };
    default:
      return state;
  }
}

const expenseReducer: Reducer<BaseStates<Expense>> = (state, action) =>
  expenseReduce(state, action);

export { expenseReducer };
