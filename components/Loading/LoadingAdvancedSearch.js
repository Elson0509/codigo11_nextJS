import {memo} from 'react';
import classes from './LoadingAdvancedSearch.module.css'

const LoadingAdvancedSearch = () => {
    return (
        <div className={classes.Loading_adv_search}>
            <div className={classes.Sk_folding_cube}>
                <div className={`${classes.Sk_cube1} ${classes.Sk_cube}`}></div>
                <div className={`${classes.Sk_cube2} ${classes.Sk_cube}`}></div>
                <div className={`${classes.Sk_cube4} ${classes.Sk_cube}`}></div>
                <div className={`${classes.Sk_cube3} ${classes.Sk_cube}`}></div>
            </div>
            <p className="text-center enfase">
                Isso pode demorar um pouco...
            </p>
            <p className="text-center">
                (mas vai valer a pena!)
            </p>
        </div>
    );
};

export default memo(LoadingAdvancedSearch);