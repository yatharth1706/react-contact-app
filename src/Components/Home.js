import React from 'react';
import AllContacts from './AllContacts';
import CreateForm from './CreateForm';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom"; 
import UpdateUser from './UpdateUser';
import FirebaseContext from '../Config/firebaseConfig';

const Home = () => {
    

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
                <Route exact path = "/user/:id" component= {UpdateUser} />
            </Switch>
            </div>
        </Router>
    )
}

export default Home;