import React, {useState} from 'react';
import {imgUrl} from '../../util/UserFunctions'
import {revertData, revertCompleteData} from '../../util/Utilities'
import classes from './Forum.module.css'

const Post = (props) => {
    const [errorImage, setErrorImage] = useState(false)

    const errorImageHandle = (event) => {
        setErrorImage(prev => !prev)
    }

    return (
        <div className={`${classes.Panel} ${classes.Post_body} ${props.typePanel || 'panel-default'}`}>
            <div className={classes.Profile_post}>
                <p className={classes.Profile_username}>{props.user.username}</p>
                {!errorImage ? 
                    <div >
                        <img onError={errorImageHandle} className={classes.Img_post} src={imgUrl(props.user.id)} alt="img user post"/>
                    </div>
                    :
                    <div className={`${classes.Letter_user_post} text-center text-dark bg-light`}>
                        {props.user.username.trim().toUpperCase().charAt(0)}
                    </div>
                }
                <p className={classes.Profile_member}>Membro desde</p>
                <p className={classes.Profile_member}>{revertData(props.user.created_at)}</p>
            </div>
            <div className={classes.Panel_body}>
                <small>Postado em {revertCompleteData(props.post.created_at)}</small>
                <p>{props.post.comment}</p>
            </div>
        </div>
    );
};

export default Post;