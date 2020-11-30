import {memo} from 'react';
import Icon from '../Icon/Icon'
import classes from './Cards.module.css'

const CardSegmento = (props) => {
    return (
        props.segmento &&
        <div className="col-12 col-lg-6 col-xl-3">
            <div className={`card text-white mb-3 bg-${props.segmento.color}`}>
                <div className="card-body">
                    <h4 className="card_header text-center">Segmento</h4>
                    <div className={classes.Icon_card_segmento}>
                        <Icon icon={props.segmento.icon}/>
                    </div>
                    <h3 className="enfase text-center">{props.segmento.descricao}</h3>
                </div>
            </div>
        </div>
    );
};

export default memo(CardSegmento);