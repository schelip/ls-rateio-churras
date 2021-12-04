import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import PeopleComponent from './people.component';
import ExpensesComponent from './expenses.component';
import TotalComponent from './total.component';

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
      <Tab eventKey="expenses" title="Gastos">
        <ExpensesComponent />
      </Tab>
      <Tab eventKey="total" title="Total">
        <TotalComponent />
      </Tab>
    </Tabs>
  );
}

export default TabComponent;
