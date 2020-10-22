import React from 'react';
import AllContacts from './AllContacts';
import CreateForm from './CreateForm';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom"; 
import UpdateUser from './UpdateUser';
import Groups from './Groups';
import CreateGroup from './CreateGroup';
import UpdateGroup from './UpdateGroup';

const Home = () => {
    

    return (
        <Router>
            <aside className="menu px-5 mt-3" style = {{ borderRight: "1px solid gainsboro"}}>
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
                    <li><a href="/" className="button is-danger">Contacts</a></li>
                    <li><a href="/groups" className="btn btn-light">Groups</a></li>
                    <li><a href="/groups" className="btn btn-light">Import</a></li>
                    <li><a href="/groups" className="btn btn-light">Export</a></li>
                    <li><a href="/groups" className="btn btn-light">Settings</a></li>
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
                <Route exact path="/groups"> 
                    <Groups />
                </Route>
                <Route exact path = "/user/:id" component= {UpdateUser} />
                <Route exact path="/groups/create">
                    <CreateGroup />
                </Route>
                <Route exact path="/groups/update/:groupName" component = {UpdateGroup}/>
            </Switch>
            </div>
        </Router>
    )
}

export default Home;