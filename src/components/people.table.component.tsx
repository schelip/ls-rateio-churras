import React, { Component } from 'react';
import {
  Button,
  FormControl,
  InputGroup,
  Table,
} from 'react-bootstrap';
import {
  BsCheck, BsPencil, BsTrash, BsX,
} from 'react-icons/bs';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Person } from '../models/person.model';
import '../assets/style/table.css';
import { ApplicationState, Actions } from '../store';
import { Expense } from '../models/expense.model';

interface StateProps {
  people: Person[];
  expenses: Expense[];
}

interface State {
  editingPerson?: Person;
  editingName: string;
}

interface DispatchProps {
  editPersonRequest(data: { state: Person[]; data: Person }): void;
  removePersonRequest(data: { state: Person[]; data: Person }): void;
  removeExpenseRequest(data: { state: Expense[]; data: Expense }): void;
  loadRequest(): void;
}

type Props = StateProps & DispatchProps;

class PeopleTableComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editingPerson: undefined,
      editingName: '',
    };

    this.updateEditingPerson = this.updateEditingPerson.bind(this);
    this.updateEditingName = this.updateEditingName.bind(this);
  }

  componentDidMount() {
    const { loadRequest } = this.props;

    loadRequest();
  }

  updateEditingName(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ editingName: event.target.value });
  }

  updateEditingPerson(person?: Person) {
    this.setState({ editingPerson: person });
  }

  render() {
    const {
      people,
      expenses,
      editPersonRequest,
      removePersonRequest,
      removeExpenseRequest,
    } = this.props;
    const { editingPerson, editingName } = this.state;

    return (
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>Nome</th>
            <th className="actions-col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              {editingPerson === person
                ? (
                  <>
                    <td>
                      <InputGroup size="sm">
                        <InputGroup.Text id="new-name">Novo Nome</InputGroup.Text>
                        <FormControl onChange={this.updateEditingName} />
                      </InputGroup>
                    </td>
                    <td className="actions-col">
                      <Button
                        variant="light"
                        onClick={() => {
                          editPersonRequest({
                            state: people,
                            data: { ...person, name: editingName },
                          });
                          this.updateEditingPerson(undefined);
                        }}
                      >
                        <BsCheck />
                      </Button>
                      <Button variant="light" onClick={() => this.updateEditingPerson(undefined)}>
                        <BsX />
                      </Button>
                    </td>
                  </>
                )
                : (
                  <>
                    <td>
                      {person.name}
                    </td>
                    <td className="actions-col">
                      <Button variant="light" onClick={() => this.updateEditingPerson(person)}>
                        <BsPencil />
                      </Button>
                      <Button
                        variant="light"
                        onClick={() => {
                          removePersonRequest({
                            state: people,
                            data: person,
                          });
                          const expense = expenses.find((e) => e.person === person);
                          if (expense) {
                            removeExpenseRequest({
                              state: expenses,
                              data: expense,
                            });
                          }
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

export default connect(mapStateToProps, mapDispatchToProps)(PeopleTableComponent);
