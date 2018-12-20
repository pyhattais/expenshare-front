import React, {Component} from 'react';
import {Button, Table} from "reactstrap";
import {NavLink, Route} from "react-router-dom";
import PersonForm from "./PersonForm";

class Person extends Component {

    constructor(props) {
        super(props);
        this.state = {person: [], personid: ""};
    }

    handleNewPerson(person) {
        let persons = this.state.person;
        persons.push(person);
        this.setState({ person: persons });
    }

    handleDeletePerson(e, id) {
        e.preventDefault(e);
        let persons = this.state.person;
        persons = persons.filter(person => person.id !== id);
        this.setState({person: persons});

        fetch('http://localhost:8888/dcdev/javascript/expenshare/expenshare-back/public/person/', {
            method: 'DELETE',
            body: JSON.stringify({person: id})
        })
            .then(response => response.json())
            .then(data => id, alert('Personne supprimée !'))
            .catch(err => alert("Erreur de suppression !"))
        ;


    }

    componentDidMount() {
        fetch('http://localhost:8888/dcdev/javascript/expenshare/expenshare-back/public/person/group/' + this.props.slug)
            .then(response => response.json())
            .then(data => this.setState({person: data}))
        ;
    }


    render() {

        let person = <tbody>
        <tr>
            <td>Chargement en cours</td>
        </tr>
        </tbody>;

        if (this.state.person.length > 0) {
            person = this.state.person.map(person =>

                <tbody key={person.id}>
                <tr>
                    <th scope="row">{person.id}</th>
                    <td>{person.firstname + ' ' + person.lastname}</td>
                    <td>{person.expenses.length}</td>
                    <td>{person.expenses.reduce((accumulator, expense) => accumulator + parseFloat(expense.amount), 0)} €</td>
                    <td><Button onClick={e => this.handleDeletePerson(e, person.id)} outline color="danger"
                                size="sm">Supprimer</Button>
                        <Button className="ml-2" outline color="info"
                                size="sm">Modifier</Button>
                    </td>
                </tr>
                </tbody>
            );
        }

        return (
            <React.Fragment>
                <h1>Personnes</h1>

                <NavLink to={this.props.match.url + "/add"} className="m-2 px-4 btn-lg btn-info">Ajouter une
                    personne</NavLink>
                <Route path={this.props.match.url + "/add"}
                       render={props => <PersonForm {...props} callBack={this.handleNewPerson.bind(this)} slug={this.props.slug}/>}/>

                <Table size="sm" className="mt-4" hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Dépenses</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    {person}
                </Table>
            </React.Fragment>
        );
    }
}

export default Person;