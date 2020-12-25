import {memo} from 'react';
import {Modal} from 'react-bootstrap';
import LoadingHouse from '../Loading/LoadingHouse'
import classes from './Modal.module.css'

const ModalLoading = (props) => {
    return (
        <Modal show={props.modal} size="sm" centered backdrop="static" onHide={props.toggle}>
            <LoadingHouse/>
            {props.commentary && <h5 className={classes.Commentary_loading}>{props.commentary}</h5>}
        </Modal>
        
    );
};

export default memo(ModalLoading);