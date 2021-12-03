import { Expense } from '../models/expense.model';
import { Person } from '../models/person.model';
import { Summary } from '../models/summary.model';

function updateSummaryPeople(summary: Summary, people: Person[]): Summary {
  const updatedSummary = summary;
  updatedSummary.peopleCount = people.length;
  updatedSummary.peopleReceiving.map((person) => {
    const updatedPerson = people.find((p) => p.id === person.id);
    if (updatedPerson) return updatedPerson; return person;
  });
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
