import classes from './PanelAdmin.module.css'
import Icon from '../../components/Icon/Icon'
import {useState, Fragment} from 'react'

const PanelAdmin = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <section className={["container p-3 my-2 slow-shadow", `${props.bgcolor}`].join(" ")}>
            <h1 className={["h2 text-white text-center", classes.Panel_font].join(" ")}>
                {props.fiiname}
            </h1>
            <h1 className="h1 text-white text-center">
                <Icon icon={props.icon}/> 
            </h1>
            <h2 className={["h2 text-white text-center", classes.Panel_font].join(" ")}>{props.fiiticker}</h2>
        </section>
    );
};

export default PanelAdmin;