import React, { useEffect, useState } from 'react';
import AllContacts from '../Contacts/AllContacts';
import CreateForm from '../Contacts/CreateForm';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom"; 
import UpdateUser from '../Contacts/UpdateUser';
import Groups from '../Groups/Groups';
import CreateGroup from '../Groups/CreateGroup';
import UpdateGroup from '../Groups/UpdateGroup';
import AllImports from '../Modals/AllImports';
import Settings from '../Modals/Settings';
import Notifications from '../Modals/Notifications';

const Home = () => {
    const [showImport, setShowImport] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [theme, setTheme] = useState('');

    useEffect(() => {
        let temp = window.localStorage.getItem("theme");
        setTheme(temp);
    },[])

    return (
        <Router>
            <aside className="menu px-5 mt-3 darkMenu" style = {{ width : "270px",borderRight: "1px solid gainsboro", color: theme === "Light" ? "Black" : "White"}}>
                <h3 className = "subtitle" style={{color : theme === "Dark" ? "White" : "Black"}}>
                    Manage
                </h3>
                <h1 className="title" style={{color : theme === "Dark" ? "White" : "Black"}}>
                    Contacts
                </h1>

                <p className = "menu-label" style={{color : theme === "Dark" ? "White" : "Black"}}>
                    General
                </p>
                <ul className = "menu-list">
                    <li><a href="/" className="button is-danger">Contacts</a></li>
                    <li><a href="/groups" className={theme === "Dark" ? "button is-dark" : "button" }>Groups</a></li>
                    <li><a className={theme === "Dark" ? "button is-dark" : "button" } onClick = {() => { setShowImport(true); setShowSettings(false); setShowNotifications(false); }}>View Imports</a></li>
                    <li><a className={theme === "Dark" ? "button is-dark" : "button" } onClick = {() => {setShowNotifications(true); setShowImport(false); setShowSettings(false);}}>Notifications</a></li>
                    <li><a className={theme === "Dark" ? "button is-dark" : "button" } onClick = {() => {setShowSettings(true); setShowNotifications(false); setShowImport(false);}}>Settings</a></li>
                </ul>
            </aside>
            <AllImports showImports = {showImport} hideImports = {() => {setShowImport(false);}}/>
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