import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Container} from "reactstrap";
import Menu from "./Component/Menu";
import {Route} from "react-router-dom";
import ShareGroup from "./Component/ShareGroup";
import Person from "./Component/Person";
import Expense from "./Component/Expense";

class App extends Component {
    render() {
        return (
            <Container>
                <Menu/>
                <Route exact path="/" component={ShareGroup}/>
                <Route path="/person" component={Person}/>
                <Route path="/expense" component={Expense}/>

            </Container>
        );
    }
}

export default App;
