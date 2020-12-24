import {memo} from 'react';
import Icon from '../../Icon/Icon'
import {getLinkMapFromEndereco, IntegerAreaBrazilian, IntegerNumberBrazilian} from '../../../util/Utilities'

const ListOperation = (props) => {

    return (
        <ul className="list-group">
            <li className={`list-group-item active bg-${props.operacao.operacao ? "primary" : "danger"}`}>
                {props.operacao.operacao ? "Compra de " : "Venda de "} {props.operacao.tipo}
            </li>
            <li className="list-group-item">
                <span className="enfase">Nome: </span>
                {props.operacao.nome}
            </li>
            <li className="list-group-item">
            <span className="enfase">Endereço: <a target="_blank" rel="noopener noreferrer" aria-label="Abrir endereço no Google Maps" href={getLinkMapFromEndereco(props.operacao.endereco)}><Icon icon="map-marked-alt"/></a> </span>
                {props.operacao.endereco}
            </li>
            <li className="list-group-item">
                <span className="enfase">Área: </span>
                {IntegerAreaBrazilian(props.operacao.area)}
            </li>
            {props.operacao.unidades > 0 && <li className="list-group-item">
                <span className="enfase">Unidades: </span>
                {IntegerNumberBrazilian(props.operacao.unidades)}
            </li>}
        </ul>
    );
};

export default memo(ListOperation);