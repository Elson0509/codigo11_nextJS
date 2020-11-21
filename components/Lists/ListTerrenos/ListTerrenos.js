import {Fragment} from 'react';
import CardAtivo from '../../../components/Cards/CardAtivo'
import ListDetailsTerreno from '../../../components/Lists/ListDetailsTerreno/ListDetailsTerreno'
import ListDetailsTerrenoTotal from '../../../components/Lists/ListDetailsTerrenoTotal/ListDetailsTerrenoTotal'

const ListTerrenos = (props) => {

    return (
        <Fragment>
            {props.terrenos &&
                props.terrenos.length === 0 ? 
                    <h3 className="text-center p-2">Não há terrenos para serem exibidos</h3>
                    :
                    <Fragment>
                        {props.terrenos.map((terreno, ind) => (
                            
                            <CardAtivo
                                bgCard="primary"
                                bgNumber="primary"
                                order={ind+1}
                                key={`ter${ind}`}
                                >
                                    <ListDetailsTerreno
                                        terreno={terreno}
                                        order={ind+1}
                                        bgNumber="primary"
                                    />
                                </CardAtivo>
                        ))}
                        <CardAtivo
                            bgCard="primary"
                            bgNumber="focus"
                            order="T"
                            >
                                <ListDetailsTerrenoTotal
                                    terrenos={props.terrenos}/>
                            </CardAtivo>
                    </Fragment>
            }
        </Fragment>
    );
};

export default ListTerrenos;