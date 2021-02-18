import {useRef, useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import axios from '../../util/axios-base'
import jwt_decode from 'jwt-decode'
import {
    toast,
    ToastContainer
} from 'react-toastify';
import classes from './Modal.module.css'

const ModalConfiguration = (props) => {
    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsvalid] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const filePickerRef = useRef()

    useEffect(()=> {
        if(!file){
            return;
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }, [file])

    const pickedHandler = event => {
        let pickedFile
        if(event.target.files && event.target.files.length === 1){
            pickedFile = event.target.files[0]
            setFile(pickedFile)
            setIsvalid(true)
        }else{
            setIsvalid(false)
        }
    }

    const updateNotification = () => {
        //verifying if the user change his/her option
        if(props.user.notification != props.notification){
            const decoded = jwt_decode(localStorage.userToken)
            const config = {
                token: localStorage.userToken,
                id: decoded.uid,
                notification: props.notification
            }
            axios.patch(`/user/update/notification`, config)
            .then(res=> {
                toast.info(`Alteração de configuração registrada!`);
                props.updateUser({
                    ...props.user,
                    notification: props.notification
                    
                })
            })
            .catch(err => {
                setErrorMessage('Ops. Algo deu errado.')
            })
        }
    }

    const submit = (ev) => {
        ev.preventDefault();
        const token = localStorage.userToken
        if(token)
            updateNotification()
        if(previewUrl && token){
            const decoded = jwt_decode(token)
            const formData = new FormData()
            formData.append('token', token);
            formData.append('profile_pic', file, file.name);
            axios.post(`/uploadPic/${decoded.uid}`,formData)
                .then(res => {
                    if(res.data==='File saved')
                        toast.info(`Imagem enviada com sucesso! Espere alguns minutos enquanto atualizo. :)`);
                    if(res.data.type && res.data.type==='size')
                        toast.error(`O tamanho da imagem está incompatível. Mande algo menor.`);
                    if(res.data.type && res.data.type==='type')
                        toast.error(`O tipo do arquivo está incompatível. Envie do tipo .jpg ou .png`);
                })
                .catch(err => {
                    setIsvalid(false)
                    setErrorMessage('Ops. Algo deu errado.')
                })
        }
        props.toggle()
    }

    const pickImageHandler = () => {
        filePickerRef.current.click()
    }

    return (
        <span className="d-inline-block mb-2 mr-2">
            <ToastContainer/>
            <Modal show={props.modal} onHide={props.toggle}>
                <Modal.Header toggle={props.toggle}>
                    <Modal.Title>
                    Configurações
                    </Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                    <div className="form-group text-center">
                        <input 
                            id={props.id} 
                            ref={filePickerRef}
                            style={{display: 'none'}} 
                            type="file" 
                            accept=".jpg,.png,.jpeg"
                            onChange={pickedHandler}
                            name="profile_pic"
                        />
                        <div className={`${classes.Image_upload} text-center`}>
                            <div className={`${classes.Image_upload_preview} zero_auto`}>
                                {previewUrl && <img src={previewUrl} alt="Preview"/>}
                                {!previewUrl && <p>Por favor selecione uma imagem (1 Mb máx.).</p>}
                            </div>
                            <button 
                                type="button" 
                                className="btn btn-info" 
                                onClick={pickImageHandler}>Escolha imagem</button>
                        </div>
                    </div>
                    <div className="form-group text-center">
                        <input
                            className="form-check-input"
                            name="notificação"
                            type="checkbox"
                            checked={props.notification}
                            onChange={props.notificationChange}/>
                        <label className="form-check-label">
                            Receber notificações por email
                        </label>
                    </div>
                    {
                        !isValid && errorMessage &&
                        <div className="alert alert-warning" role="alert">
                            {errorMessage}
                        </div>
                    }
                    </Modal.Body>
                    <Modal.Footer>
                        <button 
                            type="submit" 
                            className="btn btn-success" 
                            onClick={submit}
                            >Salvar
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-danger" 
                            onClick={props.toggle}
                            >Cancelar
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </span>
    );
};

export default ModalConfiguration;