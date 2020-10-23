import React, { useState } from 'react';
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
import AllImports from './AllImports';
import Settings from './Settings';
import Notifications from './Notifications';

const Home = () => {
    const [showImport, setShowImport] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

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
                    <li><a className="btn btn-light" onClick = {() => setShowImport(true)}>View Imports</a></li>
                    <li><a className="btn btn-light" onClick = {() => setShowNotifications(true)}>Notifications</a></li>
                    <li><a className="btn btn-light" onClick = {() => setShowSettings(true)}>Settings</a></li>
                </ul>
            </aside>
            <AllImports showImports = {showImport} hideImports = {() => setShowImport(false)}/>
            <Settings showSettings = {showSettings} hideSettings = {() => {setShowSettings(false); window.location.reload(); }} />
            <Notifications showNotifications = {showNotifications} hideNotifications = {() => setShowNotifications(false)}/>
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