/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Component } from 'react';
import { Accordion, Table } from 'react-bootstrap';
import { BsCheck2 } from 'react-icons/bs';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Helpers from '../helpers/helpers';
import { ReceivingEnum, Total } from '../models/total.model';
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
        <p>Veja o valor total do rateio por pessoa.</p>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Entenda o resultado</Accordion.Header>
            <Accordion.Body>
              <p>
                O cálculo do rateio é feito da seguinte forma:
                {' '}
                <b>(soma dos gastos / número de pessoas) - valor pago por pessoa</b>
                . O cálculo leva em conta apenas os dias em que a pessoa participou.
              </p>
              <p>
                O Total será atualizado ao cadastrar os pagamentos na próxima aba.
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <hr />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor do gasto</th>
              <th>Resultado</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {total.map((item) => (
              <tr key={item.id}>
                <td>{item.person.name}</td>
                <td>{Helpers.formatValue(item.expensesValue)}</td>
                <td>{Helpers.formatValue(item.totalValue)}</td>
                <td>
                  {item.isReceiving === ReceivingEnum.equal ? (
                    <>
                      <BsCheck2 />
                      {' '}
                      {' Concluído'}
                    </>
                  ) : (
                    <>
                      {item.isReceiving}
                      {' '}
                      {Helpers.formatValue(item.remainingValue)}
                    </>
                  )}
                  {' '}
                </td>
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
