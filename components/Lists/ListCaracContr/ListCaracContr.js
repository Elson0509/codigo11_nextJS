import {memo} from 'react';
import Icon from '../../Icon/Icon'

const ListCaracContr = (props) => {
    return (
        props.caracteristicas && props.caracteristicas.length > 0 ?
        <ul className={`list-group mb-4 ${props.addClasses}`}>
                <li className={`list-group-item active bg-light text-${props.themeColor} border-${props.themeColor}`}>
                    <span className="enfase">
                        <span className="font-number pr-2">
                            <Icon icon="file-contract"/>
                        </span>
                        Características contratuais - Imóveis para renda
                    </span>
                </li>
            {props.caracteristicas.map((carac, ind) => (
                <li className="list-group-item" key={`carc${ind}`}>
                    <span className="enfase">Nome: </span> {carac.nome}
                    <p><span className="enfase">Descricão: </span>{carac.descricao}</p>
                </li>
            ))}
        </ul>
        : null
    );
};

export default memo(ListCaracContr);