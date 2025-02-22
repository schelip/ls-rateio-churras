import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import PeopleComponent from './people/people.component';
import ExpensesComponent from './expenses/expenses.component';
import PaymentsComponent from './payments/payments.component';
import TotalComponent from './total.component';
import DatesComponent from './dates/dates.component';

function TabComponent(): JSX.Element {
  return (
    <Tabs
      defaultActiveKey="people"
      id="uncontrolled-tab-example"
      className="mb-4 mt-3"
    >
      <Tab eventKey="people" title="Pessoas">
        <PeopleComponent />
      </Tab>
      <Tab eventKey="dates" title="Datas">
        <DatesComponent />
      </Tab>
      <Tab eventKey="expenses" title="Gastos">
        <ExpensesComponent />
      </Tab>
      <Tab eventKey="total" title="Total">
        <TotalComponent />
      </Tab>
      <Tab eventKey="payments" title="Pagamentos">
        <PaymentsComponent />
      </Tab>
    </Tabs>
  );
}

export default TabComponent;
