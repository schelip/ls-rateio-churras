import { Expense } from '../models/expense.model';
import { Person } from '../models/person.model';
import { Summary } from '../models/summary.model';

function updateSummary(summary: Summary, people: Person[], expenses: Expense[]): Summary {
  const peopleCount = people.length;
  const expensesTotal = expenses.reduce((a, s) => a + s.value, 0);
  const expensesPerPerson = peopleCount !== 0 ? (expensesTotal / peopleCount) : 0;

  const peopleReceiving = expenses.map((s) => s.person).filter((p) => {
    const expense = expenses.find((s) => s.person.id === p.id);
    if (!expense) {
      return false;
    }

    return expense.value > expensesPerPerson;
  });

  return {
    ...summary, peopleCount, expensesTotal, expensesPerPerson, peopleReceiving,
  };
}

export {
  updateSummary,
};
