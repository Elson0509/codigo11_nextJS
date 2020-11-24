import {Fragment, memo} from 'react';
import CardAtivo from '../../Cards/CardAtivo'
import ListDetailsVendaAcabado from '../ListDetailsVendaAcabado/ListDetailsVendaAcabado'
import ListDetailsVendaAcabTotal from '../ListDetailsVendaAcabTotal/ListDetailsVendaAcabTotal'

const ListVendaAcabados = (props) => {
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
                                key={`lva${ind}`}
                                >
                                    <ListDetailsVendaAcabado
                                        imovel={imovel}
                                        order={ind+1}
                                        bgNumber={props.theme}
                                    />
                            </CardAtivo>
                        ))}
                        <CardAtivo
                            bgNumber="focus"
                            order="T"
                            >
                                <ListDetailsVendaAcabTotal theme={props.theme} imoveis={props.imoveis}/>
                        </CardAtivo>
                    </Fragment>
            }
        </Fragment>
    );
};

export default memo(ListVendaAcabados);