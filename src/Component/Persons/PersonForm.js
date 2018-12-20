import React, {Component} from 'react';
import {Form, Button, FormGroup, Input, Container, InputGroup} from "reactstrap";


class PersonForm extends Component {

    constructor(props) {
        super(props);
        this.state = { firstname: "", lastname: "", person: null};
    }

    handleChangeF(event) {
        event.preventDefault();
        this.setState({ firstname: event.target.value});
    }

    handleChangeL(event) {
        event.preventDefault();
        this.setState({ lastname: event.target.value });
    }

    handleCreate(event) {
        event.preventDefault();
        fetch('http://localhost:8888/dcdev/javascript/expenshare/expenshare-back/public/person/', {
            method: 'POST',
            body: JSON.stringify({ firstname: this.state.firstname, lastname: this.state.lastname, slug: this.props.slug })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Nouvelle personne crée avec succès !');
            })
            .catch(err => alert('Erreur lors de la création de la personne'))
        ;
    }
    render() {
        return (
            <div>
                <Container className="text-center mt-5 pt-4">
                    <h3 className="p-3 text-dark">Ajouter une personne au groupe {this.state.slug}</h3>
                    <Form className="m-0 m-auto">
                        <FormGroup>
                            <InputGroup>
                                <Input className="form-control form-control-lg col-md-6 m-0 m-auto text-center" type="text" value={this.state.firstname} onChange={e => this.handleChangeF(e)} placeholder="Prénom" />
                            </InputGroup>
                            <InputGroup>
                                <Input className="form-control form-control-lg col-md-6 m-0 m-auto text-center" type="text" value={this.state.lastname} onChange={e => this.handleChangeL(e)} placeholder="Nom" />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="text-center">
                            <Button onClick={e => this.handleCreate(e)} className="m-2 px-4 btn-lg btn-info">Ajouter</Button>
                        </FormGroup>
                    </Form>
                </Container>

            </div>
        );
    }
}

export default PersonForm;