import React from 'react';
import trash from './../Assets/trash.png';

const DeleteGroupConfirmation = ({deleteModalShow, hideDelete, confirmDelete}) => {
    return (
        <div className = "deleteModalBackground" style={{visibility : deleteModalShow ? "visible" : "hidden"}}>
            <div  className = "deleteModal">
                <div className = "deleteImage">
                    <img alt="" src={trash}/>
                </div>
                <div className = "message">
                    <span>Are you sure you want to delete this Group ?</span>
                    <div className = "buttons"><button className = "btn btn-primary" onClick = {confirmDelete}>Yes</button>
                    <button className = "btn btn-dark" onClick = {hideDelete}>No</button></div>
                </div>
            </div>
        </div>
        
    )
}

export default DeleteGroupConfirmation;