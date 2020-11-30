import {memo} from 'react';
import {numberBrazilianMoney, percentNumberBrazilian, IntegerAreaBrazilian} from '../../util/Utilities'
import OverlayTriggerItem from '../OverlayTriggers/OverlayTriggerItem'

const ImoveisTable = (props) => {
    return (
        props.imoveis ?
        <div className="over">
            <table className="table">
                <tbody>
                    <tr>
                        <OverlayTriggerItem ttDescription="Quantidade de terrrenos."><th scope="row" className={`table-${props.bgcolor}`}>Terrenos:</th></OverlayTriggerItem>
                        <td>{props.imoveis.terrenos_qtt}</td>
                        <OverlayTriggerItem ttDescription="Vacância relativa ao valor de aluguel dos imóveis."><th scope="row" className={`table-${props.bgcolor}`}>Vacância financeira:</th></OverlayTriggerItem>
                        <td>{percentNumberBrazilian(props.imoveis.vacancia_financeira, 2)}</td>
                    </tr>
                    <tr>
                        <OverlayTriggerItem ttDescription="Quantidade de imóveis para renda."><th scope="row" id="imr" className={`table-${props.bgcolor}`}>Imóveis para renda:</th></OverlayTriggerItem>
                        <td>{props.imoveis.renda_acab_qtt}</td>
                        <OverlayTriggerItem ttDescription="Total de valor em Receita de Aluguéis nos últimos 12 meses."><th scope="row" className={`table-${props.bgcolor}`}>Receita de aluguéis (12 meses):</th></OverlayTriggerItem>
                        <td>{numberBrazilianMoney(props.imoveis.receita_alugueis_12_meses)}</td>
                    </tr>
                    <tr>
                        <OverlayTriggerItem ttDescription="Quantidade de imóveis para renda ainda em construção."><th scope="row" className={`table-${props.bgcolor}`}>Imóveis para renda (contrução):</th></OverlayTriggerItem>
                        <td>{props.imoveis.renda_const_qtt}</td>
                        <OverlayTriggerItem ttDescription="Receita em aluguéis por metro quadrado nos últimos 12 meses."><th scope="row" className={`table-${props.bgcolor}`}>Receita m² (12 meses):</th></OverlayTriggerItem>
                        <td>{numberBrazilianMoney(props.imoveis.receita_aluguel_m2_12_meses)}</td>
                    </tr>
                    <tr>
                        <OverlayTriggerItem ttDescription="Quantidade de imóveis com o propósito de venda."><th scope="row" className={`table-${props.bgcolor}`}>Imóveis para venda:</th></OverlayTriggerItem>
                        <td>{props.imoveis.venda_acab_qtt}</td>
                        <OverlayTriggerItem ttDescription="Receita em aluguéis por metro quadrado nos últimos 12 meses."><th scope="row" className={`table-${props.bgcolor}`}>Receita de aluguéis (3 meses):</th></OverlayTriggerItem>
                        <td>{numberBrazilianMoney(props.imoveis.receita_alugueis_3_meses)}</td>
                    </tr>
                    <tr>
                        <OverlayTriggerItem ttDescription="Quantidade de imóveis para venda ainda em construção."><th scope="row"  className={`table-${props.bgcolor}`}>Imóveis para venda (contrução):</th></OverlayTriggerItem>
                        <td>{props.imoveis.venda_const_qtt}</td>
                        <OverlayTriggerItem ttDescription="Arrecadação de receita em aluguéis por metro quadrado nos últimos 3 meses."><th scope="row" className={`table-${props.bgcolor}`}>Receita m² (3 meses):</th></OverlayTriggerItem>
                        <td>{numberBrazilianMoney(props.imoveis.receita_aluguel_m2_3_meses)}</td>
                    </tr>
                    <tr>
                        <OverlayTriggerItem ttDescription="Área total em imóveis para renda."><th scope="row" className={`table-${props.bgcolor}`}>Área total para renda:</th></OverlayTriggerItem>
                        <td>{IntegerAreaBrazilian(props.imoveis.areaTotal_renda)}</td>
                        <OverlayTriggerItem ttDescription="Receita com venda de imóveis nos últimos 12 meses."><th scope="row" className={`table-${props.bgcolor}`}>Receita de venda de imóveis (12 meses):</th></OverlayTriggerItem>
                        <td>{numberBrazilianMoney(props.imoveis.receita_venda_imoveis_12_meses)}</td>
                    </tr>
                    <tr>
                        <OverlayTriggerItem ttDescription="Percentual de área vaga."><th scope="row" className={`table-${props.bgcolor}`}>Vacância:</th></OverlayTriggerItem>
                        <td>{percentNumberBrazilian(props.imoveis.vacancia, 2)}</td>
                        <OverlayTriggerItem ttDescription="Receita com venda de imóveis nos últimos 3 meses."><th scope="row" className={`table-${props.bgcolor}`}>Receita de venda de imóveis (3 meses)</th></OverlayTriggerItem>
                        <td>{numberBrazilianMoney(props.imoveis.receita_venda_imoveis_3_meses)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        : null
    );
};

export default memo(ImoveisTable);