import React from 'react';
import { Dropdown } from 'react-bootstrap'; 
import { useState, Fragment } from 'react';
import classes from './HeaderAdmin.module.css'

const HeaderAdmin = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <header className="bg-premium-dark p-2">
            <div className="container">
                <div className="row">
                    <div className="col-12 hide-md">
                        <ul className="nav zero_auto">
                            <li className="nav-item active">
                                <a className={["nav-link m-2", classes.Header_item].join(" ")} href="index.html">Dashboard<span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className={["nav-link m-2", classes.Header_item].join(" ")} href="#">Pesquisar</a>
                            </li>
                            <li className="nav-item">
                                <a className={["nav-link m-2", classes.Header_item].join(" ")} href="#">Lista de FIIs</a>
                            </li>
                            <li className="nav-item">
                                <a className={["nav-link m-2", classes.Header_item].join(" ")} href="#">Eventos</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 show-md">
                        <Dropdown isopen={dropdownOpen.toString()} toggle={() => setDropdownOpen(prev => !prev)}>
                            <Dropdown.Toggle variant="secondary" className="text-white btn-no-box-shadow" caret="true">
                                Menu
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Dashboard</Dropdown.Item>
                                <Dropdown.Item>Pesquisar</Dropdown.Item>
                                <Dropdown.Item>Lista de FIIs</Dropdown.Item>
                                <Dropdown.Item>Eventos</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderAdmin;