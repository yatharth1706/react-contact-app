import React from 'react';

const SocialMedia = ({ handleInput }) => {
    

    return (
        <div className = "SocialMediaDetails">
            <div className="panel">
                <label>Instagram</label>
                <input type = "text" className = "form-control" onChange = {handleInput("Instagram")}/>
            </div>
            <div className="panel">
                <label>Linkedin</label>
                <input type = "text" className = "form-control" onChange = {handleInput("Linkedin")}/>
            </div>
            <div className="panel">
                <label>Facebook</label>
                <input type = "text" className = "form-control" onChange = {handleInput("Facebook")}/>
            </div>
          </div>
    )
}

export default SocialMedia;