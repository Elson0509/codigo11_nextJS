import {
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';
import ListGroupItemProfile from './ListGroupItemProfile/ListGroupItemProfile'
import ListGroupItemProfileStar from './ListGroupItemProfile/ListGroupItemProfileStar'
import ShareBar from '../Bars/ShareBar/ShareBar'

const ProfileTitleList = (props) => {
    return (
        <ListGroup className={props.segmento?.color ? `text-${props.segmento?.color}` : "text-primary"}>
            {props.segmento?.descricao && <ListGroupItemProfile color={props.segmento.color} label="Segmento: " text={props.segmento.descricao}/>}
            {props.codigo && <ListGroupItemProfile color={props.segmento.color} label="Código: " text={props.codigo}/>}
            {props.cnpj && <ListGroupItemProfile color={props.segmento.color} label="CNPJ: " text={props.cnpj}/>}
            {props.site && <ListGroupItemProfile color={props.segmento.color} label="Site: " text={props.site}/>}
            {props.data_func && <ListGroupItemProfile color={props.segmento.color} label="Data de funcionamento: " text={props.data_func}/>}
            {!isNaN(props.idade) && <ListGroupItemProfile color={props.segmento.color} label="Tempo de funcionamento: " text={props.idade > 1 ? `${props.idade} anos` : `${props.idade} ano`}/>}
            {props.tipoGestao && <ListGroupItemProfile color={props.segmento.color} label="Tipo de gestão: " text={props.tipoGestao}/>}
            {!isNaN(props.notaUsuario) && <ListGroupItemProfileStar color={props.segmento.color} changeRating={props.changeRating} label="Sua nota: " rating={props.notaUsuario}/>}
            {!isNaN(props.notaComunidade) && <ListGroupItemProfileStar color={props.segmento.color} label="Nota da comunidade: " rating={props.notaComunidade}/>}
            <ListGroupItem><ShareBar fiiname={props.fiiname}/></ListGroupItem>
        </ListGroup>
    );
};

export default ProfileTitleList;