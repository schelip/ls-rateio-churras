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
import { Expense } from '../../models/expense.model';
import { Actions, ApplicationState } from '../../store';
import '../../assets/style/table.css';
import ExpensesTableComponent from './expenses.table.component';

interface StateProps {
  people: Person[];
  expenses: Expense[];
}

interface State {
  value: number;
  personId: string;
}

interface DispatchProps {
  createExpenseRequest(data: { state: Expense[], data: Expense }): void;
  loadRequest(): void;
}

type Props = StateProps & DispatchProps;

class ExpensesComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: 0,
      personId: '',
    };

    this.updateValue = this.updateValue.bind(this);
    this.updatePerson = this.updatePerson.bind(this);
  }

  componentDidMount() {
    const { loadRequest } = this.props;

    loadRequest();
  }

  handleDataRequest() {
    const { people } = this.props;
    const { personId, value } = this.state;

    const person = people.find((p) => p.id === personId);

    if (!person) {
      throw Error();
    }

    const { expenses } = this.props;
    return {
      state: expenses,
      data: new Expense(person, value),
    };
  }

  updateValue(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: Number(event.target.value) });
  }

  updatePerson(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ personId: event.target.value });
  }

  render() {
    const {
      people, createExpenseRequest,
    } = this.props;
    return (
      <div className="expense-component">
        <h3>Gastos</h3>
        <p>
          Cadastre os valores que foram gastos no rolê
          e quem pagou.
        </p>

        <Row className="justify-content-md-center">
          <Col lg="4">
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
          <Col lg="5">
            <Form.Select onChange={this.updatePerson}>
              <option value="null">Quem pagou</option>
              {people.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col lg="1">
            <Button
              variant="outline-dark"
              onClick={() => createExpenseRequest(this.handleDataRequest())}
            >
              Salvar
            </Button>
          </Col>
        </Row>
        <hr />
        <ExpensesTableComponent />
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  people: state.people.data,
  expenses: state.expenses.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesComponent);
