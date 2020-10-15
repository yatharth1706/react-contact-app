import React from 'react';

const Events = ({ handleInput }) => {
   

    return (
        <div className = "EventDetails">
            <div className="panel">
                <label>Birthday</label>
                <input type = "date" className = "form-control" onChange = {handleInput("Birthday")}/>
            </div>
            <div className="panel">
                <label>Anniversary</label>
                <input type = "date" className = "form-control" onChange = {handleInput("Anniversary")}/>
            </div>
        </div>
    )
}

export default Events;