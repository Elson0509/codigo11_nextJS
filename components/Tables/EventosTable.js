import  {memo, Fragment} from 'react';
import {numberBrazilianMoney, revertData} from '../../util/Utilities'

const EventosTable = (props) => {
    return (
        <table className="table table-hover table-sm table-striped over">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Data</th>
                    <th scope="col">Evento</th>
                    <th scope="col">Preço da Cota</th>
                    <th scope="col">Valor em caixa</th>
                    <th scope="col">Patrimônio</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.eventos.length > 0 && (
                        <Fragment>
                            {props.eventos.map( (evt, ind) => (
                                    <tr key={`evt${ind}`}>
                                        <td>{revertData(evt.data)}</td>
                                        <td>{evt.tipo}</td>
                                        <td>{numberBrazilianMoney(evt.preco_cota)}</td>
                                        <td>{numberBrazilianMoney(evt.caixa_alugueis + evt.caixa_regular)}</td>
                                        <td>{numberBrazilianMoney(evt.patrimonio)}</td>
                                    </tr>
                                )
                            )}
                        </Fragment>
                    )
                }
            </tbody>
        </table>
    );
};

export default memo(EventosTable);