import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {Button, Container, Jumbotron} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDollarSign} from '@fortawesome/free-solid-svg-icons';

library.add(faDollarSign);

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { slug: "", sharegroup: null };
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ slug: event.target.value });
    }

    handleCreate(event) {
        event.preventDefault();
        fetch('http://localhost:8888/dcdev/javascript/expenshare/expenshare-back/public/sharegroup/', {
            method: 'POST',
            body: JSON.stringify({ slug: this.state.slug })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Nouveau groupe créé avec succès !');
            })
            .catch(err => alert('Erreur lors de la création du groupe'))
        ;
    }

    handleOpen(event) {
        event.preventDefault();
        fetch('http://localhost:8888/dcdev/javascript/expenshare/expenshare-back/public/sharegroup/' + this.state.slug)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ sharegroup: JSON.parse(data) });
            })
            .catch(err => alert('Ce groupe n\'existe pas !'))
        ;
    }

    render() {

        if (this.state.sharegroup) {
            return <Redirect to={'/group/' + this.state.sharegroup.slug}/>
        }

        return (
            <Container>
                <Jumbotron className="mt-5">
                    <h1 className="display-3">Bienvenue sur Expen<FontAwesomeIcon color="Dodgerblue" size="1x" icon={faDollarSign}/>hare !</h1>
                    <p className="lead ">Expenshare est une application simple et utile pour partager ses dépenses !</p>
                    <hr className="my-2" />
                    <p className="text-center">Connectez-vous à votre groupe ou créez en un pour commencer à utiliser Expenshare 😉</p>
                    <p className="lead text-center">
                        <input type="text" value={this.state.slug} onChange={e => this.handleChange(e)} placeholder="Group ID"/><br/>
                        <Button className="mr-3 mt-3" color="primary" onClick={e => this.handleOpen(e)}>Ouvrir</Button>
                        <Button className=" mt-3" color="success" onClick={e => this.handleCreate(e)}>Creér</Button>
                    </p>
                </Jumbotron>
            </Container>
        );
    }
}

export default Index;