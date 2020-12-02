import {memo} from 'react';
import classes from './Spinner.module.css'

const Spinner = () => {
    return (
        <div className={classes.Spinner}/>
    );
};

export default memo(Spinner);