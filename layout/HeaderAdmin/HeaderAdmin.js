import { memo } from 'react';
import classes from './HeaderAdmin.module.css'
import Link from 'next/link'

const HeaderAdmin = () => {

    const menuItems = [
        {
            name: 'Dashboard',
            link: '/dashboard'
        },
        {
            name: 'Pesquisar',
            link: '/pesquisar'
        },
        {
            name: 'Lista de FIIs',
            link: '/lista'
        },
        {
            name: 'Eventos',
            link: '/eventos'
        },
    ]

    return (
        <header className="bg-premium-dark p-2">
            <div className="container">
                <div className="row">
                    <div className="col-12 hide-md">
                        <ul className="nav zero_auto">
                            {
                                menuItems.map((el, ind)=>(
                                    <li className="nav-item active" key={ind}>
                                        <Link href={el.link}>
                                            <a className={["nav-link m-2", classes.Header_item].join(" ")}>{el.name}</a>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="nav flex-column col-12 show-md">
                        <ul style={{listStyleType:'none'}}>
                        {
                            menuItems.map((el, ind)=>(
                                <li className="nav-item active" key={ind}>
                                    <Link href={el.link}>
                                        <a className={["nav-link m-2 text-center", classes.Header_item].join(" ")}>{el.name}</a>
                                    </Link>
                                </li>
                            ))
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default memo(HeaderAdmin);