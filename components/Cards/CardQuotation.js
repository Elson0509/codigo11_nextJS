import {memo} from 'react';
import classes from './Cards.module.css'

const CardQuotation = (props) => {
    const randomColor = () => {
        const colors = [classes.Blue_card, classes.Green_card, classes.Red_card, classes.Yellow_card, '']
        return colors[Math.floor(Math.random() * colors.length)]
    }

    return (
        props.frase ?
        <blockquote className={`${classes.Quote_card} ${randomColor()}`}>
            <p>
                {props.frase.frase}
            </p>
            <cite>
                {props.frase.name}
            </cite>
        </blockquote>
        :
        null
    );
};

export default memo(CardQuotation);