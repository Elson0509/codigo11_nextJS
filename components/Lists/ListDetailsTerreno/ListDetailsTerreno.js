import Icon from '../../Icon/Icon'
import {numberToMetroQuadrado, numberWithPercentual, getLinkMapFromEndereco} from '../../../util/Utilities'
import {Popover, OverlayTrigger} from 'react-bootstrap';

const ListDetailsTerreno = (props) => {
    const popover = (
        <Popover className={`popover-bg bg-${props.bgNumber || 'focus'}`} >
            <Popover.Title className="text-center">Características do terreno {props.order}</Popover.Title>
            <Popover.Content>
                {props.terreno.caracteristica}
            </Popover.Content>
        </Popover>
    )

    return (
        <ul className="list-group">
            <li className="list-group-item ">
                <span className="enfase">Endereço: <a target="_blank" rel="noopener noreferrer" href={getLinkMapFromEndereco(props.terreno.endereco)}><Icon icon="map-marked-alt"/></a> </span>
                {props.terreno.endereco}
            </li>
            <li className="list-group-item ">
                <span className="enfase">Percentual na receita: </span>
                {numberWithPercentual(props.terreno.porc_rec_fii)}
            </li>
            <li className="list-group-item ">
                <span className="enfase">Área: </span>
                {numberToMetroQuadrado(props.terreno.area)}
            </li>
            <li className="list-group-item text-center ">
                <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                    <button className={`mb-2 mr-2 btn btn-${props.bgNumber}`}>Caracteríticas</button>
                </OverlayTrigger>
            </li>
        </ul>
    );
};

export default ListDetailsTerreno;