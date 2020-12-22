import React from 'react';
import Link from 'next/link'
import classes from './ButtonListFundos.module.css'
const ButtonListFundos = () => {
    return (
        <div className={`${classes.Container_btn_list} mb-5`}>
            <Link href='/lista'>
                <a className={`${classes.Btn_lista} ${classes.Effect01}`}>
                    Lista de Fundos
                </a>
            </Link>
        </div>
    );
};

export default ButtonListFundos;