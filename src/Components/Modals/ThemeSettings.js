import React,{useState, useEffect} from 'react';

const ThemeSettings = ({id}) => {
    const [theme, setTheme] = useState('');

    useEffect(() => {
        let themeInStorage = window.localStorage.getItem("theme");
        if(!themeInStorage){
            window.localStorage.setItem("theme", "Light");
        }
        setTheme(themeInStorage);
    }, [])

    const validate = (e) => {
        e.preventDefault();
        let temp = document.getElementById("themes").value;
        window.localStorage.setItem("theme", temp);
        window.location.reload();
    }

    return (
        <>
            <div className = "themeSettingsBackground" style={{display : id===2 ? "block" : "none", textAlign: "center"}}>
                <p className = "mt-5 mb-2">Choose Theme:</p>
                <div class="select is-rounded is-primary">
                    <select id="themes">
                        <option selected = {theme === "Light"} value="Light">Light Theme</option>
                        <option selected={theme === "Dark"} value="Dark">Dark Theme</option>
                    </select>
                </div>

                <div classname = "text-center" style={{display : "flex", justifyContent : "center", marginTop : "10px"}}>
                    <button className = "btn btn-sm btn-dark" style={{width: "120px"}} onClick = {validate}>Save</button>
                </div>
            </div>
        </>
    )
}

export default ThemeSettings;