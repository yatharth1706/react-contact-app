import React from 'react';
import congrats from '../Assets/congrats.png';

const CreatedModal = ({showModal}) => {
    return (
        <div style={{visibility : showModal ? "visible" : "hidden"}} className = "createModalBackground">
            <div className = "createdModal">
                <div className = "deleteImage">
                    <img alt="" src={congrats}/>
                </div>
                <div className = "message">
                    <p>Contact is created Successfully.</p>
                    <div className="buttons">
                        <a href = "/"><button className = "btn btn-primary">Go to All Contacts</button></a>
                        <a href = "/user"><button className = "btn btn-dark">Create More Contacts</button></a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreatedModal;