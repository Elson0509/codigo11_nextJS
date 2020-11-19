import {
    ListGroup, 
    ListGroupItem 
} from 'react-bootstrap';
import classes from './Cards.module.css'

const CardListRelatorios = (props) => {
    const getListRela = () => {
        if(props.list){
            return props.list.map((item, ind) => (
                <a href={`https://fnet.bmfbovespa.com.br/fnet/publico/exibirDocumento?id=${item.documento_nr}&#toolbar=0`} target="_blank" rel="noopener noreferrer" key={`${props.title}${ind}`}>
                    <ListGroupItem tag="button" action>
                        <span className={`${classes.Enfase} link`}>
                            {item.data_ref} 
                        </span>
                    </ListGroupItem>
                </a>
            ))
        }
    }

    return (
        <ListGroup className="text-center">
            <ListGroupItem active tag="button" action className={props.bgTitleColor}>{props.title}</ListGroupItem>
            {
                props.list && props.list.length > 0 ?
                    getListRela()
                    :
                    <h4 className="h4 m-2">Este FII não possui ainda relatórios deste tipo!</h4>

            }
        </ListGroup>

    );
};

export default CardListRelatorios;