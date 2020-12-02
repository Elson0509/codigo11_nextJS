import {memo} from 'react';
import {IntegerNumberBrazilian, numberBrazilianMoney} from '../../../util/Utilities'

const ListSimulacaoAportado = (props) => {
    return (
        <ul className="list-group">
            
            <li className="list-group-item list-group-item-action">
                <span className="enfase">Total aportado: </span>
                {numberBrazilianMoney(props.simulacao.aportes_data.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.valor
                }, 0))}
            </li>
            <li className="list-group-item list-group-item-action">
                <span className="enfase">Quantidade cotas: </span>
                {IntegerNumberBrazilian(props.simulacao.eventos[props.simulacao.eventos.length - 1].qtd_total)}
            </li>
            <li className="list-group-item list-group-item-action">
                <span className="enfase">Preço da cota: </span>
                {numberBrazilianMoney(props.simulacao.eventos[props.simulacao.eventos.length - 1].preco_cota)}
            </li>
            <li className="list-group-item list-group-item-action">
                <span className="enfase">Preço Médio: </span>
                {numberBrazilianMoney(props.simulacao.eventos[props.simulacao.eventos.length - 1].preco_medio)}
            </li>
            <li className="list-group-item list-group-item-action">
                <span className="enfase">Valor em caixa: </span>
                {numberBrazilianMoney(props.simulacao.eventos[props.simulacao.eventos.length - 1].caixa_regular + props.simulacao.eventos[props.simulacao.eventos.length - 1].caixa_alugueis)}
            </li>
            <li className="list-group-item list-group-item-action">
                <span className="enfase">Aluguel total recebido no período: </span>
                {numberBrazilianMoney(props.simulacao.eventos.reduce((accumulator, currentValue) => {
                    return currentValue.aluguel ? accumulator + currentValue.aluguel : accumulator + 0
                }, 0))}
            </li>
        </ul>
    );
};

export default memo(ListSimulacaoAportado);