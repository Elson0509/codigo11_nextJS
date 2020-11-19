import {
    ListGroup, 
    ListGroupItem 
} from 'react-bootstrap';
import {faMoneyBillWave} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './Cards.module.css'
import {valueToRes} from '../../util/Utilities'

const CardLiquidez = (props) => {
    return (
        props.dados &&
        <div>
            <div className={`card mb-3 slow-shadow ${classes.Widget_chart}`}>
                <div className={classes.Widget_chart_content}>
                    <div className={`${classes.Icon_wrapper} rounded-circle`}>
                        <div className={`${classes.Icon_wrapper_bg} bg-primary`}/>
                        <FontAwesomeIcon size="lg" className="ml-3" icon={faMoneyBillWave}/>
                    </div>       
                    <div className={classes.Divider}/>
                    <ListGroup>
                        <ListGroupItem active tag="button" action>Ativos de Liquidez</ListGroupItem>
                        <ListGroupItem tag="button" action><span className={classes.Enfase}>Disponibilidades: </span>{valueToRes(props.dados.disponibilidades)}</ListGroupItem>
                        <ListGroupItem tag="button" action><span className={classes.Enfase}>Títulos Públicos: </span>{valueToRes(props.dados.tit_pub)}</ListGroupItem>
                        <ListGroupItem tag="button" action><span className={classes.Enfase}>Títulos Privados: </span>{valueToRes(props.dados.tit_priv)}</ListGroupItem>
                        <ListGroupItem tag="button" action><span className={classes.Enfase}>Fundos de renda fixa: </span>{valueToRes(props.dados.fundos_rf)}</ListGroupItem>
                    </ListGroup>
                </div>
            </div>
        </div>
    );
};

export default CardLiquidez;