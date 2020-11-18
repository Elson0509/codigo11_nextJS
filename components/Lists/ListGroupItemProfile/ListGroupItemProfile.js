import React from 'react';
import {
    ListGroupItem,
} from 'react-bootstrap';
import classes from './ListGroupItemProfile.module.css'

const ListGroupItemProfile = (props) => {
    return (
        <ListGroupItem>
            <span className={[`mr-2 bg-${props.color}`,classes.Dot].join(" ")}/>
            <div className={classes.List_group_item_profile}>
                <span>
                    {props.label}
                </span>
                {props.text}
            </div>
        </ListGroupItem>
    );
};

export default ListGroupItemProfile;