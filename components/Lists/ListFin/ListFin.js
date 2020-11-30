import {memo} from 'react';
import Icon from '../../Icon/Icon'
import {numberBrazilianMoney} from '../../../util/Utilities'
import OverlayTriggerItem from '../../OverlayTriggers/OverlayTriggerItem'

const ListFin = (props) => {
    return (
        props.atv_fin ?
        <ul className="list-group">
            <li className={`list-group-item active bg-${props.bgcolor} text-center`}>
                <span className="enfase-title">
                    <span className="font-number pr-2">
                        <Icon icon="file-invoice-dollar"/>
                    </span>
                    Ativos financeiros
                </span>
            </li>
            <OverlayTriggerItem ttDescription="Valores totais em ativos financeiros, como participação em FII, CRI, LCI, ações, FIA e outros. Não inclui ativos de liquidez."><li className="list-group-item list-group-item-action"><span className="enfase">Total em ativos financeiros: </span>{numberBrazilianMoney(props.atv_fin.total_ativos_financeiros)}</li></OverlayTriggerItem>
            <OverlayTriggerItem ttDescription="Valores totais em ativos financeiros divididos pela quantidade de cotas do fundo."><li className="list-group-item list-group-item-action"><span className="enfase">Ativos por cota: </span>{numberBrazilianMoney(props.atv_fin.ativos_fin_cota)}</li></OverlayTriggerItem>
            <OverlayTriggerItem ttDescription="Receita financeira recebida pelos ativos financeiros nos últimos 12 meses."><li className="list-group-item list-group-item-action"><span className="enfase">Receita de juros (12 meses): </span>{numberBrazilianMoney(props.atv_fin.receita_juros_12_meses)}</li></OverlayTriggerItem>
            <OverlayTriggerItem ttDescription="Receita financeira recebida pelos ativos financeiros nos últimos 3 meses."><li className="list-group-item list-group-item-action"><span className="enfase">Receita de juros (3 meses): </span>{numberBrazilianMoney(props.atv_fin.receita_juros_3_meses)}</li></OverlayTriggerItem>
            <OverlayTriggerItem ttDescription="Valores dos Ativos de Liquidez em posse do fundo, como por exemplo valores em disponibilidade, títulos públicos, títulos privados e fundos de renda fixa. Não inclui ativos financeiros."><li className="list-group-item list-group-item-action"><span className="enfase">Ativos de liquidez: </span>{numberBrazilianMoney(props.atv_fin.atv_liquidez)}</li></OverlayTriggerItem>
            <OverlayTriggerItem ttDescription="Valores dos Ativos de Liquidez divididos pela quantidade de cotas do fundo."><li className="list-group-item list-group-item-action"><span className="enfase">Ativos de liquidez por cota: </span>{numberBrazilianMoney(props.atv_fin.atv_liquidez_cota)}</li></OverlayTriggerItem>
        </ul>
        : null
    );
};

export default memo(ListFin);