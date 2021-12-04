/* eslint-disable no-param-reassign */

import { Person } from '../models/person.model';
import { Expense } from '../models/expense.model';
import { Total, ReceivingEnum } from '../models/total.model';

function calcTotalExpenses(totalState: Total[]) {
  const expensesSum = totalState.reduce((a, t) => a + t.expenseValue, 0);
  const expensesPerPerson = (expensesSum / totalState.length) * -1;

  return totalState.map((item) => {
    const total = expensesPerPerson + item.expenseValue;
    item.totalValue = total;
    if (total === 0) {
      item.isReceiving = ReceivingEnum.equal;
    } else {
      item.isReceiving = total > 0 ? ReceivingEnum.yes : ReceivingEnum.no;
    }
    return item;
  });
}

function addTotalPerson(totalState: Total[], person: Person): Total[] {
  totalState.push(new Total(person, 0, 0, ReceivingEnum.no));
  return calcTotalExpenses(totalState);
}

function updateTotalPerson(totalState: Total[], person: Person): Total[] {
  const total = totalState.find((t) => t.person.id === person.id);
  if (total) total.person = person;
  return calcTotalExpenses(totalState);
}

function removeTotalPerson(totalState: Total[], person: Person): Total[] {
  const index = totalState.findIndex((t) => t.person.id === person.id);
  if (index > -1) {
    totalState.splice(index, 1);
  }
  return calcTotalExpenses(totalState);
}

function addTotalExpense(totalState: Total[], expense: Expense): Total[] {
  const total = totalState.find((t) => t.person.id === expense.person.id);
  if (total) total.expenseValue = expense.value;
  return calcTotalExpenses(totalState);
}

function updateTotalExpense(totalState: Total[], expenses: Expense[], expense: Expense): Total[] {
  const oldExpense = expenses.find((e) => e.id === expense.id);
  if (oldExpense) {
    const oldTotal = totalState.find((t) => t.person.id === oldExpense.person.id);
    if (oldTotal) oldTotal.expenseValue = 0;

    const total = totalState.find((t) => t.person.id === expense.person.id);
    if (total) total.expenseValue = expense.value;
  }

  return calcTotalExpenses(totalState);
}

function removeTotalExpense(totalState: Total[], expense: Expense): Total[] {
  const total = totalState.find((t) => t.person.id === expense.person.id);
  if (total) total.expenseValue -= expense.value;
  return calcTotalExpenses(totalState);
}

export {
  addTotalPerson,
  updateTotalPerson,
  removeTotalPerson,
  addTotalExpense,
  updateTotalExpense,
  removeTotalExpense,
};
