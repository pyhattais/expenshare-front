import React, {Component} from 'react';
import {Table} from "reactstrap";

class Expense extends Component {

    constructor(props) {
        super(props);
        this.state = {expense: []}
    }

    componentDidMount() {
        fetch('http://localhost:8888/dcdev/javascript/expenshare/expenshare-back/public/expense', {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({expense: data}))
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
                        <td>{expense.amount}</td>
                        <td>{expense.title}</td>
                        <td>{expense.category.label}</td>
                        <td>{expense.person.shareGroup.slug}</td>
                    </tr>
                    </tbody>
            );
        }

        return (
            <React.Fragment>
                <h1>Dépenses</h1>
                <Table hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Dépense</th>
                        <th>Description</th>
                        <th>Catégorie</th>
                        <th>Groupe</th>
                    </tr>
                    </thead>
                    {expense}
                </Table>

            </React.Fragment>

        );
    }
}

export default Expense;