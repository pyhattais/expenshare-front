import React, {Component} from 'react';
import {Form, Button, FormGroup, Input, Container, InputGroup} from "reactstrap";


class ExpenseForm extends Component {

    constructor(props) {
        super(props);
        this.state = { firstname: "", lastmane: "", person: [], category: [], cat: "", pers: "" };
    }

    handleChangeT(event) {
        event.preventDefault();
        this.setState({ title: event.target.value});
    }

    handleChangeA(event) {
        event.preventDefault();
        this.setState({ amount: event.target.value});
    }

    handleChangeC(event) {
        event.preventDefault();
        this.setState({ cat: event.target.value});
    }

    handleChangeD(event) {
        event.preventDefault();
        this.setState({ createdat: event.target.value});
    }

    handleChangeP(event) {
        event.preventDefault();
        this.setState({ pers: event.target.value});
    }

    handleCreate(event) {
        event.preventDefault();
        fetch('http://localhost:8888/dcdev/javascript/expenshare/expenshare-back/public/expense/', {
            method: 'POST',
            body: JSON.stringify({ title: this.state.title, amount: this.state.amount, category: this.state.cat, createdat: this.state.createdat, person: this.state.pers })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Nouvelle dépense crée avec succès !');
            })
            .catch(err => alert('Erreur lors de la création de la dépense'))
        ;
    }

    componentDidMount() {
        fetch('http://localhost:8888/dcdev/javascript/expenshare/expenshare-back/public/person/group/' + this.props.slug)
            .then(response => response.json())
            .then(data => this.setState({ person: data }));

        fetch('http://localhost:8888/dcdev/javascript/expenshare/expenshare-back/public/category/', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => this.setState({ category: data }));
    }

    render() {
        const person = this.state.person.map(p => <option key={p.id} value={p.id}>{p.firstname + ' ' + p.lastname}</option>);

        const category = this.state.category.map(c => <option key={c.id} value={c.id}>{c.label}</option>);

        return (
            <div>
                <Container className="text-center mt-5 pt-4">
                    <h3 className="p-3 text-dark">Ajouter une dépense au groupe {this.state.slug}</h3>
                    <Form className="m-0 m-auto">
                        <FormGroup>
                            {console.log(this.state)}
                            <InputGroup>
                                <Input className="form-control form-control-lg col-md-6 m-0 m-auto text-center" type="text" value={this.state.title} onChange={e => this.handleChangeT(e)} placeholder="Titre" />
                            </InputGroup>
                            <InputGroup>
                                <Input className="form-control form-control-lg col-md-6 m-0 m-auto text-center" type="number" value={this.state.amount} onChange={e => this.handleChangeA(e)} placeholder="Montant" />
                            </InputGroup>
                            <InputGroup>
                                <Input className="form-control form-control-lg col-md-6 m-0 m-auto text-center" type="select" onChange={e => this.handleChangeC(e)}>
                                    <option value="0">Choisissez votre catégorie</option>
                                    {category}
                                </Input>
                            </InputGroup>
                            <InputGroup>
                                <Input className="form-control form-control-lg col-md-6 m-0 m-auto text-center" type="date" value={this.state.createdat} onChange={e => this.handleChangeD(e)} />
                            </InputGroup>
                            <InputGroup>
                                <Input className="form-control form-control-lg col-md-6 m-0 m-auto text-center" type="select" onChange={e => this.handleChangeP(e)}>
                                    <option value="0">Choisissez votre personnes</option>
                                    {person}
                                </Input>
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

export default ExpenseForm;