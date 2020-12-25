import {memo, Fragment, useState} from 'react';
import {numberBrazilianMoney, decimalNumberBrazilian,
        percentNumberBrazilian, valueToRes, IntegerNumberBrazilian} from '../../util/Utilities'
import Icon from '../Icon/Icon'
import { useRouter } from 'next/router'
import ModalLoading from '../Modals/ModalLoading'

const SearchTable = (props) => {
    const {fiis} = props
    const [sortConfig, setSortConfig] = useState(null);
    let sortedFiis = [...fiis]
    const [showModalLoading, setShowModalLoading] = useState(false)
    const [LoadingMessage, setLoadingMessage] = useState('')
    const router = useRouter()

    const showLoadingModal = name => {
        setLoadingMessage(`Carregando perfil de ${name}...`)
        setShowModalLoading(true)
        router.push(`/${name}/profile`)
    }

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

    const getSortIcon = (key) => {
        if (!sortConfig || sortConfig.key !== key)
            return <Icon icon='sort'/>
        
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending')
            return <Icon icon='sort-up'/>
        
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'descending')
            return <Icon icon='sort-down'/>
    }

    return (
        props.fiis && 
            <div className="over">
                <ModalLoading commentary={LoadingMessage} modal={showModalLoading}/>
                <table className="table table-striped text-center table-hover">
                    <caption>Lista de fundos</caption>
                    <thead>
                        <tr>
                            <th scope="col" className={sortConfig && sortConfig.key ==='codfii' ? 'table-primary' : ''} onClick={() => requestSort('codfii')}>
                                Código
                                <br/>
                                {getSortIcon('codfii')}
                            </th>
                            <th scope="col" className={sortConfig && sortConfig.key ==='razao_social' ? 'table-primary' : ''} onClick={() => requestSort('razao_social')}>
                                Nome
                                <br/>
                                {getSortIcon('razao_social')}
                            </th>
                            <th scope="col" className={sortConfig && sortConfig.key ==='descricao' ? 'table-primary' : ''} onClick={() => requestSort('descricao')}>
                                Segmento
                                <br/>
                                {getSortIcon('descricao')}
                            </th>
                            <th scope="col" className={sortConfig && sortConfig.key ==='cotacao' ? 'table-primary' : ''} onClick={() => requestSort('cotacao')}>
                                Cotação
                                <br/>
                                {getSortIcon('cotacao')}
                            </th>
                            <th scope="col" className={sortConfig && sortConfig.key ==='tipo_gestao' ? 'table-primary' : ''} onClick={() => requestSort('tipo_gestao')}>
                                Gestão
                                <br/>
                                {getSortIcon('tipo_gestao')}
                            </th>
                            <th scope="col" className={sortConfig && sortConfig.key ==='pat_liq' ? 'table-primary' : ''} onClick={() => requestSort('pat_liq')}>
                                Pat. Líq
                                <br/>
                                {getSortIcon('pat_liq')}
                            </th>
                            <th scope="col" className={sortConfig && sortConfig.key ==='valor_mercado' ? 'table-primary' : ''} onClick={() => requestSort('valor_mercado')}>
                                Valor de Mercado
                                <br/>
                                {getSortIcon('valor_mercado')}
                            </th>
                            <th scope="col" className={sortConfig && sortConfig.key ==='numero_negocios' ? 'table-primary' : ''} onClick={() => requestSort('numero_negocios')}>
                                Negócios
                                <br/>
                                {getSortIcon('numero_negocios')}
                            </th>
                            <th scope="col" className={sortConfig && sortConfig.key ==='bens_qtt' ? 'table-primary' : ''} onClick={() => requestSort('bens_qtt')}>
                                Ativos Fís.
                                <br/>
                                {getSortIcon('bens_qtt')}
                            </th>
                            <th scope="col" className={sortConfig && sortConfig.key ==='dy_medio' ? 'table-primary' : ''} onClick={() => requestSort('dy_medio')}>
                                Yield
                                <br/>
                                {getSortIcon('dy')}
                            </th>
                            <th scope="col" className={sortConfig && sortConfig.key ==='pvp' ? 'table-primary' : ''} onClick={() => requestSort('pvp')}>
                                P/VP
                                <br/>
                                {getSortIcon('pvp')}
                            </th>
                            <th scope="col" className={sortConfig && sortConfig.key ==='vpc' ? 'table-primary' : ''} onClick={() => requestSort('vpc')}>
                                VPC
                                <br/>
                                {getSortIcon('vpc')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                {sortedFiis.length > 0 ? (
                    <Fragment>
                        {sortedFiis.map((el, ind) => {
                            return (
                                <tr key={ind} className="link">
                                    <th scope="row" className={sortConfig && sortConfig.key ==='codfii' ? 'table-primary' : ''}>
                                        <a className="btn btn-link" role="button" aria-label={`Perfil de ${el.codfii}`} onClick={()=> showLoadingModal(el.codfii)}>{el.codfii}</a>
                                    </th>
                                    <td className={sortConfig && sortConfig.key ==='razao_social' ? 'table-primary' : ''}>{el.razao_social}</td>
                                    <td className={sortConfig && sortConfig.key ==='descricao' ? 'table-primary' : ''}>{el.descricao}</td>
                                    <td className={sortConfig && sortConfig.key ==='cotacao' ? 'table-primary' : ''}>{el.cotacao ? numberBrazilianMoney(el.cotacao) : 'N/A'}</td>
                                    <td className={sortConfig && sortConfig.key ==='tipo_gestao' ? 'table-primary' : ''}>{el.tipo_gestao ? 'Ativa' : 'Passiva'}</td>
                                    <td className={sortConfig && sortConfig.key ==='pat_liq' ? 'table-primary' : ''}>{valueToRes(el.pat_liq)}</td>
                                    <td className={sortConfig && sortConfig.key ==='valor_mercado' ? 'table-primary' : ''}>{el.valor_mercado ? valueToRes(el.valor_mercado) : 'N/A'}</td>
                                    <td className={sortConfig && sortConfig.key ==='numero_negocios' ? 'table-primary' : ''}>{el.numero_negocios ? IntegerNumberBrazilian(el.numero_negocios) : 'N/A'}</td>
                                    <td className={sortConfig && sortConfig.key ==='bens_qtt' ? 'table-primary' : ''}>{el.bens_qtt ? IntegerNumberBrazilian(el.bens_qtt) : 0}</td>
                                    <td className={sortConfig && sortConfig.key ==='dy_medio' ? 'table-primary' : ''}>{el.dy_medio ? percentNumberBrazilian(el.dy_medio) : 0}</td>
                                    <td className={sortConfig && sortConfig.key ==='pvp' ? 'table-primary' : ''}>{el.pvp ? decimalNumberBrazilian(el.pvp) : 0}</td>
                                    <td className={sortConfig && sortConfig.key ==='vpc' ? 'table-primary' : ''}>{el.vpc ? numberBrazilianMoney(el.vpc) : 0}</td>
                                </tr>
                            )
                        })}
                    </Fragment>
                )
                :
                    <Fragment>
                        <td className="table-danger" colSpan='12'>Nenhum fundo atende aos critérios.</td>
                    </Fragment>
                }
                    </tbody>
                </table>
            </div>
    );
};

export default memo(SearchTable);