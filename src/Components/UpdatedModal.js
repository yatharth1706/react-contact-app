import React from 'react';
import congrats from '../Assets/congrats.png';

const UpdatedModal = ({modalShow, isGroup}) => {
    return (
        <div className = "updateModalBackground" style={{visibility : modalShow ? "visible" : "hidden"}}>
            <div className = "updatedodal">
                <div className = "deleteImage">
                    <img alt="" src={congrats}/>
                </div>
                <div className = "message">
                    <p>{isGroup === true ? "Group is updated successfully." : "Contact is updated successfully"}</p>
                    <div className = "buttons">
                    <a href = {isGroup === true ? "/groups" : "/"} ><button className = "btn btn-primary">{isGroup === true ? "Go back to All Groups" : "Go back to all Contacts"}</button></a>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default UpdatedModal;