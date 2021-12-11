import React, { Component } from 'react';
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Table,
} from 'react-bootstrap';
import {
  BsTrash, BsPencil, BsCheck, BsX,
} from 'react-icons/bs';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Person } from '../../models/person.model';
import { Actions, ApplicationState } from '../../store';
import '../../assets/style/table.css';
import { Payment } from '../../models/payment.model';
import Helpers from '../../helpers/helpers';

interface StateProps {
  people: Person[];
  payments: Payment[];
}

interface State {
  editingPayment?: Payment;
  editingPersonPayingId: string;
  editingPersonReceivingId: string;
  editingValue: number;
}

interface DispatchProps {
  editPaymentRequest(data: { state: Payment[], data: Payment }): void;
  removePaymentRequest(data: { state: Payment[], data: Payment }): void;
  loadRequest(): void;
}

type Props = StateProps & DispatchProps;

class PaymentsTableComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editingPayment: undefined,
      editingPersonPayingId: '',
      editingPersonReceivingId: '',
      editingValue: 0,
    };

    this.updateEditingValue = this.updateEditingValue.bind(this);
    this.updateEditingPersonPayingId = this.updateEditingPersonPayingId.bind(this);
    this.updateEditingPersonReceivingId = this.updateEditingPersonReceivingId.bind(this);
    this.updateEditingPayment = this.updateEditingPayment.bind(this);
  }

  componentDidMount() {
    const { loadRequest } = this.props;

    loadRequest();
  }

  handleDataRequest(payment: Payment) {
    const { people } = this.props;
    const {
      editingPersonPayingId,
      editingPersonReceivingId,
      editingValue,
    } = this.state;

    const personPaying = people.find((p) => p.id === editingPersonPayingId);
    const personReceiving = people.find((p) => p.id === editingPersonReceivingId);

    if (!personPaying || !personReceiving) {
      throw Error();
    }

    const { payments } = this.props;
    return {
      state: payments,
      data: {
        ...payment, personPaying, personReceiving, value: editingValue,
      },
    };
  }

  updateEditingValue(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ editingValue: Number(event.target.value) });
  }

  updateEditingPersonPayingId(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ editingPersonPayingId: event.target.value });
  }

  updateEditingPersonReceivingId(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ editingPersonReceivingId: event.target.value });
  }

  updateEditingPayment(payment?: Payment) {
    this.setState({ editingPayment: payment });
  }

  render() {
    const {
      people, payments, editPaymentRequest, removePaymentRequest,
    } = this.props;
    const { editingPayment, editingPersonPayingId, editingPersonReceivingId } = this.state;
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Pagou</th>
            <th>Valor</th>
            <th>Recebeu</th>
            <th className="actions-col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              {editingPayment === payment
                ? (
                  <>
                    <td>
                      <Form.Select onChange={this.updateEditingPersonPayingId}>
                        <option value="null">Quem pagou</option>
                        {people
                          .filter((p) => !payments.some((e) => e.personPaying.id === p.id)
                            || payment.personPaying.id === p.id
                            || editingPersonReceivingId === p.id)
                          .map((person) => (
                            <option key={person.id} value={person.id}>
                              {person.name}
                            </option>
                          ))}
                      </Form.Select>
                    </td>
                    <td>
                      <InputGroup>
                        <InputGroup.Text>R$</InputGroup.Text>
                        <FormControl
                          aria-label="Edit Expense Value"
                          type="number"
                          placeholder="Novo Valor"
                          onChange={this.updateEditingValue}
                        />
                      </InputGroup>
                    </td>
                    <td>
                      <Form.Select onChange={this.updateEditingPersonReceivingId}>
                        <option value="null">Quem recebeu</option>
                        {people
                          .filter((p) => !payments.some((e) => e.personReceiving.id === p.id)
                            || payment.personReceiving.id === p.id
                            || editingPersonPayingId === p.id)
                          .map((person) => (
                            <option key={person.id} value={person.id}>
                              {person.name}
                            </option>
                          ))}
                      </Form.Select>
                    </td>
                    <td className="actions-col">
                      <Button
                        variant="light"
                        onClick={() => {
                          editPaymentRequest(this.handleDataRequest(payment));
                          this.updateEditingPayment(undefined);
                        }}
                      >
                        <BsCheck />
                      </Button>
                      <Button variant="light" onClick={() => this.updateEditingPayment(undefined)}>
                        <BsX />
                      </Button>
                    </td>
                  </>
                )
                : (
                  <>
                    <td>{payment.personPaying.name}</td>
                    <td>{Helpers.formatValue(payment.value)}</td>
                    <td>{payment.personReceiving.name}</td>
                    <td className="actions-col">
                      <Button variant="light" onClick={() => this.updateEditingPayment(payment)}>
                        <BsPencil />
                      </Button>
                      <Button
                        variant="light"
                        onClick={() => {
                          removePaymentRequest({
                            state: payments,
                            data: payment,
                          });
                        }}
                      >
                        <BsTrash />
                      </Button>
                    </td>
                  </>
                )}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  people: state.people.data,
  payments: state.payments.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsTableComponent);
