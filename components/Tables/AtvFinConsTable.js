import {memo, Fragment} from 'react';
import {IntegerNumberBrazilian, numberBrazilianMoney} from '../../util/Utilities'

const AtvFinConsTable = (props) => {
    let totalValor = 0;

    return (
        <table className="table table-hover table-sm table-striped over">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Valor</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.ativos.length > 0 && (
                        <Fragment>
                            {props.ativos.map((atv, ind) => {
                                totalValor+=atv.valor
                                return (
                                    <tr key={`atvFinCons${ind}`}>
                                        <th scope="row">{ind+1}</th>
                                        <td>{atv.tipo}</td>
                                        <td>{IntegerNumberBrazilian(atv.qtd)}</td>
                                        <td>{numberBrazilianMoney(atv.valor)}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <th scope="row" colSpan="3">Total</th>
                                <td>
                                    {numberBrazilianMoney(totalValor)}
                                </td>
                            </tr>
                        </Fragment>
                    )
                }
            </tbody>
        </table>
    );
};

export default memo(AtvFinConsTable);