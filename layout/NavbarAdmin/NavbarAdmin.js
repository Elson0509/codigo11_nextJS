import { faSearch, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, Fragment, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Dropdown } from 'react-bootstrap'; 
import AnimatedEllipsisButton from '../../components/Buttons/AnimatedEllipsisButton/AnimatedEllipsisButton'
import Link from 'next/link'
import {userId, imgUrl, getUser} from '../../util/UserFunctions'
import jwt_decode from 'jwt-decode'
import classes from './NavbarAdmin.module.css'
import ModalConfiguration from '../../components/Modals/ModalConfiguration'

const NavbarAdmin = () => {
    const [dropdownEllipsis, setDropdownEllipsis] = useState(false);
    const [idUser, setIdUser] = useState(0);
    const [user, setUser] = useState(null);
    const [modal, setModal] = useState(false)

    const imageExists = image_url => {
        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        http.send();
        return http.status != 404;
    }

    const logout = (e) => {
        localStorage.removeItem('userToken')
        window.location.reload()
    }

    useEffect(()=> {
        setIdUser(userId())
        const token = localStorage.userToken
        if(!!token){
            const decoded = jwt_decode(token)
            getUser(decoded.uid, token).then(res => {
                setUser({
                    username: res.data.username,
                    email: res.data.email
                })
            })
        }
    },[])

    const imgUser = (size=50) => {
        return imageExists(imgUrl(idUser)) &&
        <img className="rounded-circle" src={imgUrl(idUser)} alt="img-user" width={size} height={size}/>
        ||
        user && <div className={`${classes.Letter_user} text-center text-dark bg-light`}>
            {user.username.trim().toUpperCase().charAt(0) || 'U'}
        </div>
    }
    
    return (
        <nav className="navbar navbar-expand-sm navbar-default bg-arielle-smile">
            <span></span>
            <span>
                <img src="/img/logo-alone.png" height="55" className="mr-2"/>
                <svg className="logo" viewBox="0 0 356.401 75.001" xmlns="http://www.w3.org/2000/svg">
                    <g 
                        strokeLinecap="round" 
                        fillRule="evenodd"
                        stroke="#fff"
                        strokeWidth="0.6mm" 
                        fill="none">
                            <path d="M 192.001 62.6 L 192.001 11.5 A 17.877 17.877 0 0 1 192.504 7.055 Q 193.975 1.343 199.748 0.256 A 15.974 15.974 0 0 1 202.701 0 L 234.201 0 L 234.201 18.5 L 226.201 18.5 L 226.201 6.8 L 200.201 6.8 L 200.201 68.2 L 226.201 68.2 L 226.201 44.8 L 212.301 53.5 L 212.301 46.2 L 234.201 32.5 L 234.201 75 L 204.501 75 Q 198.82 75 196.02 73.336 A 6.175 6.175 0 0 1 194.801 72.4 Q 192.284 69.974 192.029 63.994 A 32.737 32.737 0 0 1 192.001 62.6 Z M 34.701 68.2 L 34.701 56.5 L 41.501 56.5 L 41.501 75 L 10.801 75 Q 2.401 75 0.601 68.4 Q 0.001 66.5 0.001 64.3 L 0.001 10.8 A 16.155 16.155 0 0 1 0.36 7.261 Q 0.858 5.049 2.043 3.484 A 8.404 8.404 0 0 1 5.101 1 Q 7.001 0 9.801 0 L 41.501 0 L 41.501 18.5 L 34.701 18.5 L 34.701 6.8 L 8.201 6.8 L 8.201 68.2 L 34.701 68.2 Z M 101.601 0 L 136.901 0 A 26.438 26.438 0 0 1 140.414 0.216 Q 144.313 0.741 146.428 2.54 A 6.934 6.934 0 0 1 147.151 3.25 A 10.103 10.103 0 0 1 149.048 6.589 Q 150.001 9.285 150.001 13.1 L 150.001 61.9 Q 150.001 68.8 146.801 71.9 Q 143.601 75 136.901 75 L 101.601 75 L 101.601 68.2 L 107.901 68.2 L 107.901 6.8 L 101.601 6.8 L 101.601 0 Z M 58.501 0 L 78.001 0 A 17.539 17.539 0 0 1 81.247 0.28 Q 84.896 0.969 86.851 3.35 A 10.675 10.675 0 0 1 88.682 6.755 Q 89.199 8.291 89.425 10.17 A 26.244 26.244 0 0 1 89.601 13.3 L 89.601 61.4 Q 89.601 67.568 87.84 70.8 A 8.208 8.208 0 0 1 87.201 71.8 A 7.016 7.016 0 0 1 84.225 74.043 Q 83.014 74.552 81.474 74.79 A 19.5 19.5 0 0 1 78.501 75 L 59.301 75 A 19.187 19.187 0 0 1 55.25 74.608 Q 52.975 74.115 51.38 73.003 A 8.432 8.432 0 0 1 48.001 67.8 Q 47.401 65.6 47.401 62.9 L 47.401 13.3 Q 47.401 7.435 49.087 4.405 A 7.646 7.646 0 0 1 49.601 3.6 A 7.637 7.637 0 0 1 53.322 0.805 Q 55.476 0 58.501 0 Z M 257.301 0 L 276.801 0 A 17.539 17.539 0 0 1 280.047 0.28 Q 283.696 0.969 285.651 3.35 A 10.675 10.675 0 0 1 287.482 6.755 Q 287.999 8.291 288.225 10.17 A 26.244 26.244 0 0 1 288.401 13.3 L 288.401 61.4 Q 288.401 67.568 286.64 70.8 A 8.208 8.208 0 0 1 286.001 71.8 A 7.016 7.016 0 0 1 283.025 74.043 Q 281.814 74.552 280.274 74.79 A 19.5 19.5 0 0 1 277.301 75 L 258.101 75 A 19.187 19.187 0 0 1 254.05 74.608 Q 251.775 74.115 250.18 73.003 A 8.432 8.432 0 0 1 246.801 67.8 Q 246.201 65.6 246.201 62.9 L 246.201 13.3 Q 246.201 7.435 247.887 4.405 A 7.646 7.646 0 0 1 248.401 3.6 A 7.637 7.637 0 0 1 252.122 0.805 Q 254.276 0 257.301 0 Z M 300.201 75 L 300.201 68.2 L 307.001 68.2 L 307.001 6.9 L 297.401 6.9 L 297.401 0 L 306.001 0 A 18.546 18.546 0 0 1 308.494 0.156 Q 311.645 0.585 313.151 2.2 Q 315.201 4.4 315.201 8.6 L 315.201 68.2 L 321.401 68.2 L 321.401 75 L 300.201 75 Z M 335.201 75 L 335.201 68.2 L 342.001 68.2 L 342.001 6.9 L 332.401 6.9 L 332.401 0 L 341.001 0 A 18.546 18.546 0 0 1 343.494 0.156 Q 346.645 0.585 348.151 2.2 Q 350.201 4.4 350.201 8.6 L 350.201 68.2 L 356.401 68.2 L 356.401 75 L 335.201 75 Z M 55.401 6.8 L 55.401 68.2 L 81.601 68.2 L 81.601 6.8 L 55.401 6.8 Z M 254.201 6.8 L 254.201 68.2 L 280.401 68.2 L 280.401 6.8 L 254.201 6.8 Z M 141.801 68.2 L 141.801 6.8 L 116.101 6.8 L 116.101 68.2 L 141.801 68.2 Z M 175.501 25 L 175.501 68.2 L 182.001 68.2 L 182.001 75 L 161.001 75 L 161.001 68.2 L 167.301 68.2 L 167.301 31.8 L 161.001 31.8 L 161.001 25 L 175.501 25 Z M 174.813 8.009 A 4.654 4.654 0 0 0 171.401 6.6 Q 169.301 6.6 167.801 8.15 Q 166.301 9.7 166.301 11.85 A 6.328 6.328 0 0 0 166.301 11.917 A 4.876 4.876 0 0 0 167.751 15.45 A 4.844 4.844 0 0 0 169.383 16.541 A 5.242 5.242 0 0 0 171.351 16.9 A 6.328 6.328 0 0 0 171.418 16.9 A 4.876 4.876 0 0 0 174.951 15.45 A 4.844 4.844 0 0 0 176.041 13.818 A 5.242 5.242 0 0 0 176.401 11.85 Q 176.401 9.7 174.951 8.15 A 5.745 5.745 0 0 0 174.813 8.009 Z"
                        vectorEffect="non-scaling-stroke"/>
                    </g>
                </svg>
            </span>
            
            <button className="navbar-toggler btn-no-outline" 
                type="button" 
                data-toggle="collapse" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                    <AnimatedEllipsisButton nameid="ellipsis" clicked={()=> setDropdownEllipsis(prev => !prev)}/>
            </button>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto"> 
                    <ModalConfiguration modal={modal} toggle={() => setModal(prev=> !prev)}/>
                </ul>
                <ul className="nav navbar-nav hide-sm navbar-right">
                    <li className="nav-item ">
                        <div className="mt-2 navbar-collapse">
                            <input className="search-input" 
                                type="text" 
                                placeholder="Código, nome ou segmento..." 
                                aria-label="Search"/>
                                <FontAwesomeIcon className="text-white search-icon" size="2x" icon={faSearch}/>
                        </div>
                    </li>
                    <li className="nav-item">
                        {
                            idUser && 
                            <Dropdown>
                                <Dropdown.Toggle variant="" className="text-white btn-no-box-shadow" caret="true">
                                    {
                                      imgUser()
                                    }
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setModal(true)}>Configuracões</Dropdown.Item>
                                    <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            ||
                            <Link href={`/login`}>
                                <a className="btn btn-primary mt-3 ml-2" role="button">Login</a>
                            </Link>
                        }
                    </li>
                </ul>
            </div>
            <CSSTransition
                in={dropdownEllipsis}
                timeout={200}
                unmountOnExit
                classNames="collapsed-menu-transition">
                    <Fragment>
                {dropdownEllipsis && 
                    <div className="collapsed-menu bg-dark">
                        <div className="search-collapsed-menu bg-premium-dark">
                            <input className="search-input-collapsed-menu" 
                                type="text" 
                                placeholder="Código, nome ou segmento..." 
                                aria-label="Search"/>
                            <FontAwesomeIcon className="text-white search-icon-collapsed-menu" size="2x" icon={faSearch}/>
                        </div>
                        <Dropdown drop='none'>
                            <Dropdown.Toggle variant="" className="text-white btn-no-box-shadow" caret="true">
                                {
                                    imgUser(40)
                                }
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setModal(true)}>Configuracões</Dropdown.Item>
                                <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                }
                </Fragment>
            </CSSTransition>
        </nav>
    );
};

export default NavbarAdmin;