import {memo} from 'react';
import Icon from '../../Icon/Icon'
import {numberBrazilianMoney,IntegerNumberBrazilian} from '../../../util/Utilities'
import OverlayTriggerItem from '../../OverlayTriggers/OverlayTriggerItem'

const ListCotacao = (props) => {
    return (
        props.cotacao ?
        <ul className="list-group">
            <li className={`list-group-item active bg-${props.bgcolor} text-center`}>
                <span className="enfase-title">
                    <span className="font-number pr-2">
                        <Icon icon="chart-line"/>
                    </span>
                    Cotação
                </span>
            </li>
            <OverlayTriggerItem ttDescription="Código de negociação do fundo"><li className="list-group-item list-group-item-action"><span className="enfase">Código: </span> {props.cotacao.codneg.cod_neg}</li></OverlayTriggerItem>
            <OverlayTriggerItem ttDescription="Número de identificação internacional do título financeiro."><li className="list-group-item list-group-item-action"><span className="enfase">Código ISIN: </span>{props.cotacao.codneg.cod_isin}</li></OverlayTriggerItem>
            <OverlayTriggerItem ttDescription="Data da cotação."><li className="list-group-item list-group-item-action"><span className="enfase">Data: </span>{props.cotacao.data_ult_cotacao}</li></OverlayTriggerItem>
            <OverlayTriggerItem ttDescription="Preço de fechamento."><li className="list-group-item list-group-item-action"><span className="enfase">Preço: </span>{numberBrazilianMoney(props.cotacao.cotacao)}</li></OverlayTriggerItem>
            <OverlayTriggerItem ttDescription="Cotação máxima dos últimos 12 meses"><li className="list-group-item list-group-item-action"><span className="enfase">Preço máximo (12 meses): </span>{numberBrazilianMoney(props.cotacao.preco_max_12_meses)}</li></OverlayTriggerItem>
            <OverlayTriggerItem ttDescription="Cotação mínima dos últimos 12 meses"><li className="list-group-item list-group-item-action"><span className="enfase">Preço mínimo (12 meses): </span>{numberBrazilianMoney(props.cotacao.preco_min_12_meses)}</li></OverlayTriggerItem>
            <OverlayTriggerItem ttDescription="Quantidade média de negócios por dia durante os últimos 12 meses"><li className="list-group-item list-group-item-action"><span className="enfase">Quantidade média de negócios (12 meses): </span>{IntegerNumberBrazilian(props.cotacao.negocios_medio_12_meses)}</li></OverlayTriggerItem>
            <OverlayTriggerItem ttDescription="Volume médio por dia durante os últimos 12 meses"><li className="list-group-item list-group-item-action"><span className="enfase">Volume médio (12 meses): </span>{numberBrazilianMoney(props.cotacao.volume_medio_12_meses)}</li></OverlayTriggerItem>
        </ul>
        : null
    );
};

export default memo(ListCotacao);