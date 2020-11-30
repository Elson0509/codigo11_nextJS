import {memo} from 'react';
import ImoveisTable from '../Tables/ImoveisTable'
import Icon from '../Icon/Icon'

const CardImoveis = (props) => {
    return (
        <div className="col-12">
            <div className="card mb-3">
                <div className="card-body">
                    <ul className="list-group">
                        <li className={`list-group-item active bg-${props.bgcolor} text-center`}>
                            <span className="enfase-title">
                                <span className="font-number pr-2">
                                    <Icon icon="city"/>
                                </span>
                                Imóveis
                            </span>
                        </li>
                        <ImoveisTable imoveis={props.imoveis} bgcolor={props.bgcolor}/>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default memo(CardImoveis);