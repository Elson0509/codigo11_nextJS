import {memo, Fragment} from 'react';
import CardAtivo from '../../Cards/CardAtivo'
import ListDetailsImovelRendaContrucao from '../ListDetailsImovelRendaContrucao/ListDetailsImovelRendaContrucao'
import ListDetailsImovelRendaConstTotal from '../ListDetailsImovelRendaConstTotal/ListDetailsImovelRendaConstTotal'

const ListRendaConstrucao = (props) => {
    return (
        <Fragment>
            {props.imoveis &&
                props.imoveis.length === 0 ? 
                    <h3 className="text-center p-2">Não há imóveis para serem exibidos</h3>
                    :
                    <Fragment>
                        {props.imoveis.map((imovel, ind) => (
                            <CardAtivo
                                bgNumber="warning"
                                order={ind+1}
                                key={`lrc${ind}`}
                                >
                                    <ListDetailsImovelRendaContrucao
                                        imovel={imovel}
                                        order={ind+1}
                                        bgNumber="warning"
                                        type="irc"
                                    />
                            </CardAtivo>
                        ))}
                        {<CardAtivo
                            bgNumber="focus"
                            order="T"
                            >
                                <ListDetailsImovelRendaConstTotal imoveis={props.imoveis}/>
                            </CardAtivo>}
                    </Fragment>
            }
        </Fragment>
    );
};

export default memo(ListRendaConstrucao);