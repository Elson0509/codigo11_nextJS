import {useState} from 'react';
import Icon from '../Icon/Icon'
import {numberToMetroQuadrado, getLinkMapFromEndereco, numberWithDots, numberWithPercentual} from '../../util/Utilities'
import {Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import ProgressBox from '../ProgressBars/ProgressBox';

const ListImovelRendaAcabado = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false)

    const toggle = () => {
        setPopoverOpen( prevState => !prevState)
    }

    return (
        <ul className="list-group">
            {props.imovel.nome && <li className="list-group-item">
                <span className="enfase">Nome: </span>
                {props.imovel.nome}
            </li>}
            {props.imovel.endereco && <li className="list-group-item">
                <span className="enfase">Endereço: <a target="_blank" rel="noopener noreferrer" href={getLinkMapFromEndereco(props.imovel.endereco)}><Icon icon="map-marked-alt"/></a> </span>
                {props.imovel.endereco}
            </li>}
            {typeof (props.imovel.area) != "undefined"  && <li className="list-group-item">
                <span className="enfase">Área: </span>
                {numberToMetroQuadrado(props.imovel.area)}
            </li>}
            {typeof (props.imovel.unidades) != "undefined"  && <li className="list-group-item">
                <span className="enfase">Unidades: </span>
                {numberWithDots(props.imovel.unidades)}
            </li>}
            {typeof (props.imovel.vacancia) != "undefined"  && <li className="list-group-item">
                <ProgressBox 
                    color={props.bgNumber}
                    comment={`Vacância: ${numberWithPercentual(props.imovel.vacancia)}`}
                    value={props.imovel.vacancia}
                />                
            </li>}
            {typeof (props.imovel.inadimplencia) != "undefined" && <li className="list-group-item">
                <span className="enfase">Inadimplência: </span>
                {numberWithPercentual(props.imovel.inadimplencia)}
            </li>}
            {props.imovel.caracteristica && <li className="list-group-item text-center">
                <button className={`mb-2 mr-2 btn btn-${props.bgNumber}`} id={`${props.tipo}${props.order}`} onClick={toggle}>Caracteríticas</button>
                <Popover className={`popover-bg bg-${props.bgNumber}`} placement="left" isOpen={popoverOpen} target={`${props.tipo}${props.order}`} toggle={toggle}>
                    <PopoverHeader>Características do imóvel {props.order}</PopoverHeader>
                    <PopoverBody>
                        {props.imovel.caracteristica}
                    </PopoverBody>
                </Popover>
            </li>}
        </ul>
    );
};

export default ListImovelRendaAcabado;