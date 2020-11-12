import { faSearch, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Dropdown } from 'react-bootstrap'; 

const NavbarAdmin = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownEllipsis, setDropdownEllipsis] = useState(false);

    return (
        <nav className="navbar navbar-expand-sm navbar-default bg-arielle-smile">
            <img src="/img/logo-branco.png" alt="logo" height="38" className="logo-margin"/>
            <button className="navbar-toggler btn-no-outline" 
                onClick={()=> setDropdownEllipsis(prev => !prev)}
                type="button" 
                data-toggle="collapse" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                    <FontAwesomeIcon className="text-white" icon={faEllipsisV}/>
            </button>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto"> 
                </ul>
                <ul className="nav navbar-nav hide-sm navbar-right">
                    <li className="nav-item mr-4">
                        <div className="mt-2 navbar-collapse">
                            <input className="search-input" 
                                type="text" 
                                placeholder="Código, nome ou segmento..." 
                                aria-label="Search"/>
                                <FontAwesomeIcon className="text-white search-icon" size="2x" icon={faSearch}/>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Dropdown isopen={dropdownOpen.toString()} toggle={() => setDropdownOpen(prev => !prev)}>
                            <Dropdown.Toggle variant="" className="text-white btn-no-box-shadow" caret="true">
                            <img className="rounded-circle" src="https://codigo11-com-br.umbler.net/profiles/user6.jpg" alt="img-user" width="50" height="50"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Configuracões</Dropdown.Item>
                                <Dropdown.Item>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
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
                        <Dropdown isopen={dropdownOpen.toString()} toggle={() => setDropdownOpen(prev => !prev)}>
                            <Dropdown.Toggle variant="" className="text-white btn-no-box-shadow" caret="true">
                            <img className="rounded-circle" src="https://codigo11-com-br.umbler.net/profiles/user6.jpg" alt="img-user" width="40" height="40"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Configuracões</Dropdown.Item>
                                <Dropdown.Item>Logout</Dropdown.Item>
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