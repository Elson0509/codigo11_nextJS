import AccordionAdmin from './AccordionAdmin/AccordionAdmin'
import MainPageAdmin from './MainPageAdmin/MainPageAdmin'
import PanelAdmin from '../PanelAdmin/PanelAdmin'
import { useState, Fragment } from 'react';
import classes from './MainAdmin.module.css'
import FooterAdmin from '../FooterAdmin/FooterAdmin'

const MainAdmin = (props) => {
    const [toggleMenu, setToggleMenu] = useState(false)

    return (
        <Fragment>
            <main className="container width-99">
                <div className="row">
                    <PanelAdmin 
                        bgcolor={props.bgcolor}
                        fiiname={props.fiiname}
                        fiiticker={props.fiiticker}
                        icon={props.icon}
                        descricao={props.descricao}
                        toggleMenu={toggleMenu}
                        title={props.title}
                        toggle={() => {setToggleMenu(prev => !prev)}}
                    />
                    <AccordionAdmin fii={props.fii} toggleMenu={toggleMenu} setToggleMenu={() => setToggleMenu(prev=>!prev)}/>
                    <MainPageAdmin toggleMenu={toggleMenu}>
                        {props.children}
                    </MainPageAdmin>
                </div>
            </main>
            <FooterAdmin/>
        </Fragment>
    );
};

export default MainAdmin;