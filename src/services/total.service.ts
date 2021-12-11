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

  let remaining = totalValue;
  payments.forEach((payment) => {
    if (payment.personPaying.id === person.id) remaining += payment.value;
    if (payment.personReceiving.id === person.id) remaining -= payment.value;
  });

  let isReceiving;
  if (remaining === 0) {
    isReceiving = ReceivingEnum.equal;
  } else if (remaining > 0) {
    isReceiving = ReceivingEnum.yes;
  } else isReceiving = ReceivingEnum.no;

  return {
    expensesValue, totalValue, remaining, isReceiving,
  };
}

function updateTotal(
  totalState: Total[], people: Person[], expenses: Expense[], payments: Payment[],
): Total[] {
  const updatedTotalState = totalState;
  updatedTotalState.length = 0;

  people.forEach((person) => {
    const {
      expensesValue, totalValue, remaining, isReceiving,
    } = calcTotalValue(person, people, expenses, payments);

    updatedTotalState.push(new Total(
      person,
      expensesValue,
      totalValue,
      remaining,
      isReceiving,
    ));
  });

  return updatedTotalState;
}

export {
  updateTotal,
};
