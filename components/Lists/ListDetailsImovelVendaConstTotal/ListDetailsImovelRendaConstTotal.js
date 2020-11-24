import {memo} from 'react';
import Icon from '../../Icon/Icon'
import {numberToMetroQuadrado, equivalenciaCamposFutebol, sizeCampoFutebol, percentNumberBrazilian} from '../../../util/Utilities'
import {OverlayTrigger, Popover} from 'react-bootstrap';

const ListDetailsImovelRendaAcabTotal = (props) => {
    const areaTotal = props.imoveis.reduce((acc, cur)=> {
        return acc + cur.area
    },0)

    const qttComCustoEmDia = () =>{
        let qtt=0;
        props.imoveis.forEach(imovel => {
            if(imovel.custo_obra_realizado <= imovel.custo_obra_previsto)
                qtt++
        })
        return qtt
    }

    const qttConstrucaoEmDia = () =>{
        let qtt=0;
        props.imoveis.forEach(imovel => {
            if(imovel.porc_obra_realizado >= imovel.porc_obra_previsto)
                qtt++
        })
        return qtt
    }

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
                {qttComCustoEmDia()} de {props.imoveis.length} imóveis com custos de acordo com o previsto.
            </li>
            <li className="list-group-item">
                {qttConstrucaoEmDia()} de {props.imoveis.length} imóveis com obras em dia.
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