import {IntegerNumberBrazilian, numberBrazilianMoney} from '../../util/Utilities'
import { Fragment, memo } from 'react';

const AtvFinTable = (props) => {
    let total = 0;

    return (
        <table className="table table-hover table-sm table-striped over">
            <thead className="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Emissor</th>
                <th scope="col" className="text-center">Quantidade</th>
                <th scope="col">Preço Médio</th>
                <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.ativos.length > 0 && (
                        <Fragment>
                            {props.ativos.map((atv, ind) => {
                                total+=atv.valor
                                return (
                                    <tr key={ind}>
                                        <th scope="row">{ind+1}</th>
                                        <td>{atv.emissor}</td>
                                        <td className="text-center">{IntegerNumberBrazilian(atv.qtd)}</td>
                                        <td>{atv.qtd !== 0 && atv.valor !== 0 && atv.valor/atv.qtd > 0.0099 ? numberBrazilianMoney(atv.valor/atv.qtd) : "---"}</td>
                                        <td>{numberBrazilianMoney(atv.valor)}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <th scope="row" colSpan="4">Total</th>
                                <td>{numberBrazilianMoney(total)}</td>
                            </tr>
                        </Fragment>
                    )
                }
            </tbody>
        </table>
    );
};

export default memo(AtvFinTable);