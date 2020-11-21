import React from 'react';
import AnimatedProgressBar from './AnimatedProgressBar'

const ProgressBox = (props) => {
    return (
        <div>
            <div>
                <span className="enfase">
                    {props.comment}
                </span>
                {props.textValue}
            </div>
            <AnimatedProgressBar
                color={props.color}
                value={props.value}
            />
        </div>
    );
};

export default ProgressBox;