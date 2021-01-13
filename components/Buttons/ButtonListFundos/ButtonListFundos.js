import React, {useState} from 'react';
import Link from 'next/link'
import classes from './ButtonListFundos.module.css'
const ButtonListFundos = () => {
    const [btnText, setBtnText] = useState('Lista de Fundos')

    return (
        <div className={`${classes.Container_btn_list} mb-5`}>
            <Link href='/lista'>
                <a onClick={()=>{setBtnText('Listando...')}} className={`${classes.Btn_lista} ${classes.Effect01}`}>
                    {btnText}
                </a>
            </Link>
        </div>
    );
};

export default ButtonListFundos;