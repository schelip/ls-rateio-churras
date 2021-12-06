/* eslint-disable no-param-reassign */

import { Person } from '../models/person.model';
import { Expense } from '../models/expense.model';
import { Total, ReceivingEnum } from '../models/total.model';
import { Payment } from '../models/payment.model';

function updateTotal(
  totalState: Total[], people: Person[], expenses: Expense[], payments: Payment[],
): Total[] {
  const updatedTotalState = totalState;
  updatedTotalState.length = 0;
  const expensesSum = expenses.reduce((a, e) => a + e.value, 0);
  const expensesPerPerson = (expensesSum / people.length) * -1;

  people.forEach((person) => {
    const expenseValue = expenses.find((e) => e.person.id === person.id)?.value || 0;
    const totalValue = expensesPerPerson + expenseValue || 0;
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

    updatedTotalState.push(new Total(
      person,
      expenseValue,
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
