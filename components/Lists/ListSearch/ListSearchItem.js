import {memo} from 'react';
import Icon from '../../Icon/Icon'
import classes from './ListSearch.module.css'

const ListSearchItem = (props) => {
    return (
        <li className={`list-group-item ${classes.Item_search} ${props.item.bgcolor}`}>
            <div className={classes.Icon_search}>
                <Icon icon={props.item.icon}/>                
            </div>
            <div className={classes.Item_search_content}>
                <h5>Código: {props.item.codigo}</h5>
                <p>Segmento: {props.item.descricao}</p>
                <p>{props.item.razao_social}</p>
            </div>
        </li>
    );
};

export default memo(ListSearchItem);