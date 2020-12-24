import Icon from '../../Icon/Icon'
import {numberToMetroQuadrado, numberWithPercentual, sizeCampoFutebol, equivalenciaCamposFutebol} from '../../../util/Utilities'
import {Popover, OverlayTrigger} from 'react-bootstrap';

const ListDetailsTerrenoTotal = (props) => {
    const percTotalReceita = () => {
        let total = 0;
        props.terrenos.forEach(terreno => {
            total+=terreno.porc_rec_fii
        })
        return total
    }

    const areaTotal = () => {
        let total = 0;
        props.terrenos.forEach(terreno => {
            total+=terreno.area
        })
        return total
    }

    const popover = (
        <Popover className={`popover-bg bg-focus`} >
            <Popover.Title>Equivalência</Popover.Title>
            <Popover.Content>
                <h6>{equivalenciaCamposFutebol(areaTotal())}</h6>
                <p>(considerando um tamanho oficial de {numberToMetroQuadrado(sizeCampoFutebol)})</p>
            </Popover.Content>
        </Popover>
    )   

    return (
        <ul className="list-group">
            <li className="list-group-item">
                <span className="enfase">Quantidade de terrenos: </span>
                {props.terrenos.length}
            </li>
            <li className="list-group-item">
                <span className="enfase">Percentual total na receita: </span>
                {numberWithPercentual(percTotalReceita())}
            </li>
            <li className="list-group-item">
                <span className="enfase">
                    Área Total: 
                    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                        <button aria-label="Área Total" className={`btn btn-link btn-no-outline`}>
                            <Icon icon="th-large"/>
                        </button>
                    </OverlayTrigger>
                </span>
                {numberToMetroQuadrado(areaTotal())}
            </li>
        </ul>
    );
};

export default ListDetailsTerrenoTotal;