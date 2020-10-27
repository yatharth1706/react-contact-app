import React , {useEffect, useState}from 'react';

const SocialMedia = ({ handleInput }) => {
    const [theme, setTheme] = useState('');

    useEffect(() => {
        setTheme(window.localStorage.getItem("theme"));
    },[])

    return (
        <div className = "SocialMediaDetails">
            <div className="panel">
                <label style={{color: theme === "Dark" ? "White" : "Black"}}>Instagram</label>
                <input type = "text" className = "form-control" onChange = {handleInput("Instagram")}/>
            </div>
            <div className="panel">
                <label style={{color: theme === "Dark" ? "White" : "Black"}}>Linkedin</label>
                <input type = "text" className = "form-control" onChange = {handleInput("Linkedin")}/>
            </div>
            <div className="panel">
                <label style={{color: theme === "Dark" ? "White" : "Black"}}>Facebook</label>
                <input type = "text" className = "form-control" onChange = {handleInput("Facebook")}/>
            </div>
          </div>
    )
}

export default SocialMedia;