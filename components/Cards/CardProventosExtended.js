import {memo} from 'react';
import {numberToMoney, numberWithPercentual} from '../../util/Utilities'
import classes from './Cards.module.css'

const CardProventosExtended = (props) => {
    const getListProventos = () => {
        if(props.proventos){
            return props.proventos.map((prov, ind) => (
                <tr key={`prov${ind}`}>
                    <td>{prov.ult_data_com}</td>
                    <td>{prov.data_pagamento}</td>
                    <td>{numberToMoney(prov.valor_rendimento)}</td>
                    <td>{numberToMoney(prov.valor_amortizacao)}</td>
                    <td>{prov.dy ? numberWithPercentual(prov.dy) : "---"}</td>
                </tr>
            ))
        }
    }

    return (
            <div className="card m-3 bg-night-sky widget-chart text-dark">
                <div className="card-header text-white text-center">
                    <span className={`${classes.Card_header_proventos}`}>Histórico de proventos</span>
                </div>
                <div className="card-body over">
                    {
                    props.proventos && props.proventos.length > 0 ?
                        <table className="table table-hover table-sm table-striped table-primary">
                            <caption className="text-white">Histórico de proventos</caption>
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Últ Data Com</th>
                                <th scope="col">Data de Pagamento</th>
                                <th scope="col">Rendimento</th>
                                <th scope="col">Amortização</th>
                                <th scope="col">DY</th>
                            </tr>
                            </thead>
                            <tbody>
                                {getListProventos()}
                            </tbody>
                        </table>
                        :
                        <h4 className="text-white">Ops. Não há proventos registrados!</h4>
                    }
                </div>
            </div>
    );
};

export default memo(CardProventosExtended);