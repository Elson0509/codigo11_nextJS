import {memo} from 'react';
import classes from './CheckBoxGestao.module.css'

const CheckBoxGestao = (props) => {
//checked={props.checked}
    return (
        <div className={classes.Check_gestao}>
            <span className={`${classes.Switcher} ${classes.Switcher_1}`}>
                <input type="checkbox" onChange={props.clicked} />
                <label></label>
            </span>
        </div>
    );
};

export default memo(CheckBoxGestao);