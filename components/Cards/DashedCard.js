import {memo} from 'react'
import Icon from '../Icon/Icon'
import classes from './Cards.module.css'

const DashedCard = (props) => {
    return (
        <div className={`"text-center mt-4 mb-4 slow-shadow ${classes.Dashed}`}>
            <div>
            <Icon icon={props.icon}/>
            </div>
            <p className="text-center">{props.message}</p>
        </div>
    );
};

export default memo(DashedCard);