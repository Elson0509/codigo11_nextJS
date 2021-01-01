import {memo, useState} from 'react';
import classes from './FooterAdmin.module.css'
import {
    faFacebook,
    faTwitter
} from '@fortawesome/free-brands-svg-icons'
import ModalContact from '../../components/Modals/ModalContact'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const FooterAdmin = () => {
    const [showModalContact, setShowModalContact] = useState(false)

    return (
        <footer className={classes.FooterAdmin}>
            <ModalContact modal={showModalContact} toggle={()=> setShowModalContact(prev=>!prev)}/>
            <div>
                <ul className="list-inline mb-2">
                    <li className="list-inline-item mr-3">
                        <a href="https://www.facebook.com/Codigo11-116946256700529" className="text-white" target="_blank" rel="noopener noreferrer" aria-label="facebook">
                            <FontAwesomeIcon icon={faFacebook} size="2x"/>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://twitter.com/Codigo114" className="text-white" target="_blank" rel="noopener noreferrer" aria-label="twitter">
                            <FontAwesomeIcon icon={faTwitter} size="2x"/>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="py-2">
                <button type="button" onClick={()=>setShowModalContact(true)} className="btn btn-link text-white">Contato</button>
            </div>
            <div>
                <p>Copyright Codigo11, &copy; 2020</p>
            </div>
        </footer>
    );
};

export default memo(FooterAdmin);