import React, { useState } from 'react';
import { useEffect } from 'react';

const Events = ({ handleInput }) => {
   const [theme, setTheme] = useState('');

   useEffect(() => {
    setTheme(window.localStorage.getItem("theme"));
   },[])

    return (
        <div className = "EventDetails">
            <div className="panel">
                <label style={{color: theme === "Dark" ? "White" : "Black"}}>Birthday</label>
                <input type = "date" className = "form-control" onChange = {handleInput("Birthday")}/>
            </div>
            <div className="panel">
                <label style={{color: theme === "Dark" ? "White" : "Black"}}>Anniversary</label>
                <input type = "date" className = "form-control" onChange = {handleInput("Anniversary")}/>
            </div>
        </div>
    )
}

export default Events;