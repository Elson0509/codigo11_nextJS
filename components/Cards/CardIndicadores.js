import {memo} from 'react';
import IndicadoresTable from '../Tables/IndicadoresTable'
import Icon from '../Icon/Icon'

const CardIndicadores = (props) => {
    return (
        <div className="col-12">
            <div className="card mb-3">
                <div className="card-body slow-shadow">
                    <ul className="list-group">
                        <li className={`list-group-item active bg-${props.bgcolor} text-center`}>
                            <span className="enfase-title">
                                <span className="font-number pr-2">
                                    <Icon icon="percentage"/>
                                </span>
                                Indicadores
                            </span>
                        </li>
                        <li style={{listStyleType:'none'}}> 
                            <IndicadoresTable indicadores={props.indicadores} bgcolor={props.bgcolor}/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default memo(CardIndicadores);