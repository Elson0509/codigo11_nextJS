import React from 'react';
import classes from './AnimatedHamburguerButton.module.css'

const AnimatedHamburguerButton = (props) => {
    return (
        <span>
            <input id={props.nameid ? props.nameid : "menu-hamburguer"} className={classes.Menu_hamburguer} type="checkbox" checked={props.checked} />
            <label htmlFor={props.nameid ? props.nameid : "menu-hamburguer"}>
                <div className={classes.Menu}  onClick={props.clicked}>
                    <span className={classes.Hamburguer}></span>
                </div>
            </label>
        </span>
    );
};

export default AnimatedHamburguerButton;