import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Collapse, Nav, Navbar, NavbarBrand, NavItem} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDollarSign} from '@fortawesome/free-solid-svg-icons';

library.add(faDollarSign);


class Menu extends Component {
    render() {
        return (
            <Navbar color="dark text-light" light expand="md">
                <NavbarBrand>Expen<FontAwesomeIcon icon={faDollarSign}/>hare</NavbarBrand>
                <Collapse isOpen={true} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink to={this.props.url} exact className="nav-link text-light">Accueil</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={this.props.url + "/person"} className="nav-link text-light">Personnes</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={this.props.url + "/expense"} className="nav-link text-light">Dépenses</NavLink>
                        </NavItem>

                    </Nav>
                </Collapse>
            </Navbar>
        )
            ;
    }
}

export default Menu;