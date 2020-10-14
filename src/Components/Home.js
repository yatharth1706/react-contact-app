import React from 'react';
import plus from './../Assets/plus.png';
import contactIcon from './../Assets/contact-books.png';
import AllContacts from './AllContacts';
import CreateForm from './CreateForm';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"; 

const Home = () => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <Router>
            <aside className="menu px-5 mt-3">
                <h3 className = "subtitle">
                    Manage
                </h3>
                <h1 className="title">
                    Contacts
                </h1>

                <p className = "menu-label">
                    General
                </p>
                <ul className = "menu-list">
                    <li><a href="/" className = "button is-link mb-3">Contacts</a></li>
                    <li><a href="/user" className="button is-link">Create Contact</a></li>
                </ul>
            </aside>
            <div className="container px-5 py-4">
            <Switch>
                <Route exact path="/">
                    <AllContacts/>
                </Route>
                <Route exact path="/user">
                    <CreateForm />
                </Route>
            </Switch>
            </div>
        </Router>
    )
}

export default Home;