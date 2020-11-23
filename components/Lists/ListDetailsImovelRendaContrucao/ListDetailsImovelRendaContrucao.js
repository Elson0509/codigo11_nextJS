import Icon from '../../Icon/Icon'
import {numberToMetroQuadrado, getLinkMapFromEndereco, numberWithDots, numberWithPercentual} from '../../../util/Utilities'
import {OverlayTrigger, Popover} from 'react-bootstrap';
import ProgressBox from '../../ProgressBars/ProgressBox';

const ListImovelRendaAcabado = (props) => {
    const ObraSituation = () => {
        return props.imovel.porc_obra_realizado >= props.imovel.porc_obra_previsto ? <p className="font-weight-bold">Obra EM DIA.</p> : <p className="font-weight-bold">Obra ATRASADA.</p>
    }   

    const CustosSituation = () => {
        return props.imovel.custo_obra_realizado <= props.imovel.custo_obra_previsto ? <p className="font-weight-bold">Custos DE ACORDO com o planejado.</p> : <p className="font-weight-bold">Custos ACIMA do planejado.</p>
    }
    
    const popover = (
        <Popover className={`popover-bg bg-${props.bgNumber || 'focus'}`} >
            <Popover.Title className="text-center">Características do terreno {props.order}</Popover.Title>
            <Popover.Content>
                <p className="font-weight-bold">{props.imovel.caracteristica}</p>
                {typeof (props.imovel.custo_obra_realizado) != "undefined"  && ObraSituation()}
                {typeof (props.imovel.porc_obra_realizado) != "undefined"  && CustosSituation()}
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
            <li className="list-group-item">
                <span className="enfase">Custo de obra realizada: </span>
                {"R$ " + numberWithDots(props.imovel.custo_obra_realizado)}
            </li>
            <li className="list-group-item">
                <span className="enfase">Custo de obra prevista para o momento: </span>
                {"R$ " + numberWithDots(props.imovel.custo_obra_previsto)}
            </li>
            {typeof (props.imovel.porc_vendido) != "undefined"  && <li className="list-group-item">
                <ProgressBox 
                    color={props.bgNumber}
                    comment={`Vacância: `}
                    textValue={numberWithPercentual(props.imovel.vacancia)}
                    value={props.imovel.porc_vendido}
                />                
            </li>}
            <li className="list-group-item">
                <ProgressBox 
                    color={props.bgNumber}
                    comment={`% Obra realizada: `}
                    textValue={numberWithPercentual(props.imovel.porc_obra_realizado)}
                    value={props.imovel.porc_obra_realizado}
                />                
            </li>
            <li className="list-group-item">
                <ProgressBox 
                    color={props.bgNumber}
                    comment={`% Obra prevista para o momento: `}
                    textValue={numberWithPercentual(props.imovel.porc_obra_previsto)}
                    value={props.imovel.porc_obra_previsto}
                />                
            </li>
            {props.imovel.caracteristica && 
            <li className="list-group-item text-center">
                <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                    <button className={`mb-2 mr-2 btn btn-${props.bgNumber}`}>Caracteríticas</button>
                </OverlayTrigger>
            </li>}
        </ul>
    );
};

export default ListImovelRendaAcabado;