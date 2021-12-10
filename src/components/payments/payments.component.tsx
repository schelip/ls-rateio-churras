import React, { Component } from 'react';
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Row,
  Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Person } from '../../models/person.model';
import { Actions, ApplicationState } from '../../store';
import '../../assets/style/table.css';
import { Payment } from '../../models/payment.model';
import PaymentsTable from './payments.table.component';
import { PaymentsPayload } from '../../store/ducks/payments/payments.actions';

interface StateProps {
    people: Person[];
    payments: Payment[];
}

interface State {
    value: number;
    personPayingId: string;
  personReceivingId: string;
}

interface DispatchProps {
  createPaymentRequest(payload: PaymentsPayload): void;
  loadRequest(): void;
}

type Props = StateProps & DispatchProps;

class PaymentsComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: 0,
      personPayingId: '',
      personReceivingId: '',
    };

    this.updateValue = this.updateValue.bind(this);
    this.updatePersonPaying = this.updatePersonPaying.bind(this);
    this.updatePersonReceiving = this.updatePersonReceiving.bind(this);
  }

  componentDidMount() {
    const { loadRequest } = this.props;

    loadRequest();
  }

  handleDataRequest() {
    const { people } = this.props;
    const { personPayingId, personReceivingId, value } = this.state;

    const personPaying = people.find((p) => p.id === personPayingId);
    const personReceiving = people.find((p) => p.id === personReceivingId);

    if (!personPaying || !personReceiving) {
      throw Error();
    }

    const { payments } = this.props;
    return {
      state: payments,
      data: new Payment(personPaying, personReceiving, value),
    };
  }

  updateValue(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: Number(event.target.value) });
  }

  updatePersonPaying(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ personPayingId: event.target.value });
  }

  updatePersonReceiving(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ personReceivingId: event.target.value });
  }

  render() {
    const {
      people, createPaymentRequest,
    } = this.props;
    const {
      personPayingId, personReceivingId,
    } = this.state;
    return (
      <div className="payments-component">
        <h3>Pagamentos</h3>
        <p>
          Cadastre quem pagou quem e quanto foi pago no rolê.
        </p>

        <Row className="justify-content-md-center">
          <Col lg="3">
            <Form.Select onChange={this.updatePersonPaying}>
              <option value="null">Quem pagou</option>
              {people.filter((p) => p.id !== personReceivingId).map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col lg="3">
            <InputGroup>
              <InputGroup.Text>R$</InputGroup.Text>
              <FormControl
                aria-label="Add Expense Value"
                type="number"
                placeholder="Valor"
                onChange={this.updateValue}
              />
            </InputGroup>
          </Col>
          <Col lg="3">
            <Form.Select onChange={this.updatePersonReceiving}>
              <option value="null">Quem recebeu</option>
              {people.filter((p) => p.id !== personPayingId).map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col lg="1">
            <Button
              variant="outline-dark"
              onClick={() => createPaymentRequest(this.handleDataRequest())}
            >
              Salvar
            </Button>
          </Col>
        </Row>
        <hr />
        <PaymentsTable />
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  people: state.people.data,
  payments: state.payments.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsComponent);
