import React from "react";

export default function SwitchTheme(props) {

    const handleThemeChange = (value) => {
        if (value) {
            props.setNavTheme("dark");
            props.setBodyTheme("light");
        }
        else {
            props.setNavTheme("light");
            props.setBodyTheme("dark");
        }
    }

    return (
        <label className="switch">
            <input type="checkbox" onChange={(event) => handleThemeChange(event.target.checked)}/>
            <span className="slider round"></span>
        </label>
    );
}