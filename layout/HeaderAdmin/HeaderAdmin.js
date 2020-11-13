import React from 'react';
import { Dropdown } from 'react-bootstrap'; 
import { useState, Fragment } from 'react';

const HeaderAdmin = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <header className="bg-premium-dark header">
            <div className="container">
                <div className="row">
                    <div className="col-12 hide-md">
                        <ul className="nav">
                            <li className="nav-item active">
                                <a className="nav-link text-white" href="index.html">Dashboard<span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">Pesquisar</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">Lista de FIIs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">Eventos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">Livros recomendados</a>
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
                                <Dropdown.Item>Livros recomendados</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <div className="dropdown create show-md">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Menu
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                            <a className="dropdown-item" href="#">Dashboard</a>
                            <a className="dropdown-item" href="#">Pesquisar</a>
                            <a className="dropdown-item" href="#">Lista de FIIs</a>
                            <a className="dropdown-item" href="#">Eventos</a>
                            <a className="dropdown-item" href="#">Livros recomendados</a>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderAdmin;