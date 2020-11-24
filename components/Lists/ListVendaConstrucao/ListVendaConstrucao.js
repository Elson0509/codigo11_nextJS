import {Fragment, memo} from 'react';
import CardAtivo from '../../Cards/CardAtivo'
import ListDetailsImovelVendaContrucao from '../ListDetailsImovelVendaConstrucao/ListDetailsImovelVendaContrucao'
import ListDetailsImovelVendaConstTotal from '../ListDetailsImovelVendaConstTotal/ListDetailsImovelRendaConstTotal'

const ListVendaContrucao = (props) => {
    return (
        <Fragment>
            {props.imoveis &&
                props.imoveis.length === 0 ? 
                    <h3 className="text-center p-2">Não há imóveis para serem exibidos</h3>
                    :
                    <Fragment>
                        {props.imoveis.map((imovel, ind) => (
                            <CardAtivo
                                bgNumber={props.theme}
                                order={ind+1}
                                key={`lvc${ind}`}
                                >
                                    <ListDetailsImovelVendaContrucao
                                        imovel={imovel}
                                        order={ind+1}
                                        bgNumber={props.theme}
                                    />
                            </CardAtivo>
                        ))}
                        {<CardAtivo
                            bgNumber="focus"
                            order="T"
                            >
                                <ListDetailsImovelVendaConstTotal imoveis={props.imoveis}/>
                            </CardAtivo>}
                    </Fragment>
            }
        </Fragment>
    );
};

export default memo(ListVendaContrucao);