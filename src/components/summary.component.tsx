/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Component } from 'react';
import {
  Card, Col, ListGroup, ListGroupItem, Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Summary } from '../models/summary.model';
import { Actions, ApplicationState } from '../store';
import '../assets/style/summary.css';

interface SummaryStateProps {
  summary: Summary[]
}

class SummaryComponent extends Component<SummaryStateProps> {
  componentDidMount() { }

  render() {
    const { summary } = this.props;
    return (
      <div className="summary-component">
        <Card>
          <Card.Header>
            <b>Resumo</b>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}><b>Total de pessoas</b></Col>
              <Col md={6}>{summary[0].peopleCount}</Col>

              <Col md={6}><b>Total de gastos</b></Col>
              <Col md={6}>{summary[0].expensesTotal}</Col>

              <Col md={6}><b>Gastos por pessoa</b></Col>
              <Col md={6}>{summary[0].expensesPerPerson}</Col>
            </Row>
            {summary[0].peopleReceiving.length > 0
              ? (
                <ListGroup variant="flush">
                  <b className="list-group-item">Pessoas recebendo</b>
                  {/* eslint-disable-next-line max-len */}
                  {summary[0].peopleReceiving.map((person) => (<ListGroupItem key={person.id}>{person.name}</ListGroupItem>))}
                </ListGroup>
              ) : <></>}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  summary: state.summary.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SummaryComponent);
