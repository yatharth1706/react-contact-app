import React, { useState } from 'react';
import NotificationSettings from './NotificationSettings';
import ThemeSettings from './ThemeSettings';

const Settings = ({showSettings, hideSettings}) => {
    const [ID, setID] = useState(1);

    return(
        <div className = "settingsBackground" style={{display : showSettings===true ? "block" : "none"}}>
            <div className = "close-section">
                <button className="delete" onClick = {hideSettings}></button>
            </div>
            <div style={{display : "flex"}}>
                <aside className="menu" style={{borderRight : "1px solid gainsboro"}}>
                    <p className="menu-label">
                        Settings
                    </p>
                    <ul className="menu-list">
                        <li><a onClick = {() => setID(1)}>Notification Settings</a></li>
                        <li><a onClick = {() => setID(2)}>Theme Settings</a></li>
                    </ul>
                </aside>
                <div className = "container" style={{width: "100%"}}>
                    <NotificationSettings id={ID}/>
                    <ThemeSettings id = {ID}/>
                </div>
            </div>
        </div>
    )
}

export default Settings;