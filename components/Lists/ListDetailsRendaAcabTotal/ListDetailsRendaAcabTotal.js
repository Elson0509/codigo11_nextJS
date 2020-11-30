import {Fragment} from 'react';
import Icon from '../../Icon/Icon'
import {numberToMetroQuadrado, numberWithPercentual, equivalenciaCamposFutebol, sizeCampoFutebol, percentNumberBrazilian} from '../../../util/Utilities'
import {OverlayTrigger, Popover} from 'react-bootstrap';
import ProgressBox from '../../ProgressBars/ProgressBox';

const ListDetailsImovelRendaAcabTotal = (props) => {
    const percTotalReceita = props.imoveis.reduce((acc, cur)=> {
        return acc + cur.porc_rec_fii
    },0)

    const areaTotal = props.imoveis.reduce((acc, cur)=> {
        return acc + cur.area
    },0)

    const vacanciaMedia = props.imoveis.reduce((acc, cur)=> {
        return acc + cur.area * cur.vacancia
    },0)/areaTotal

    const vacanciaFinanceira = props.imoveis.reduce((acc, cur)=> {
        return acc + cur.porc_rec_fii * cur.vacancia
    },0)/100

    const inadimplenciaMedia = props.imoveis.reduce((acc, cur)=> {
        return acc + cur.area * cur.inadimplencia
    },0)/areaTotal

    const popover = (
        <Popover className={`popover-bg bg-focus`} >
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
                <span className="enfase">Percentual total na receita: </span>
                {numberWithPercentual(percTotalReceita)}
            </li>
            <li className="list-group-item">
                <ProgressBox 
                    color="focus"
                    comment={`Vacância por m²: `}
                    textValue={numberWithPercentual(vacanciaMedia)}
                    value={vacanciaMedia}
                />                
            </li>
            <li className="list-group-item">
                <ProgressBox 
                    color="focus"
                    comment={`Vacância Financeira: `}
                    textValue={percentNumberBrazilian(vacanciaFinanceira, 2)}
                    value={vacanciaFinanceira}
                />                
            </li>
            <li className="list-group-item">
                <ProgressBox 
                    color="focus"
                    comment={`Inadimplência por m²: `}
                    textValue={numberWithPercentual(inadimplenciaMedia)}
                    value={inadimplenciaMedia}
                />                
            </li>
            <li className="list-group-item">
                <span className="enfase">
                    Área Total: 
                    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
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

export default ListDetailsImovelRendaAcabTotal;