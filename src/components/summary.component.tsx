/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Component } from 'react';
import {
  Card, Col, Form, ListGroup, ListGroupItem, Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Summary } from '../models/summary.model';
import { Actions, ApplicationState } from '../store';
import '../assets/style/summary.css';
import ValueComponent from './value.component';
import { arraysEqual } from '../helpers/helpers';

interface Props {
  summaries: Summary[]
}

interface State {
  summary: Summary;
}

class SummaryComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { summaries } = this.props;
    this.state = {
      summary: summaries[0],
    };

    this.updateSummary = this.updateSummary.bind(this);
    this.updateDate = this.updateDate.bind(this);
  }

  componentDidMount() { }

  componentDidUpdate(prevProps: Props) {
    const { summaries } = this.props;
    const { summary } = this.state;
    if (!arraysEqual(summaries, prevProps.summaries)
      && summaries.length > 1
    ) {
      this.updateSummary(summaries.slice(1).find((s) => s.id === summary.id) || summaries[1]);
    }
  }

  updateSummary(summary: Summary) {
    this.setState({ summary });
  }

  updateDate(event: React.ChangeEvent<HTMLSelectElement>) {
    const { summaries } = this.props;
    const date = new Date(event.target.value);
    const summary = summaries.slice(1)
      .find((s) => s.date.getDate() === date.getDate()) || summaries[0];
    this.updateSummary(summary);
  }

  render() {
    const { summaries } = this.props;
    const { summary } = this.state;
    return (
      <div className="summary-component">
        <Card>
          <Card.Header>
            <b>Resumo Geral</b>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={7}><b>Total de participantes</b></Col>
              <Col md={5}>{summaries[0].peopleCount}</Col>

              <Col md={7}><b>Total de gastos</b></Col>
              <Col md={5}><ValueComponent>{summaries[0].expensesTotal}</ValueComponent></Col>

              <Col md={7}><b>Média de gastos por pessoa</b></Col>
              <Col md={5}><ValueComponent>{summaries[0].expensesPerPerson}</ValueComponent></Col>
            </Row>
          </Card.Body>
        </Card>

        {summaries.length > 1
            && (
            <Card>
              <Card.Header>
                <b>Resumo por dia</b>
                <Form.Select onChange={this.updateDate}>
                  {summaries.slice(1).map((s) => (
                    <option key={s.date.toString()} value={s.date.toString()}>
                      {`${s.date.getUTCDate()}/${s.date.getUTCMonth()}/${s.date.getUTCFullYear()}`}
                    </option>
                  ))}
                </Form.Select>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={7}><b>Participantes do dia</b></Col>
                  <Col md={5}>{summary.peopleCount}</Col>

                  <Col md={7}><b>Gastos do dia</b></Col>
                  <Col md={5}><ValueComponent>{summary.expensesTotal}</ValueComponent></Col>

                  <Col md={7}><b>Gastos por pessoa do dia</b></Col>
                  <Col md={5}><ValueComponent>{summary.expensesPerPerson}</ValueComponent></Col>
                </Row>
                {summary.peopleReceiving.length > 0
                  && (
                    <ListGroup variant="flush">
                      <b className="list-group-item">Pessoas recebendo</b>
                      {summary.peopleReceiving.map((person) => (
                        <ListGroupItem key={person.id}>{person.name}</ListGroupItem>))}
                    </ListGroup>
                  )}
              </Card.Body>
            </Card>
            )}
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  summaries: state.summaries.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SummaryComponent);
