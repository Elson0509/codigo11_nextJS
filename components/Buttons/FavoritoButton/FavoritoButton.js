import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faQuestionCircle,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classes from './FavoritoButton.module.css'
library.add(
    faQuestionCircle,
    faCheckCircle
);

const FavoritoButton = (props) => {
    const favStyle = [classes.Favorito, props.seguindo ? "favorito-active" : ""].join(' ');

    return (
        <div className={favStyle} onClick={props.onClick}>
            {props.seguindo ? <FontAwesomeIcon icon={faCheckCircle}/> : <FontAwesomeIcon icon={faQuestionCircle}/>}
            <h4>{props.seguindo ? "Seguindo" : "Seguir?"}</h4>
        </div>
    );
};

export default FavoritoButton;