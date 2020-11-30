import {memo} from 'react';
import {
    Tooltip, OverlayTrigger
} from 'react-bootstrap';

const OverlayTriggerItem = (props) => {
    return (
        <OverlayTrigger
            placement={props.placement || 'top'}
            overlay={<Tooltip>
                        {props.ttDescription}
                    </Tooltip>}
            >
                {props.children}
            </OverlayTrigger>
    );
};

export default memo(OverlayTriggerItem);