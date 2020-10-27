import Axios from 'axios';
import React, { useState } from 'react';

const OptionsModal = ({hideModal, showModal, id}) => {
    
    const [userModal, setUserModal] = useState([]);

    

    
    const setModal = (val, index) => {

    }

    return(
        <div className = "optionsModalBackground" style={{display : showModal === true ? 'block' : 'none'}}>
            
            <div className = "options">
                <div className = "close-section">
                    <button className="delete" onClick = {hideModal}></button>
                </div>
                <div style={{display : "flex", flexDirection : "column", padding : "30px"}}>
                    <span className = "mb-2" >View Contacts</span>
                    <span className = "mb-2">Delete Group</span>
                    <span className = "mb-2">Update Group</span>
                </div>
            </div>

            
        </div>
    )
}

export default OptionsModal;