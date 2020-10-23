import React from 'react';

const ThemeSettings = ({id}) => {
    return (
        <>
            <div className = "themeSettingsBackground" style={{display : id===2 ? "block" : "none"}}>
                <p>Choose Theme:</p>
            </div>
        </>
    )
}

export default ThemeSettings;