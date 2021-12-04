import React, { Component } from 'react';
import {
  Button,
  FormControl,
  InputGroup,
  Row,
  Table,
  Col,
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
  name: string;
  editingPerson?: Person;
  editingName: string;
}

interface DispatchProps {
  createPersonRequest(data: { state: Person[]; data: Person }): void;
  editPersonRequest(data: { state: Person[]; data: Person }): void;
  removePersonRequest(data: { state: Person[]; data: Person }): void;
  removeExpenseRequest(data: { state: Expense[]; data: Expense }): void;
  loadRequest(): void;
}

type Props = StateProps & DispatchProps;

class PeopleComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
      editingPerson: undefined,
      editingName: '',
    };

    this.updateName = this.updateName.bind(this);
    this.updateEditingPerson = this.updateEditingPerson.bind(this);
    this.updateEditingName = this.updateEditingName.bind(this);
  }

  componentDidMount() {
    const { loadRequest } = this.props;

    loadRequest();
  }

  updateName(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ name: event.target.value });
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
      createPersonRequest,
      editPersonRequest,
      removePersonRequest,
      removeExpenseRequest,
    } = this.props;
    const { name, editingPerson, editingName } = this.state;

    return (
      <div className="person-component">
        <h3>Participantes</h3>
        <p>
          {' '}
          Cadastre as pessoas que vão participar da
          divisão do churras.
        </p>

        <Row className="justify-content-md-center">
          <Col lg="8">
            <InputGroup>
              <InputGroup.Text id="inputGroup-sizing-lg">
                Nome
              </InputGroup.Text>
              <FormControl
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                onChange={this.updateName}
              />
            </InputGroup>
          </Col>

          <Col lg="1">
            <Button
              onClick={() => createPersonRequest({
                state: people,
                data: new Person(name),
              })}
              variant="outline-dark"
            >
              Salvar
            </Button>
            {' '}
          </Col>
        </Row>

        <hr />

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
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  people: state.people.data,
  expenses: state.expense.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PeopleComponent);
