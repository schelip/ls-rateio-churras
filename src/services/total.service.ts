/* eslint-disable no-param-reassign */

import { Person } from '../models/person.model';
import { Expense } from '../models/expense.model';
import { Total, ReceivingEnum } from '../models/total.model';
import { Payment } from '../models/payment.model';

function calcTotalValue(
  person: Person, people: Person[], expenses: Expense[], payments: Payment[],
) {
  let totalValue = 0;
  person.dates.forEach((date) => {
    const dateExpensesSum = expenses
      .filter((e) => e.date.getTime() === date.getTime())
      .reduce((a, s) => a + s.value, 0);
    const dateExpensesPerPerson = dateExpensesSum / (people.filter(
      (p) => p.dates.find((d) => d.getTime() === date.getTime()),
    )).length;
    totalValue -= dateExpensesPerPerson;
  });

  const expensesValue = expenses
    .filter((e) => e.person.id === person.id)
    .reduce((a, s) => a + s.value, 0);
  totalValue += expensesValue;

  let remainingValue = totalValue;
  payments.forEach((payment) => {
    if (payment.personPaying.id === person.id) remainingValue += payment.value;
    if (payment.personReceiving.id === person.id) remainingValue -= payment.value;
  });

  let isReceiving;
  if (remainingValue === 0) {
    isReceiving = ReceivingEnum.equal;
  } else if (remainingValue > 0) {
    isReceiving = ReceivingEnum.yes;
  } else isReceiving = ReceivingEnum.no;

  return {
    expensesValue, totalValue, remainingValue, isReceiving,
  };
}

function createTotal(totalState: Total[], person: Person): Total[] {
  totalState.push(new Total(person, 0, 0, 0, ReceivingEnum.equal));
  return totalState;
}

function removeTotal(totalState: Total[], person: Person): Total[] {
  const index = totalState.findIndex((t) => t.person.id === person.id);
  if (index > -1) totalState.splice(index, 1);
  return totalState;
}

function updateTotalState(
  totalState: Total[], people: Person[], expenses: Expense[], payments: Payment[],
): Total[] {
  people.forEach((person) => {
    const {
      expensesValue, totalValue, remainingValue, isReceiving,
    } = calcTotalValue(person, people, expenses, payments);

    const index = totalState.findIndex((t) => t.person.id === person.id);
    totalState[index] = {
      ...totalState[index],
      person,
      expensesValue,
      totalValue,
      remainingValue,
      isReceiving,
    };
  });

  return totalState;
}

export {
  createTotal, removeTotal, updateTotalState,
};
