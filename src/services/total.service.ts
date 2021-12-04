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

function updateTotalPeople(totalState: Total[], people: Person[]): Total[] {
  if (people.length > totalState.length) {
    const person = people.find((p) => !totalState.find((t) => t.person === p));
    if (person) totalState.push(new Total(person, 0, 0, ReceivingEnum.no));
  } else if (people.length < totalState.length) {
    const index = totalState.findIndex((t) => !people.includes(t.person), 0);
    if (index > -1) {
      totalState.splice(index, 1);
    }
  }
  return calcTotalExpenses(totalState);
}

function updateTotalExpenses(totalState: Total[], expenses: Expense[]): Total[] {
  totalState.forEach((total) => {
    const expense = expenses.find((e) => e.person.id === total.person.id);
    total.expenseValue = expense ? expense.value : 0;
  });

  return calcTotalExpenses(totalState);
}

export {
  updateTotalPeople, updateTotalExpenses,
};
