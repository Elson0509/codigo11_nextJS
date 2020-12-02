import {memo} from 'react';
import {percentNumberBrazilian, numberBrazilianMoney} from '../../../util/Utilities'

const ListSimulacaoPatrimonio = (props) => {
    return (
        <ul className="list-group">
            <li className="list-group-item list-group-item-action">
                <span className="enfase">Patrimônio bruto: </span>
                {numberBrazilianMoney(props.simulacao.patrimonio)}
            </li>
            <li className="list-group-item list-group-item-action">
                <span className="enfase">Rentabilidade mensal: </span>
                {percentNumberBrazilian(props.simulacao.retorno_bruto_mensal, 2)}
            </li>
            <li className="list-group-item list-group-item-action">
                <span className="enfase">Rentabilidade anual: </span>
                {percentNumberBrazilian(props.simulacao.retorno_bruto_anual, 2)}
            </li>
            <li className="list-group-item list-group-item-action">
                <span className="enfase">Patrimônio líquido: </span>
                {numberBrazilianMoney(props.simulacao.patrimonio_liquido)}
            </li>
            <li className="list-group-item list-group-item-action">
                <span className="enfase">Rentabilidade mensal líquida: </span>
                {percentNumberBrazilian(props.simulacao.retorno_liquido_mensal, 2)}
            </li>
            <li className="list-group-item list-group-item-action">
                <span className="enfase">Rentabilidade anual líquida: </span>
                {percentNumberBrazilian(props.simulacao.retorno_liquido_anual, 2)}
            </li>
            

        </ul>
    );
};

export default memo(ListSimulacaoPatrimonio);