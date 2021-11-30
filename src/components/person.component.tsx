/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from "react";
import {
    Button,
    FormControl,
    InputGroup,
    Row,
    Table,
    Col,
} from "react-bootstrap";
import { BsTrash, BsPencil } from "react-icons/bs";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Person } from "../models/person.model";

import { ApplicationState, Actions } from "../store";

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

class PersonComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            name: "",
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
        const { people, createPersonRequest } = this.props;
        const { name } = this.state;

        return (
            <div className="person-component">
                <h3>Cadastre uma pessoa</h3>
                <p>
                    {" "}
                    Aqui você vai cadastrar uma pessoa que vai participar da
                    divisão do churras.
                </p>

                <Row className="justify-content-md-center">
                    <Col lg="5">
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
                            onClick={() =>
                                createPersonRequest({
                                    state: people,
                                    data: new Person(name),
                                })
                            }
                            variant="outline-dark"
                        >
                            Salvar
                        </Button>{" "}
                    </Col>
                </Row>
                <hr />
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((person) => (
                            <tr key={person.id}>
                                <td>{person.name}</td>
                                <td>
                                    <BsPencil />
                                    <BsTrash />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    people: state.person.data,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PersonComponent);
