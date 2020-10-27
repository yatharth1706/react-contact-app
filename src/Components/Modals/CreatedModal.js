import React from 'react';
import congrats from '../../Assets/congrats.png';

const CreatedModal = ({showModal, isGroup}) => {
    return (
        <div style={{visibility : showModal ? "visible" : "hidden"}} className = "createModalBackground">
            <div className = "createdModal">
                <div className = "deleteImage">
                    <img alt="" src={congrats}/>
                </div>
                <div className = "message">
                    <p>{isGroup  === true ? "Group is created successfully." : "Contact is created successfully." }</p>
                    <div className="buttons">
                        <a href = {isGroup  === true ? "/groups" : "/"}><button className = "btn btn-primary">{isGroup  === true ? "Go to All Groups" : "Go to All Contacts"}</button></a>
                        <a href = {isGroup === true ? "/groups/create" : "/user"}><button className = "btn btn-dark">{isGroup  === true ? "Create More Groups" : "Create More Contacts"}</button></a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreatedModal;