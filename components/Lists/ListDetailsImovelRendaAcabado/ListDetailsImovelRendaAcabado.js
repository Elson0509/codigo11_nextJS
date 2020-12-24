import Icon from '../../Icon/Icon'
import {numberToMetroQuadrado, getLinkMapFromEndereco, numberWithDots, numberWithPercentual} from '../../../util/Utilities'
import {OverlayTrigger, Popover} from 'react-bootstrap';
import ProgressBox from '../../ProgressBars/ProgressBox';

const ListImovelRendaAcabado = (props) => {
    const popover = (
        <Popover className={`popover-bg bg-${props.bgNumber || 'focus'}`} >
            <Popover.Title className="text-center">Características do imóvel {props.order}</Popover.Title>
            <Popover.Content>
                {props.imovel.caracteristica}
            </Popover.Content>
        </Popover>
    )

    return (
        <ul className="list-group">
            {props.imovel.nome && <li className="list-group-item">
                <span className="enfase">Nome: </span>
                {props.imovel.nome}
            </li>}
            {props.imovel.endereco && <li className="list-group-item">
                <span className="enfase">Endereço: <a target="_blank" rel="noopener noreferrer" aria-label="Abrir endereço no Google Maps" href={getLinkMapFromEndereco(props.imovel.endereco)}><Icon icon="map-marked-alt"/></a> </span>
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
            {typeof (props.imovel.porc_rec_fii) != "undefined"  && <li className="list-group-item">
                <span className="enfase">% Receita no FII: </span>
                {numberWithPercentual(props.imovel.porc_rec_fii)}
            </li>}
            {typeof (props.imovel.vacancia) != "undefined"  && <li className="list-group-item">
                <ProgressBox 
                    color={props.bgNumber}
                    comment={`Vacância: `}
                    textValue={numberWithPercentual(props.imovel.vacancia)}
                    value={props.imovel.vacancia}
                />                
            </li>}
            {typeof (props.imovel.inadimplencia) != "undefined" && <li className="list-group-item">
                <span className="enfase">Inadimplência: </span>
                {numberWithPercentual(props.imovel.inadimplencia)}
            </li>}
            {props.imovel.caracteristica && 
            <li className="list-group-item text-center">
                <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                    <button className={`mb-2 mr-2 btn btn-${props.bgNumber}`}>Caracteríticas</button>
                </OverlayTrigger>
            </li>}
        </ul>
    );
};

export default ListImovelRendaAcabado;