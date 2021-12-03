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

function editTotalPerson(totalState: Total[], person: Person): Total[] {
  const existingTotal = totalState.find((t) => t.person.id === person.id);
  if (existingTotal) existingTotal.person = person;
  return calcTotalExpenses(totalState);
}

function removeTotalPerson(totalState: Total[], person: Person): Total[] {
  const index = totalState.findIndex((t) => t.person.id === person.id, 0);
  if (index > -1) {
    totalState.splice(index, 1);
  }

  return calcTotalExpenses(totalState);
}

function addNewExpense(totalState: Total[], expense: Expense): Total[] {
  const total = totalState.find((t) => t.person.id === expense.person.id);

  if (!total) {
    return totalState;
  }

  total.expenseValue += expense.value;

  return calcTotalExpenses(totalState);
}

export {
  addTotalPerson, editTotalPerson, removeTotalPerson, addNewExpense,
};
