import React, {Component} from 'react';
import Menu from "./Menu";
import {Container} from "reactstrap";
import {Route} from "react-router-dom";
import Person from "./Persons/Person";
import Expense from "./Expenses/Expense";
import Dashboard from "./Dashboard/Dashboard";


class Group extends Component {
    render() {
        return (
            <Container>
            <Menu url={this.props.match.url}/>
                <h1>Groupe : {this.props.match.params.slug}</h1>
                <Route exact path={this.props.match.url} component={Dashboard} />
                <Route path={this.props.match.url + "/person"} render={props => <Person {...props} slug={this.props.match.params.slug} />} />
                <Route path={this.props.match.url + "/expense"} render={props => <Expense {...props} slug={this.props.match.params.slug} />} />
            </Container>
        );
    }
}

export default Group;