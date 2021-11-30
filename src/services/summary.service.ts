import { Expense } from '../models/expense.model';
import { Summary } from '../models/summary.model';

function updateSummaryPeople(summary: Summary): Summary {
  const updatedSummary = summary;
  updatedSummary.peopleCount += 1;
  return updatedSummary;
}

function updateSummaryExpenses(summary: Summary, expenses: Expense[]): Summary {
  const expensesSum = expenses.reduce((a, s) => a + s.value, 0);
  const expensesPerPerson = (expensesSum / summary.peopleCount) * -1;
  const people = expenses.map((s) => s.person);

  const peopleReceiving = people.filter((p) => {
    const expense = expenses.find((s) => s.person.id === p.id);
    if (!expense) {
      return false;
    }

    return expense.value > expensesPerPerson;
  });

  return { ...summary, expensesPerPerson, peopleReceiving };
}

export { updateSummaryPeople, updateSummaryExpenses };
