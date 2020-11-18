import React from 'react';
import {
    ListGroupItem,
} from 'react-bootstrap';
import StartRatings from 'react-star-ratings';
import classes from './ListGroupItemProfile.module.css'

const ListGroupItemProfileStar = (props) => {
    return (
        <ListGroupItem>
            <span className={[`mr-2 bg-${props.color}`,classes.Dot].join(" ")}/>
            <div className={classes.List_group_item_profile}>
                <span>
                    {props.label}
                </span>
                <StartRatings
                    rating={props.rating}
                    starRatedColor={props.colorstar || "gold"}
                    changeRating={props.changeRating}
                    starDimension="25px"
                />
            </div>
        </ListGroupItem>
    );
};

export default ListGroupItemProfileStar;