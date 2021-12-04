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
import { Person } from '../models/person.model';
import { Expense } from '../models/expense.model';
import { Actions, ApplicationState } from '../store';
import '../assets/style/table.css';

interface StateProps {
  people: Person[];
  expenses: Expense[];
}

interface State {
  editingExpense?: Expense;
  editingPersonId: string;
  editingValue: number;
}

interface DispatchProps {
  editExpenseRequest(data: { state: Expense[], data: Expense }): void;
  removeExpenseRequest(data: { state: Expense[], data: Expense }): void;
  loadRequest(): void;
}

type Props = StateProps & DispatchProps;

class ExpensesTableComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editingExpense: undefined,
      editingPersonId: '',
      editingValue: 0,
    };

    this.updateEditingValue = this.updateEditingValue.bind(this);
    this.updateEditingPersonId = this.updateEditingPersonId.bind(this);
    this.updateEditingExpense = this.updateEditingExpense.bind(this);
  }

  componentDidMount() {
    const { loadRequest } = this.props;

    loadRequest();
  }

  handleDataRequest(expense: Expense) {
    const { people } = this.props;
    const { editingPersonId, editingValue } = this.state;

    const person = people.find((p) => p.id === editingPersonId);

    if (!person) {
      throw Error();
    }

    const { expenses } = this.props;
    return {
      state: expenses,
      data: { ...expense, person, value: editingValue },
    };
  }

  updateEditingValue(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ editingValue: Number(event.target.value) });
  }

  updateEditingPersonId(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ editingPersonId: event.target.value });
  }

  updateEditingExpense(expense?: Expense) {
    this.setState({ editingExpense: expense });
  }

  render() {
    const {
      people, expenses, editExpenseRequest, removeExpenseRequest,
    } = this.props;
    const { editingExpense } = this.state;
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th className="actions-col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              {editingExpense === expense
                ? (
                  <>
                    <td>
                      <Form.Select onChange={this.updateEditingPersonId}>
                        <option value="null">Nova pessoa</option>
                        {people.map((person) => (
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
                    <td className="actions-col">
                      <Button
                        variant="light"
                        onClick={() => {
                          editExpenseRequest(this.handleDataRequest(expense));
                          this.updateEditingExpense(undefined);
                        }}
                      >
                        <BsCheck />
                      </Button>
                      <Button variant="light" onClick={() => this.updateEditingExpense(undefined)}>
                        <BsX />
                      </Button>
                    </td>
                  </>
                )
                : (
                  <>
                    <td>{expense.person.name}</td>
                    <td>{expense.value}</td>
                    <td className="actions-col">
                      <Button variant="light" onClick={() => this.updateEditingExpense(expense)}>
                        <BsPencil />
                      </Button>
                      <Button
                        variant="light"
                        onClick={() => {
                          removeExpenseRequest({
                            state: expenses,
                            data: expense,
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
  expenses: state.expenses.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTableComponent);
