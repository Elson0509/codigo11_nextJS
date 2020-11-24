import {memo} from 'react';
import Icon from '../../Icon/Icon'
import {numberToMetroQuadrado, equivalenciaCamposFutebol, sizeCampoFutebol, percentNumberBrazilian} from '../../../util/Utilities'
import {OverlayTrigger, Popover} from 'react-bootstrap';

const ListDetailsImovelRendaAcabTotal = (props) => {
    const areaTotal = props.imoveis.reduce((acc, cur)=> {
        return acc + cur.area
    },0)

    const popover = (
        <Popover className={`popover-bg bg-${props.theme}`} >
            <Popover.Title>Equivalência</Popover.Title>
            <Popover.Content>
                <h6>{equivalenciaCamposFutebol(areaTotal)}</h6>
                <p>(considerando um tamanho oficial de {numberToMetroQuadrado(sizeCampoFutebol)})</p>
            </Popover.Content>
        </Popover>
    )   

    return (
        <ul className="list-group">
            <li className="list-group-item">
                <span className="enfase">Quantidade de imóveis: </span>
                {props.imoveis.length}
            </li>
            <li className="list-group-item">
                <span className="enfase">
                    Área Total: 
                    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                    <button className={`btn btn-link btn-no-outline`}>
                        <Icon icon="th-large"/>
                        </button>
                    </OverlayTrigger>
                </span>
                {numberToMetroQuadrado(areaTotal)}
            </li>
        </ul>
    );
};

export default memo(ListDetailsImovelRendaAcabTotal);