/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Component } from 'react';
import { Accordion, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import SummaryComponent from './summary.component';
import { Total } from '../models/total.model';
import { Actions, ApplicationState } from '../store';

interface TotalStateProps {
  total: Total[]
}

class TotalComponent extends Component<TotalStateProps> {
  componentDidMount() { }

  render() {
    const { total } = this.props;
    return (
      <div className="total-component">
        <h3>Resultado do rateio</h3>
        <p>Aqui você pode ver o valor total do rateio por pessoa.</p>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Entenda o resultado</Accordion.Header>
            <Accordion.Body>

              <p>
                Quem está
                {' '}
                <b>negativo</b>
                {' '}
                deverá pagar a quantidade indicada pelo valor total, e quem está
                {' '}
                <b>positivo</b>
                {' '}
                deverá receber a quantidade indicada.
              </p>
              <p>
                O cálculo do rateio é feito da seguinte forma:
                {' '}
                <b>(soma dos gastos / número de pessoas) - valor pago por pessoa</b>
                .
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <SummaryComponent />
        <hr />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor do gasto</th>
              <th>Vai restituir</th>
              <th>Valor total</th>
            </tr>
          </thead>
          <tbody>
            {total.map((item) => (
              <tr key={item.id}>
                <td>{item.person.name}</td>
                <td>{item.expenseValue}</td>
                <td>{item.isReceiving}</td>
                <td>{item.totalValue}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  total: state.total.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TotalComponent);
