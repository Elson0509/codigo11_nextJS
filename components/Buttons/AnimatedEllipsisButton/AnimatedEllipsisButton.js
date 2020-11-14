import React from 'react';
import classes from './AnimatedEllipsisButton.module.css'

const AnimatedEllipsisButton = (props) => {
    return (
        <span>
            <input id={props.nameid ? props.nameid : "menu-ellipsis"} className={classes.Menu_ellipsis} type="checkbox" />
            <label htmlFor={props.nameid ? props.nameid : "menu-ellipsis"}>
                <div className={classes.Menu}  onClick={props.clicked}>
                    <span className={classes.Ellipsis}></span>
                </div>
            </label>
        </span>
    );
};

export default AnimatedEllipsisButton;