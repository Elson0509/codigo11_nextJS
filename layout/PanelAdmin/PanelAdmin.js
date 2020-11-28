import classes from './PanelAdmin.module.css'
import Icon from '../../components/Icon/Icon'
import {Fragment} from 'react'
const PanelAdmin = (props) => {
    return (
        <section className={`container pt-2 my-2 slow-shadow ${props.bgcolor} panel-fade`}>
            <h1 className={["h2 text-white text-center", classes.Panel_font].join(" ")}>
                {props.fiiname}
            </h1>
            <h1 className="h1 text-white text-center">
                <Icon icon={props.icon}/> 
            </h1>
            <h2 className={["h2 text-white text-center", classes.Panel_font].join(" ")}>{props.fiiticker}</h2>
            {props.title &&
            <Fragment>
                <hr className={classes.Hr}/>
                <h3 className={["h3 text-white text-center mt-2 mb-4", classes.Panel_font].join(" ")}>{props.title}</h3>
            </Fragment>
            }
        </section>
    );
};

export default PanelAdmin;