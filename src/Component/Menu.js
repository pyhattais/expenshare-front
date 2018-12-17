import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Collapse, Nav, Navbar, NavbarBrand, NavItem} from "reactstrap";

class Menu extends Component {
    render() {
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand>Expenshare</NavbarBrand>
                <Collapse isOpen={true} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink to="/" exact className="nav-link">Accueil</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/Person" className="nav-link">Personnes</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/Expense" className="nav-link">Dépenses</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
            ;
    }
}

export default Menu;