import React from 'react';
import congrats from '../Assets/congrats.png';

const UpdatedModal = ({modalShow}) => {
    return (
        <div className = "updateModalBackground" style={{visibility : modalShow ? "visible" : "hidden"}}>
            <div className = "updatedodal">
                <div className = "deleteImage">
                    <img alt="" src={congrats}/>
                </div>
                <div className = "message">
                    <p>Contact is updated successfully</p>
                    <div className = "buttons">
                        <a href = "/" ><button className = "btn btn-primary">Go back to all Contacts</button></a>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default UpdatedModal;