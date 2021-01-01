import {useState, Fragment} from 'react';
import {Modal} from 'react-bootstrap';
import axios from '../../util/axios-base'
import Spinner from '../Loading/Spinner'
import PostEditor from '../Forum/PostEditor'

const ModalContact = (props) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [disableForm, setDisableForm] = useState(false)

    const commentChangedHandler = (ev) => {
        if(ev.target.value.length <= 1000)
            setMessage(ev.target.value)
    }

    const buttonClickHandler = (ev) => {
        ev.preventDefault()
        if(!message || !email || !subject){
            setErrorMessage('Não deixe nenhum campo vazio')
            setSuccessMessage('')
        }
        else{
            setErrorMessage('')
            const path = `/contact/send`
            axios.post(path, {
                message,
                email,
                subject
            }).then(res => {
                setSuccessMessage('Mensagem postada!');
                setDisableForm(true)
            }
            ).catch(err=>{
                setErrorMessage('Ops, um erro ocorreu. Mande um email para suporte@codigo11.com.br')
            })
        }
    }

    return (
        <span className="d-inline-block mb-2 mr-2">
            <Modal show={props.modal} onHide={props.toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Contato
                    </Modal.Title>
                </Modal.Header>
                    <form>
                        <Modal.Body>
                            <div className="form-group">
                                <label htmlFor="email_contact">Email:</label>
                                <input 
                                    disabled={disableForm}
                                    name="email_contact" 
                                    type="email" 
                                    className="form-control" 
                                    id="email_contact" 
                                    value={email}
                                    onChange={(ev) => setEmail(ev.target.value)}
                                    aria-describedby="email" 
                                    placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject_contact">Motivo:</label>
                                <select 
                                    disabled={disableForm}
                                    className="form-control" 
                                    id="subject_contact" 
                                    aria-describedby="motivo"
                                    placeholder="Selecione o motivo"
                                    value={subject}
                                    onChange={(ev) => setSubject(ev.target.value)}>
                                        <option value=""></option>
                                        <option value="Sugestão">Sugestão</option>
                                        <option value="Crítica">Crítica</option>
                                        <option value="Reportar erro">Reportar erro</option>
                                        <option value="Elogio">Elogio</option>
                                        <option value="Dúvida">Dúvida</option>
                                        <option value="Outro">Outro</option>
                                </select>
                            </div>
                            <PostEditor 
                                disableForm={disableForm}
                                name_button="Enviar" 
                                placeholder="Digite a mensagem aqui..."
                                aria="Digite a mensagem aqui"
                                comment={message} 
                                changed={commentChangedHandler}
                                postar={buttonClickHandler}/>
                            <div className="divider"/>
                            {errorMessage && <div className="alert alert-danger text-center" role="alert">
                                {errorMessage}
                            </div>}
                            {successMessage && <div className="alert alert-success text-center" role="alert">
                                {successMessage}
                            </div>}
                        </Modal.Body>
                    </form>
            </Modal>
        </span>
    );
};

export default ModalContact;