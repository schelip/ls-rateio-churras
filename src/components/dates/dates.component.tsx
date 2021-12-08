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
import DatesTableComponent from './dates.table.component';

interface StateProps {
  people: Person[];
}

interface State {
  startDate: Date;
  endDate: Date;
  personId: string;
}

interface DispatchProps {
  editPersonRequest(data: { state: Person[], data: Person }): void;
  loadRequest(): void;
}

type Props = StateProps & DispatchProps;

class DatesComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      personId: '',
    };

    this.updateStartDate = this.updateStartDate.bind(this);
    this.updateEndDate = this.updateEndDate.bind(this);
    this.updatePerson = this.updatePerson.bind(this);
  }

  componentDidMount() {
    const { loadRequest } = this.props;

    loadRequest();
  }

  handleDataRequest() {
    const { people } = this.props;
    const { startDate, endDate, personId } = this.state;

    const person = people.find((p) => p.id === personId);

    if (!person) {
      throw Error();
    }

    const { dates } = person;
    const date = startDate;

    while (date.getDate() <= endDate.getDate()) {
      if (!dates.find((d) => d.getDate() === date.getDate())) dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    dates.sort();

    return {
      state: people,
      data: { ...person, dates },
    };
  }

  updateStartDate(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ startDate: new Date(event.target.value) });
  }

  updateEndDate(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ endDate: new Date(event.target.value) });
  }

  updatePerson(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ personId: event.target.value });
  }

  render() {
    const {
      people, editPersonRequest,
    } = this.props;
    return (
      <div className="expense-component">
        <h3>Datas</h3>
        <p>
          Cadastre quem participou em qual dia do rolê para que sejam cobrados corretamente.
        </p>
        <Row className="justify-content-md-center">
          <Col lg="3">
            <Form.Select onChange={this.updatePerson}>
              <option value="null">Pessoa</option>
              {people.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col lg="7">
            <InputGroup>
              <InputGroup.Text>Início</InputGroup.Text>
              <FormControl
                aria-label="Date Range"
                type="date"
                placeholder="Datas de participação"
                onChange={this.updateStartDate}
              />
              <InputGroup.Text>Fim</InputGroup.Text>
              <FormControl
                aria-label="Date Range"
                type="date"
                placeholder="Datas de participação"
                onChange={this.updateEndDate}
              />
            </InputGroup>
          </Col>
          <Col lg="1">
            <Button
              variant="outline-dark"
              onClick={() => editPersonRequest(this.handleDataRequest())}
            >
              Salvar
            </Button>
          </Col>
        </Row>
        <hr />
        <DatesTableComponent />
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  people: state.people.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DatesComponent);
