import {memo, Fragment, useState} from 'react';
import {revertData} from '../../util/Utilities'
import Icon from '../Icon/Icon'

const EventosPageTable = (props) => {
    const {eventos} = props
    const [sortConfig, setSortConfig] = useState(null);
    let sortedFiis = [...eventos]

    const requestSort = key => {
        const direction = sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending'
        setSortConfig({ key, direction });
    }

    if(sortConfig){
        sortedFiis.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
              }
              if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
              }
              return 0;
        })
    }

    const rowClickHandler = (nr_doc) => {
        const win = window.open(`https://fnet.bmfbovespa.com.br/fnet/publico/exibirDocumento?id=${nr_doc}&#toolbar=0`, '_blank')
        win.focus()
    }

    const getSortIcon = (key) => {
        if (!sortConfig || sortConfig.key !== key)
            return <Icon icon='sort'/>
        
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending')
            return <Icon icon='sort-up'/>
        
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'descending')
            return <Icon icon='sort-down'/>
    }

    return (
        props.eventos && 
            <div className="over">
                <table className="table table-striped text-center table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className={sortConfig && sortConfig.key ==='created_at' ? 'table-primary' : ''} onClick={() => requestSort('created_at')}>
                                Data
                                <br/>
                                {getSortIcon('created_at')}
                            </th>
                            <th scope="col" className={sortConfig && sortConfig.key ==='codigo' ? 'table-primary' : ''} onClick={() => requestSort('codigo')}>
                                Codigo
                                <br/>
                                {getSortIcon('codigo')}
                            </th>
                            <th scope="col" className={sortConfig && sortConfig.key ==='nome_fii' ? 'table-primary' : ''} onClick={() => requestSort('nome_fii')}>
                                Fundo
                                <br/>
                                {getSortIcon('nome_fii')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                {sortedFiis.length > 0 ? (
                    <Fragment>
                        {sortedFiis.map((el, ind) => {
                            return (
                                <tr key={ind} onClick={() => rowClickHandler(el.nr_documento)} className="link">
                                    <th scope="row" className={sortConfig && sortConfig.key ==='created_at' ? 'table-primary' : ''}>{revertData(el.created_at)}</th>
                                    <td className={sortConfig && sortConfig.key ==='codigo' ? 'table-primary' : ''}>{el.codigo}</td>
                                    <td className={sortConfig && sortConfig.key ==='nome_fii' ? 'table-primary' : ''}>{el.nome_fii}</td>
                                </tr>
                            )
                        })}
                    </Fragment>
                )
                :
                    <Fragment>
                        <td className="table-danger" colSpan='3'>Não há eventos disponíveis.</td>
                    </Fragment>
                }
                    </tbody>
                </table>
            </div>
    );
};

export default memo(EventosPageTable);