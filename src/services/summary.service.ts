import { Expense } from '../models/expense.model';
import { Person } from '../models/person.model';
import { Summary } from '../models/summary.model';

function getProps(date: Date, people: Person[], expenses: Expense[]) {
  const filteredPeople = people.filter((p) => p.dates.find((d) => d.getDate() === date.getDate()));

  const peopleCount = filteredPeople.length;

  const filteredExpenses = expenses.filter(
    (e) => e.date.getDate() === date.getDate(),
  );

  const expensesTotal = filteredExpenses.reduce((a, s) => a + s.value, 0);

  const expensesPerPerson = expensesTotal / peopleCount || 0;

  const peopleReceiving = filteredPeople.filter((p) => {
    const expense = filteredExpenses.find((e) => e.person.id === p.id);
    return expense && expense.value > expensesPerPerson;
  });

  return {
    peopleCount, peopleReceiving, expensesTotal, expensesPerPerson,
  };
}

export function updateSummaries(
  summaries: Summary[], people: Person[], expenses: Expense[],
): Summary[] {
  const peopleCount = people.length;
  const expensesTotal = expenses.reduce((a, s) => a + s.value, 0);
  const expensesPerPerson = expensesTotal / peopleCount || 0;
  const peopleReceiving = people.filter((p) => {
    const expense = expenses.find((e) => e.person.id === p.id);
    return expense && expense.value > expensesPerPerson;
  });

  const updatedSummaries = summaries;
  updatedSummaries[0] = {
    ...summaries[0], peopleCount, expensesTotal, expensesPerPerson, peopleReceiving,
  };

  summaries.slice(1).forEach((s) => {
    if (!people.find((p) => p.dates.find((d) => d.getDate() === s.date.getDate()))) {
      summaries.splice(summaries.indexOf(s), 1);
    }
  });

  return updatedSummaries;
}

export function createSummary(
  summaries: Summary[], date: Date, people: Person[], expenses: Expense[],
): Summary[] {
  const {
    peopleCount, peopleReceiving, expensesTotal, expensesPerPerson,
  } = getProps(date, people, expenses);

  const updatedSummaries = summaries;
  updatedSummaries.push(
    new Summary(peopleCount, peopleReceiving, expensesTotal, expensesPerPerson, date),
  );
  const sorted = updatedSummaries.slice(1).sort((a, b) => a.date.getDate() - b.date.getDate());

  for (let i = 1; i < updatedSummaries.length; i += 1) {
    updatedSummaries[i] = sorted[i - 1];
  }

  return updatedSummaries;
}

export function editSummary(
  summaries: Summary[], date: Date, people: Person[], expenses: Expense[],
): Summary[] {
  const {
    peopleCount, peopleReceiving, expensesTotal, expensesPerPerson,
  } = getProps(date, people, expenses);

  const updatedSummaries = summaries;
  const index = updatedSummaries.slice(1).findIndex((s) => s.date.getDate() === date.getDate()) + 1;
  updatedSummaries[index] = {
    ...updatedSummaries[index],
    peopleCount,
    peopleReceiving,
    expensesTotal,
    expensesPerPerson,
  };

  return updatedSummaries;
}
