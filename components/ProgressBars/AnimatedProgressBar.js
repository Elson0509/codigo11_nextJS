import React from 'react';
import {ProgressBar} from 'react-bootstrap';

const AnimatedProgressBar = (props) => {
    return (
            <ProgressBar
                animated
                variant={props.color}
                now={props.value}
            />
    );
};

export default AnimatedProgressBar;