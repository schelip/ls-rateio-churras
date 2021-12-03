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

function addNewPerson(totalState: Total[], person: Person): Total[] {
  totalState.push(new Total(person, 0, 0, ReceivingEnum.no));

  return calcTotalExpenses(totalState);
}

function updatePerson(totalState: Total[], person: Person): Total[] {
  const existingTotal = totalState.find((t) => t.person.id === person.id);
  if (existingTotal) existingTotal.person = person;
  return [...totalState];
}

function addNewExpense(totalState: Total[], expense: Expense): Total[] {
  const total = totalState.find((t) => t.person.id === expense.person.id);

  if (!total) {
    return totalState;
  }

  total.expenseValue += expense.value;

  return calcTotalExpenses(totalState);
}

export { addNewPerson, updatePerson, addNewExpense };
