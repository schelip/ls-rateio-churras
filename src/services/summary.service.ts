import { Expense } from '../models/expense.model';
import { Summary } from '../models/summary.model';

function updateSummaryPeople(summary: Summary): Summary {
  const updatedSummary = summary;
  updatedSummary.peopleCount += 1;
  return updatedSummary;
}

function updateSummaryExpenses(summary: Summary, expenses: Expense[]): Summary {
  const updatedSummary = summary;
  const expensesSum = expenses.reduce((a, s) => a + s.value, 0);
  updatedSummary.expensesPerPerson = (expensesSum / summary.peopleCount);

  const people = expenses.map((s) => s.person);
  updatedSummary.peopleReceiving = people.filter((p) => {
    const expense = expenses.find((s) => s.person.id === p.id);
    if (!expense) {
      return false;
    }

    return expense.value > updatedSummary.expensesPerPerson;
  });

  return updatedSummary;
}

export { updateSummaryPeople, updateSummaryExpenses };
