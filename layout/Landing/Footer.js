import {memo, useState} from 'react';
import ModalTermos from '../../components/Modals/ModalTermos'
import ModalPrivacidade from '../../components/Modals/ModalPrivacidade'
import ModalLoading from '../../components/Modals/ModalLoading'
import classes from './Landing.module.css'

import {
    faFacebook,
    faTwitter
} from '@fortawesome/free-brands-svg-icons'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Footer = () => {
    const [modalTermos, setModalTermos] = useState(false)
    const [modalPrivacidade, setModalPrivacidade] = useState(false)

    return (
        <footer className={`${classes.Footer} bg-light`}>
            <ModalTermos modal={modalTermos} toggle={()=> setModalTermos(prev=>!prev)}/>
            <ModalPrivacidade modal={modalPrivacidade} toggle={()=> setModalPrivacidade(prev=>!prev)}/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 text-center text-lg-left my-auto">
                    <ul className="list-inline mb-2">
                        <li className="list-inline-item">
                            <a href="#">Sobre</a>
                        </li>
                        <li className="list-inline-item">&sdot;</li>
                        <li className="list-inline-item">
                            <a href="mailto:suporte@codigo11.com.br">Contato</a>
                        </li>
                        <li className="list-inline-item">&sdot;</li>
                        <li className="list-inline-item">
                            <a className="link" onClick={()=> setModalTermos(prev=>!prev)}>Termos de Uso</a>
                        </li>
                        <li className="list-inline-item">&sdot;</li>
                        <li className="list-inline-item">
                            <a className="link" onClick={()=> setModalPrivacidade(prev=>!prev)}>Política de privacidade</a>
                        </li>
                    </ul>
                    <p className="text-muted small mb-4 mb-lg-0">&copy; Codigo11 2020. Todos os direitos reservados.</p>
                    </div>
                    <div className="col-lg-6 text-center text-lg-right my-auto">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item mr-3">
                                <a href="https://www.facebook.com/Codigo11-116946256700529" target="_blank" rel="noopener noreferrer" aria-label="facebook">
                                    <FontAwesomeIcon icon={faFacebook} size="2x"/>
                                </a>
                            </li>
                            <li className="list-inline-item mr-3">
                                <a href="https://twitter.com/Codigo114" target="_blank" rel="noopener noreferrer" aria-label="twitter">
                                    <FontAwesomeIcon icon={faTwitter} size="2x"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default memo(Footer);