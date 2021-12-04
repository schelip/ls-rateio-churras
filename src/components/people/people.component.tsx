import React, { Component } from 'react';
import {
  Button,
  FormControl,
  InputGroup,
  Row,
  Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Person } from '../../models/person.model';
import '../../assets/style/table.css';
import { ApplicationState, Actions } from '../../store';
import PeopleTableComponent from './people.table.component';

interface StateProps {
  people: Person[];
}

interface State {
  name: string;
}

interface DispatchProps {
  createPersonRequest(data: { state: Person[]; data: Person }): void;
  loadRequest(): void;
}

type Props = StateProps & DispatchProps;

class PeopleComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
    };

    this.updateName = this.updateName.bind(this);
  }

  componentDidMount() {
    const { loadRequest } = this.props;

    loadRequest();
  }

  updateName(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ name: event.target.value });
  }

  render() {
    const {
      people,
      createPersonRequest,
    } = this.props;
    const { name } = this.state;

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

        <PeopleTableComponent />
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  people: state.people.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PeopleComponent);
