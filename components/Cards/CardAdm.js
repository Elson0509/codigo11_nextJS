import classes from './Cards.module.css'
import {faBriefcase} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    ListGroup, 
    ListGroupItem 
} from 'react-bootstrap';

const CardAdm = (props) => {
    return (
            <div className={`card mb-3 slow-shadow ${classes.Widget_chart}`}>
                <div className={classes.Widget_chart_content}>
                    <div className={`${classes.Icon_wrapper} rounded-circle`}>
                        <div className={`${classes.Icon_wrapper_bg} bg-primary`}/>
                        <FontAwesomeIcon size="lg" className="ml-3" icon={faBriefcase}/>
                    </div>        
                    <div className={classes.Divider}/>
                    <ListGroup>
                        <ListGroupItem active tag="button" action className="bg-success">Administrador</ListGroupItem>
                        <ListGroupItem tag="button" action><span className="enfase">Nome: </span>{props.adm.nome}</ListGroupItem>
                        <ListGroupItem tag="button" action><span className="enfase">Endereço: </span>{props.adm.endereco}</ListGroupItem>
                        <ListGroupItem tag="button" action><span className="enfase">E-mail: </span>{props.adm.email}</ListGroupItem>
                        <ListGroupItem tag="button" action><span className="enfase">CNPJ: </span>{props.adm.cnpj}</ListGroupItem>
                    </ListGroup>
                </div>
            </div>
    );
};

export default CardAdm;