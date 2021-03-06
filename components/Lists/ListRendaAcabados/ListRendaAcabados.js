import {Fragment} from 'react';
import CardAtivo from '../../../components/Cards/CardAtivo'
import ListDetailsImovelRendaAcabado from '../ListDetailsImovelRendaAcabado/ListDetailsImovelRendaAcabado'
import ListDetailsRendaAcabTotal from '../ListDetailsRendaAcabTotal/ListDetailsRendaAcabTotal'

const ListRendaAcabados = (props) => {
    return (
        <Fragment>
            {props.imoveis &&
                props.imoveis.length === 0 ? 
                    <h3 className="text-center p-2">Não há imóveis para serem exibidos</h3>
                    :
                    <Fragment>
                        {props.imoveis.map((imovel, ind) => (
                            <CardAtivo
                                bgCard={props.theme}
                                bgNumber={props.theme}
                                order={ind+1}
                                key={`lra${ind}`}
                                >
                                    <ListDetailsImovelRendaAcabado
                                        imovel={imovel}
                                        order={ind+1}
                                        bgNumber={props.theme}
                                    />
                            </CardAtivo>
                        ))}
                        <CardAtivo
                            bgCard={props.theme}
                            bgNumber="focus"
                            order="T"
                            >
                                <ListDetailsRendaAcabTotal imoveis={props.imoveis}/>
                        </CardAtivo>
                    </Fragment>
            }
        </Fragment>
    );
};

export default ListRendaAcabados;