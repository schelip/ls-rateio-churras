/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Summary } from '../models/summary.model';
import { Actions, ApplicationState } from '../store';


interface SummaryStateProps {
  summary: Summary[]
}


class SummaryComponent extends Component<SummaryStateProps>{
  componentDidMount() { }

  render() {

    const { summary } = this.props
    return (
      <div className="total-component">
          <h4>Total de pessoas: {summary[0].peopleCount}</h4>
          <h4>Média de gastos: {summary[0].expensesPerPerson}</h4>

          <ul>
            {summary[0].peopleReceiving.map(person => (
                <li key={person.id}>{person.name}</li>
            ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  summary: state.summary.data
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SummaryComponent);

