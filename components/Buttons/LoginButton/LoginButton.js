import {memo} from 'react';
import Link from 'next/link'
import classes from './LoginButton.module.css'

const LoginButton = (props) => {
    return (
        <Link href={props.link}>
            <a className={`${classes.Login_btn}`} role="button">{props.nameLink}</a>
        </Link>
    );
};

export default memo(LoginButton);