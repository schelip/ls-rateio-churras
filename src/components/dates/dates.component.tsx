import React, { Component } from 'react';
import {
  Button,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { DatePicker, Localization } from 'react-widgets/cjs';
import { DateLocalizer } from 'react-widgets/IntlLocalizer';
import { Person } from '../../models/person.model';
import { Actions, ApplicationState } from '../../store';
import '../../assets/style/table.css';
import DatesTableComponent from './dates.table.component';
import { PeoplePayload } from '../../store/ducks/people/people.actions';
import 'react-widgets/styles.css';

interface StateProps {
  people: Person[];
}

interface State {
  startDate: Date;
  endDate: Date;
  personId: string;
}

interface DispatchProps {
  addDatePersonRequest(payload: PeoplePayload): void;
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
    const date = new Date(startDate);

    while (date.getTime() <= endDate.getTime()) {
      if (!dates.find((d) => d.getTime() === date.getTime())) dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    dates.sort();

    return {
      state: people,
      data: { ...person, dates },
    };
  }

  updateStartDate(startDate?: Date | null) {
    if (startDate) this.setState({ startDate });
  }

  updateEndDate(endDate?: Date | null) {
    if (endDate) this.setState({ endDate });
  }

  updatePerson(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ personId: event.target.value });
  }

  render() {
    const {
      people, addDatePersonRequest,
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
              <option value="null">Selecione a Pessoa</option>
              {people.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Localization date={new DateLocalizer({ culture: 'pt-BR', firstOfWeek: 0 })}>
            <Col lg="4">
              <DatePicker placeholder="Data inicial" onChange={this.updateStartDate} />
              <DatePicker placeholder="Data final" onChange={this.updateEndDate} />
            </Col>
          </Localization>
          <Col lg="1">
            <Button
              variant="outline-dark"
              onClick={() => addDatePersonRequest(this.handleDataRequest())}
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
