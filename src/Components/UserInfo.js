import React, { useState } from 'react';
import defaultPic from '../Assets/defaultPic.png';

function UserInfoModal({show, onHide, user}) {
    const [image, setImage] = useState(defaultPic);

    return (
        <div style = {{display : show ? "block" : "none"}} className = "userModal">
            <div className = "close-section">
                <button className="delete" onClick = {onHide}></button>
            </div>
            <div className = "user-section container text-center">
                <div className="text-center">
                    <img className = "mb-4 userProfilePic" src = {user ? user['photograph'] ? user['photograph'] : image : ""} alt=""></img>
                </div>
                <p><span className="userLabels">Name : </span>{user ? user['Name'] : ""}</p>
                <p><span className="userLabels">ContactNo : </span>{user ? user['ContactNo'] : ""}</p>
                <p><span className="userLabels">Email : </span>{user ? user['Email'] : ""}</p>
                <p><span className="userLabels">HomeAddress : </span>{user ? user['HomeAddress'] : ""}</p>
                <p><span className="userLabels">OfficeAddress : </span>{user ? user['OfficeAddress'] : ""}</p>
                <p><span className="userLabels">Relationship with me : </span>{user ? user['Relationshipwithme'] : ""}</p>
                <p><span className="userLabels">Facebook : </span>{user ? user['Facebook'] : ""}</p>
                <p><span className="userLabels">Linkedin : </span>{user ? user['Linkedin'] : ""}</p>
                <p><span className="userLabels">Instagram : </span>{user ? user['Instagram'] : ""}</p>
                <p><span className="userLabels">Birthday : </span>{user ? user['Birthday'] : ""}</p>
                <p><span className="userLabels">Anniversary : </span>{user ? user['Anniversary'] : ""}</p>
            </div>
      </div>
    );
  }

  export default UserInfoModal;