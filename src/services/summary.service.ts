import { Expense } from '../models/expense.model';
import { Person } from '../models/person.model';
import { Summary } from '../models/summary.model';

function addSummaryPerson(summary: Summary): Summary {
  const peopleCount = summary.peopleCount + 1;
  const expensesPerPerson = summary.expensesTotal / peopleCount;
  return { ...summary, peopleCount, expensesPerPerson };
}

function editSummaryPerson(summary: Summary, person: Person): Summary {
  const { peopleReceiving } = summary;
  peopleReceiving.map((p) => (p.id === person.id ? person : p));
  return { ...summary, peopleReceiving };
}

function removeSummaryPerson(summary: Summary, person: Person): Summary {
  const { peopleReceiving } = summary;
  const index = peopleReceiving.findIndex((p) => p.id === person.id);
  if (index > -1) {
    peopleReceiving.splice(index, 1);
  }
  return { ...summary, peopleCount: summary.peopleCount - 1, peopleReceiving };
}

function updateSummaryExpenses(summary: Summary, expenses: Expense[]): Summary {
  const expensesTotal = expenses.reduce((a, s) => a + s.value, 0);
  const expensesPerPerson = summary.peopleCount !== 0 ? (expensesTotal / summary.peopleCount) : 0;

  const peopleReceiving = expenses.map((s) => s.person).filter((p) => {
    const expense = expenses.find((s) => s.person.id === p.id);
    if (!expense) {
      return false;
    }

    return expense.value > expensesPerPerson;
  });

  return {
    ...summary, expensesTotal, expensesPerPerson, peopleReceiving,
  };
}

export {
  addSummaryPerson, editSummaryPerson, removeSummaryPerson, updateSummaryExpenses,
};
