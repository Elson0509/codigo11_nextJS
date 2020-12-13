import {memo, useState} from 'react';
import Icon from '../Icon/Icon'
import classes from './Cards.module.css'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {numberBrazilianMoney, IntegerNumberBrazilian, valueToRes} from '../../util/Utilities'
import {
    ListGroup, 
    ListGroupItem 
} from 'react-bootstrap';
import Link from 'next/link'
import {
    faPlusSquare,
    faMinusSquare
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const CardFavoritoCollapse = (props) => {
    const [collapse, setCollapse] = useState(false)
    return (
        <div className="slow-shadow mt-4">
                <div className={`card mb-3 ${classes.Widget_chart}`}>
                    <div className={classes.Widget_chart_content}>
                        <div>
                            <div 
                              className={`zero_auto rounded-circle ${classes.Font_icon} text-white ${props.favorito.bgcolor}`} 
                              >
                                <Icon icon={props.favorito.icon}/>
                            </div> 
                            <div className={classes.Divider}/>
                            <div className={`${props.favorito.bgcolor} h4 p-2 text-white ${classes.Card_fav_collapse}`}>
                                
                                <span className={classes.Text_card_fav}>
                                    {props.favorito.codigo}
                                </span>
                                <span className={`link ${classes.Icon_right}`} onClick={() => setCollapse(prev => !prev)}>
                                    <FontAwesomeIcon icon={collapse && faMinusSquare ||faPlusSquare}/>
                                </span>
                            </div>
                            
                        </div>
                        <TransitionGroup component={null}>
                        {collapse &&
                            <CSSTransition 
                                classNames={{
                                    enter: classes.Dialog_enter,
                                    enterActive: classes.Dialog_enter_active,
                                    exit: classes.Dialog_exit,
                                    exitActive: classes.Dialog_exit_active
                                }} 
                                timeout={500}>
                                <div>
                                    <ListGroup className="link">
                                        <ListGroupItem tag="button" action><span className="enfase">Nome: </span>{props.favorito.nome_fundo}</ListGroupItem>
                                        <ListGroupItem tag="button" action><span className="enfase">Segmento: </span>{props.favorito.descricao}</ListGroupItem>
                                        <ListGroupItem tag="button" action><span className="enfase">CNPJ: </span>{props.favorito.cnpj}</ListGroupItem>
                                        <ListGroupItem tag="button" action><span className="enfase">Cotas: </span>{IntegerNumberBrazilian(props.favorito.cotas_emitidas)}</ListGroupItem>
                                        <ListGroupItem tag="button" action><span className="enfase">Gestão: </span>{props.favorito.gestao ? 'Ativa' : 'Passiva'}</ListGroupItem>
                                        <ListGroupItem tag="button" action><span className="enfase">Adm: </span>{props.favorito.adm_nome}</ListGroupItem>
                                        {props.favorito.cotacao && <ListGroupItem tag="button" action><span className="enfase">Cotação: </span>{numberBrazilianMoney(props.favorito.cotacao)}</ListGroupItem>}
                                        {props.favorito.cotacao && <ListGroupItem tag="button" action><span className="enfase">Valor de mercado: </span>R$ {valueToRes(props.favorito.cotacao * props.favorito.cotas_emitidas)}</ListGroupItem>}
                                        <ListGroupItem action>
                                            <Link href={`/${props.favorito.codigo}/profile`}>
                                                <a class="btn btn-primary btn-block" role="button">VER PERFIL</a>
                                            </Link>
                                        </ListGroupItem>
                                    </ListGroup>
                                </div>
                            </CSSTransition>
                        }
                        </TransitionGroup>
                    </div>
                </div>
        </div>
    );
};

export default memo(CardFavoritoCollapse);