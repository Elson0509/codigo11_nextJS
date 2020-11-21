import {useState} from 'react';
import Icon from '../Icon/Icon'
import {numberToMetroQuadrado, numberWithPercentual, equivalenciaCamposFutebol, sizeCampoFutebol, percentNumberBrazilian} from '../../util/Utilities'
import {Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import ProgressBox from '../ProgressBars/ProgressBox';

const ListDetailsImovelRendaAcabTotal = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false)

    const toggle = () => {
        setPopoverOpen( prevState => !prevState)
    }

    const percTotalReceita = () => {
        let total = 0;
        props.imoveis.forEach(imovel => {
            total+=imovel.porc_rec_fii
        })
        return total
    }

    const areaTotal = () => {
        let total = 0;
        props.imoveis.forEach(imovel => {
            total+=imovel.area
        })
        return total
    }

    const vacanciaMedia = () => {
        let total = 0;
        props.imoveis.forEach(imovel => {
            total+=imovel.area * imovel.vacancia
        })
        return total/areaTotal()
    }

    const vacanciaFinanceira = () => {
        let total = 0;
        props.imoveis.forEach(imovel => {
            total+=imovel.porc_rec_fii * imovel.vacancia
        })
        return total/100
    }

    const inadimplenciaMedia = () => {
        let total = 0;
        props.imoveis.forEach(imovel => {
            total+=imovel.area * imovel.inadimplencia
        })
        return total/areaTotal()
    }

    return (
        <ul className="list-group">
            <li className="list-group-item">
                <span className="enfase">Quantidade de imóveis: </span>
                {props.imoveis.length}
            </li>
            <li className="list-group-item">
                <span className="enfase">Percentual total na receita: </span>
                {numberWithPercentual(percTotalReceita())}
            </li>
            <li className="list-group-item">
                <ProgressBox 
                    color="focus"
                    comment={`Vacância por m²: ${numberWithPercentual(vacanciaMedia())}`}
                    value={vacanciaMedia()}
                />                
            </li>
            <li className="list-group-item">
                <ProgressBox 
                    color="focus"
                    comment={`Vacância Financeira: ${percentNumberBrazilian(vacanciaFinanceira(), 2)}`}
                    value={vacanciaFinanceira()}
                />                
            </li>
            <li className="list-group-item">
                <ProgressBox 
                    color="focus"
                    comment={`Inadimplência por m²: ${numberWithPercentual(inadimplenciaMedia())}`}
                    value={inadimplenciaMedia()}
                />                
            </li>
            <li className="list-group-item">
                <span className="enfase">Área Total: <Icon icon="th-large" id={`imovelTotal`} clicked={toggle} iconId="imovelTotal"/> </span>
                {numberToMetroQuadrado(areaTotal())}
                <Popover className={`popover-bg bg-focus`} placement="left" isOpen={popoverOpen} target={`imovelTotal`} toggle={toggle}>
                    <PopoverHeader>Equivalência</PopoverHeader>
                    <PopoverBody>
                        <h6>{equivalenciaCamposFutebol(areaTotal())}</h6>
                        <p>(considerando um tamanho oficial de {numberToMetroQuadrado(sizeCampoFutebol)})</p>
                    </PopoverBody>
                </Popover>
            </li>
        </ul>
    );
};

export default ListDetailsImovelRendaAcabTotal;