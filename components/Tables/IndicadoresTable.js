import React, {memo, Fragment} from 'react';
import {numberBrazilianMoney, decimalNumberBrazilian, percentNumberBrazilian} from '../../util/Utilities'
import OverlayTriggerItem from '../OverlayTriggers/OverlayTriggerItem'

const IndicadoresTable = (props) => {
    return (
        props.indicadores ?
        <div className="over">
            <table className="table">
                <tbody>
                    <tr>
                        <OverlayTriggerItem ttDescription="Valor do patrimônio em relação a cota. Teoricamente, quanto menor mais barato."><th scope="row" className={`table-${props.bgcolor}`}>P/VP:</th></OverlayTriggerItem>
                        <td>{decimalNumberBrazilian(props.indicadores.pvp)}</td>
                        <OverlayTriggerItem ttDescription="Valor da taxa de administração nos últimos 12 meses."><th scope="row" className={`table-${props.bgcolor}`}>Taxa de administração (12 meses):</th></OverlayTriggerItem>
                        <td>{numberBrazilianMoney(props.indicadores.taxa_adm_12_meses)}</td>
                    </tr>
                    <tr>
                        <OverlayTriggerItem ttDescription="Valor patrimonial por cota."><th scope="row" className={`table-${props.bgcolor}`}>Patrimônio por cota:</th></OverlayTriggerItem>
                        <td>{numberBrazilianMoney(props.indicadores.pl_cota)}</td>
                        <OverlayTriggerItem ttDescription="Representa o valor de taxa de administração (12 meses) por cota."><th scope="row" className={`table-${props.bgcolor}`}>Taxa de administração por cota:</th></OverlayTriggerItem>
                        <td>{numberBrazilianMoney(props.indicadores.tx_adm_cota_12_meses)}</td>
                    </tr>
                    <tr>
                        <OverlayTriggerItem ttDescription="Dividend Yield do último mês."><th scope="row" className={`table-${props.bgcolor}`}>DY (último):</th></OverlayTriggerItem>
                        <td>{percentNumberBrazilian(props.indicadores.dy_ult, 2)}</td>
                        <OverlayTriggerItem ttDescription="Representa o percentual da taxa de administração sobre o patrimônio líquido."><th scope="row" className={`table-${props.bgcolor}`}>Taxa adm / Patrimônio:</th></OverlayTriggerItem>
                        <td>{percentNumberBrazilian(props.indicadores.tx_adm_pl_12_meses, 2)}</td>
                    </tr>
                    <tr>
                        <OverlayTriggerItem ttDescription="Dividend Yield médio dos últimos 6 meses."><th scope="row" className={`table-${props.bgcolor}`}>DY médio (6 meses):</th></OverlayTriggerItem>
                        <td>{percentNumberBrazilian(props.indicadores.dy_6, 2)}</td>
                        <OverlayTriggerItem ttDescription="Taxa de administração do último trimestre."><th scope="row" className={`table-${props.bgcolor}`}>Taxa de administração (3 meses):</th></OverlayTriggerItem>
                        <td>{numberBrazilianMoney(props.indicadores.taxa_adm_3_meses)}</td>
                    </tr>
                    <tr>
                        <OverlayTriggerItem ttDescription="Dividend Yield médio dos últimos 12 meses."><th scope="row" className={`table-${props.bgcolor}`}>DY médio (12 meses):</th></OverlayTriggerItem>
                        <td>{percentNumberBrazilian(props.indicadores.dy_12, 2)}</td>
                        <OverlayTriggerItem ttDescription="Receita Total (aluguéis + juros financeiros) nos últimos 12 meses."><th scope="row" className={`table-${props.bgcolor}`}>Receita Total (12 meses):</th></OverlayTriggerItem>
                        <td>{numberBrazilianMoney(props.indicadores.receita_total_12_meses)}</td>
                    </tr>
                    <tr>
                        <OverlayTriggerItem ttDescription="Taxa de retorno esperada baseado na renda gerada. Representa o aluguel dos últimos 12 meses sobre o valor de mercado. É usado para estimar o potencial de retorno do investidor."><th scope="row" id="indcap" className={`table-${props.bgcolor}`}>Cap Rate:</th></OverlayTriggerItem>
                        <td>{percentNumberBrazilian(props.indicadores.cap_rate_12_meses, 2)}</td>
                        <OverlayTriggerItem ttDescription="Receita Total (aluguéis + juros financeiros) nos últimos 3 meses."><th scope="row" className={`table-${props.bgcolor}`}>Receita Total (3 meses):</th></OverlayTriggerItem>
                        <td>{numberBrazilianMoney(props.indicadores.receita_total_3_meses)}</td>
                    </tr>
                    <tr>
                        <OverlayTriggerItem ttDescription="Valor de mercado por metro quadrado. Mais interessante quando o fundo é representato inteiramente por imóveis."><th scope="row" className={`table-${props.bgcolor}`}>Valor de mercado por m²:</th></OverlayTriggerItem>
                        <td>{numberBrazilianMoney(props.indicadores.valor_mercado_m2)}</td>
                        <OverlayTriggerItem ttDescription="Relação entre o valor de mercado e a receita total do fundo."><th scope="row" className={`table-${props.bgcolor}`}>Valor de mercado / Receita</th></OverlayTriggerItem>
                        <td>{decimalNumberBrazilian(props.indicadores.valor_mercado_por_receita, 2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        : null
    );
};

export default memo(IndicadoresTable);