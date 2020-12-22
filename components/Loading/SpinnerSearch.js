import {memo} from 'react';
import classes from './Spinner.module.css'

const SpinnerSearch = () => {
    return (
        <div className={classes.Spinner_search}/>
    );
};

export default memo(SpinnerSearch);