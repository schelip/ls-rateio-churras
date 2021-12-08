import React, { Component } from 'react';
import {
  Button,
  Form,
  Table,
} from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Person } from '../../models/person.model';
import { Actions, ApplicationState } from '../../store';
import '../../assets/style/table.css';

interface StateProps {
  people: Person[];
}

interface State {
  dates: Date[];
  date?: Date;
}

interface DispatchProps {
  editPersonRequest(data: { state: Person[], data: Person }): void;
  loadRequest(): void;
}

type Props = StateProps & DispatchProps;

class DatesTableComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      date: undefined,
      dates: [],
    };

    this.updateDate = this.updateDate.bind(this);
  }

  componentDidMount() {
    const { loadRequest } = this.props;
    loadRequest();
  }

  componentDidUpdate(prevProps: Props) {
    const { people } = this.props;
    const { date } = this.state;
    if (people !== prevProps.people) {
      const dates: Date[] = [];
      let currDateHasPeople = false;
      people.forEach((p) => {
        p.dates.forEach((personDate) => {
          if (!dates.find((stateDate) => stateDate.getDate() === personDate.getDate())) {
            dates.push(personDate);
          }
          if (personDate.getDate() === date?.getDate()) {
            currDateHasPeople = true;
          }
        });
      });
      dates.sort((a, b) => a.getDate() - b.getDate());
      this.updateDates(dates, date && currDateHasPeople ? date : dates[0]);
    }
  }

  handleDelete(person: Person) {
    const { people, editPersonRequest } = this.props;
    const { date } = this.state;
    const { dates } = person;

    const index = dates.findIndex((d) => d.getDate() === date?.getDate());
    if (index > -1) {
      dates.splice(index, 1);
    }

    editPersonRequest({
      state: people,
      data: { ...person, dates },
    });
  }

  updateDates(dates: Date[], date: Date) {
    this.setState({ dates, date });
  }

  updateDate(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ date: new Date(event.target.value) });
  }

  render() {
    const { people } = this.props;
    const { date, dates } = this.state;
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Nome</th>
            <th className="filter-col">
              {date && (
              <Form.Select onChange={this.updateDate}>
                {dates.map((d) => (
                  <option key={d.getDate()} value={d.toString()}>
                    {`${d.getUTCDate()}/${d.getUTCMonth()}/${d.getUTCFullYear()}`}
                  </option>
                ))}
              </Form.Select>
              )}
            </th>
            <th className="actions-col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {date
          && (
          <>
            {people
              .filter((p) => p.dates.find((d) => d.getDate() === date.getDate()))
              .map((person) => (
                <tr key={person.id}>
                  <td>{person.name}</td>
                  <td className="filter-col" />
                  <td className="actions-col">
                    <Button
                      variant="light"
                      onClick={() => this.handleDelete(person)}
                    >
                      <BsTrash />
                    </Button>
                  </td>
                </tr>
              ))}
          </>
          )}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  people: state.people.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DatesTableComponent);
