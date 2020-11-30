import {memo} from 'react';
import {IntegerNumberBrazilian, IntegerAreaBrazilian, percentNumberBrazilian, equivalenciaCamposFutebol, sizeCampoFutebol, numberToMetroQuadrado} from '../../util/Utilities'
import { Fragment } from 'react';
import Icon from '../Icon/Icon'
import {OverlayTrigger, Popover} from 'react-bootstrap';
import classes from './Tables.module.css'

const AtvFisConsTable = (props) => {
    const areaTotal = props.ativos.reduce((acc, curr)=> {
        return acc + curr.area
    }, 0)

    const recTotal = props.ativos.reduce((acc, curr)=> {
        return acc + curr.porc_rec_fii
    }, 0)

    const tableRows = () => {
        return props.ativos.map((atv, ind) => {
            return (
                <tr key={`atvFisCons${ind}`}>
                    <th scope="row">{ind+1}</th>
                    <td>{atv.tipo}</td>
                    <td>{IntegerNumberBrazilian(atv.qtd)}</td>
                    <td>{IntegerAreaBrazilian(atv.area)}</td>
                    <td>{percentNumberBrazilian(atv.porc_rec_fii, 2)}</td>
                </tr>
            )
        })
    }

    const popoverObs = (
        <Popover className={`popover-bg bg-danger`} >
            <Popover.Title className="text-center">Observação</Popover.Title>
            <Popover.Content>
                <p>Apesar do total ser maior que 100%, este é o valor reportado pelo FII em seus relatórios, cabendo aqui apenas sua reprodução.</p>
            </Popover.Content>
        </Popover>
    )

    const popover = (
        <Popover className={`popover-bg bg-focus`} >
            <Popover.Title>Equivalência</Popover.Title>
            <Popover.Content>
                <h6>{equivalenciaCamposFutebol(areaTotal)}</h6>
                <p>(considerando um tamanho oficial de {numberToMetroQuadrado(sizeCampoFutebol)})</p>
            </Popover.Content>
        </Popover>
    )   

    return (
        <table className="table table-hover table-sm table-striped over">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Area</th>
                    <th scope="col">% Receita FII</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.ativos.length > 0 && (
                        <Fragment>
                            {tableRows()}
                            <tr>
                                <th scope="row" colSpan="3">Total</th>
                                <td><OverlayTrigger trigger="click" placement="top" overlay={popover}>
                                    <button className={`btn btn-link btn-no-outline ${classes.Icon_table}`}>
                                    <Icon icon="th-large"/>
                                    </button>
                                </OverlayTrigger> {IntegerAreaBrazilian(areaTotal)}</td>
                                <td>
                                    {
                                        recTotal > 100 &&
                                        <Fragment>
                                            <OverlayTrigger trigger="click" placement="top" overlay={popoverObs}>
                                                <button className={`btn btn-link btn-no-outline ${classes.Icon_table}`}>
                                                <Icon icon="question-circle"/>
                                                </button>
                                            </OverlayTrigger>
                                        </Fragment>
                                    }
                                    {`${percentNumberBrazilian(recTotal, 2)} `}
                                </td>
                            </tr>                            
                        </Fragment>
                    )
                }
            </tbody>
        </table>
    );
};

export default memo(AtvFisConsTable);