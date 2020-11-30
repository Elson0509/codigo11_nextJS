import {memo} from 'react';
import Icon from '../../Icon/Icon'
import {numberBrazilianMoney,IntegerNumberBrazilian} from '../../../util/Utilities'

const ListApresentacaoFii = (props) => {
    return (
        props.apresentacao ?
        <ul className="list-group">
            <li className={`list-group-item active bg-${props.bgcolor} text-center`}>
                <span className="enfase-title">
                    <span className="font-number pr-2">
                        <Icon icon="clipboard-list"/>
                    </span>
                    Apresentação
                </span>
            </li>
            <li className="list-group-item list-group-item-action"><span className="enfase">Razão Social: </span> {props.apresentacao.razao_social}</li>
            <li className="list-group-item list-group-item-action"><span className="enfase">CNPJ: </span>{props.apresentacao.cnpj}</li>
            <li className="list-group-item list-group-item-action"><span className="enfase">Valor de mercado: </span>{numberBrazilianMoney(props.apresentacao.valor_mercado)}</li>
            <li className="list-group-item list-group-item-action"><span className="enfase">Patrimônio Líquido: </span>{numberBrazilianMoney(props.apresentacao.pl)}</li>
            <li className="list-group-item list-group-item-action"><span className="enfase">Quantidade de cotistas: </span>{IntegerNumberBrazilian(props.apresentacao.cotistas_qtt)}</li>
            <li className="list-group-item list-group-item-action"><span className="enfase">Quantidade de cotas: </span>{IntegerNumberBrazilian(props.apresentacao.cotas_qtt)}</li>
            
        </ul>

        : null
    );
};

export default memo(ListApresentacaoFii);