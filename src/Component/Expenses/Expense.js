import React, {Component} from 'react';
import {Button, Table} from "reactstrap";
import {NavLink, Route} from "react-router-dom";
import moment from "moment";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faHotel, faUtensils, faRunning, faVideo, faWineBottle } from '@fortawesome/free-solid-svg-icons';
import ExpenseForm from "./ExpenseForm";

library.add(faCar, faHotel, faUtensils, faRunning, faVideo, faWineBottle);



class Expense extends Component {

    constructor(props) {
        super(props);
        this.state = {expense: [], expenseid: ""}
    }

    handleDeleteExpense(e, id) {
        e.preventDefault(e);
        let expenses = this.state.expense;
        expenses = expenses.filter(expense => expense.id !== id);
        this.setState({expense: expenses});

        fetch('http://localhost:8888/dcdev/javascript/expenshare/expenshare-back/public/expense/', {
            method: 'DELETE',
            body: JSON.stringify({expense: id})
        })
            .then(response => response.json())
            .then(data => id, alert('Dépense supprimée !'))
            .catch(err => alert("Erreur de suppression !"))
        ;


    }

    componentDidMount() {
        fetch('http://localhost:8888/dcdev/javascript/expenshare/expenshare-back/public/expense/group/' + this.props.slug)
            .then(response => response.json())
            .then(data => this.setState({ expense: data }))
        ;
    }



    render() {

        let expense = <tbody><tr><td>Chargement en cours</td></tr></tbody>;

        if (this.state.expense.length > 0) {
            expense = this.state.expense.map(expense =>

                    <tbody key={expense.id}>
                    <tr>
                        <th scope="row">{expense.id}</th>
                        <td>{expense.person.firstname + ' ' + expense.person.lastname}</td>
                        <td>{parseFloat(expense.amount)} €</td>
                        <td>{expense.title}</td>
                        <td>{expense.category.label}</td>
                        <td><FontAwesomeIcon icon={expense.category.icon} /></td>
                        <td>{moment(expense.createdAt).format("D-MM-YYYY")}</td>
                        <td><Button onClick={e => this.handleDeleteExpense(e, expense.id)} outline color="danger" size="sm">Supprimer</Button>
                            <Button className="ml-2" outline color="info"
                                    size="sm">Modifier</Button>
                        </td>
                    </tr>
                    </tbody>
            );
        }

        return (
            <React.Fragment>
                <h1>Dépenses</h1>

                <NavLink to={this.props.match.url + '/add'} className="m-2 px-4 btn-lg btn-info">Ajouter une dépense</NavLink>
                <Route path={this.props.match.url + '/add'} render={props => <ExpenseForm {...props} slug={this.props.slug}/>}/>

                <Table size="sm" className="mt-4" hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Dépense</th>
                        <th>Description</th>
                        <th>Catégorie</th>
                        <th>Icone</th>
                        <th>Date de création</th>
                        <th>Actions</th>

                    </tr>
                    </thead>
                    {expense}
                </Table>

            </React.Fragment>

        );
    }
}

export default Expense;