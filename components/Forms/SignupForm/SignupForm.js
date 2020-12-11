import {memo, useState} from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Axios from '../../../util/axios-base';

const SignupForm = (props) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [buttonText, setButtonText] = useState('CRIAR')

    const validationSchema = Yup.object({
        username: Yup.string().min(3, 'Apelido com pelo menos ${min} caracteres.').max(16, 'Apelido com ${max} caracteres ou menos.').required('Por favor, digite um username.'),
        email: Yup.string().email('Por favor, digite um formato de email válido.').required('Por favor, digite um email.'),
        password: Yup.string().required('Digite a senha.').min(6, 'Pelo menos ${min} caracteres.').max(30, 'No máximo ${max} caracteres.'),
        password2: Yup.string().oneOf([Yup.ref('password'), null], 'Senhas devem ser iguais.')
    })

    const formik = useFormik({ 
        initialValues: {
            username: '',
            email: '',
            password: '',
            password2: ''
        },
        onSubmit: values => {
            if(buttonText==='CRIAR'){
                setButtonText('CRIANDO...')
                Axios.post('/register', values)
                    .then(res => {
                        setSuccessMessage(res.data.message)
                        setButtonText('CONTA CRIADA!')
                    })
                    .catch(err => {
                        setErrorMessage(err.response.data.error.message.message || 'Desculpe, mas um erro ocorreu.')
                        setButtonText('CRIAR')
                    })
            }
        },
        validationSchema
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label>Apelido</label>
                    <input 
                        type="text" 
                        name='username' 
                        className="form-control" 
                        aria-describedby="UsernameHelp" 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={formik.values.username}/>
                    <small className="form-text text-muted">Escolha um apelido para interagir no fórum.</small>
                    {formik.touched.username && formik.errors.username && <div className="alert alert-warning" role="alert">
                        {formik.errors.username}
                    </div>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name='email' 
                        className="form-control" 
                        aria-describedby="emailHelp" 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={formik.values.email}/>
                    <small className="form-text text-muted">Seu email nunca será compartilhado!</small>
                    {formik.touched.email && formik.errors.email && <div className="alert alert-warning" role="alert">
                        {formik.errors.email}
                    </div>}
                </div>
                <div className="form-group">
                    <label>Senha</label>
                    <input 
                        type="password" 
                        name='password' 
                        className="form-control" 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={formik.values.password}/>
                    {formik.touched.password && formik.errors.password && <div className="alert alert-warning" role="alert">
                        {formik.errors.password}
                    </div>}
                </div>
                <div className="form-group">
                    <label>Repita a Senha</label>
                    <input 
                        type="password" 
                        name='password2' 
                        className="form-control" 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={formik.values.password2}/>
                    {formik.touched.password2 && formik.errors.password2 && <div className="alert alert-warning" role="alert">
                        {formik.errors.password2}
                    </div>}
                </div>
                <button type="submit" 
                    className={`btn btn-lg btn-wide btn-block btn-primary mt-4 ${buttonText==='CRIANDO...' || buttonText==='CONTA CRIADA!' ? 'disabled' : ''}`}
                    >
                        {buttonText}
                </button>
            </form>
            {errorMessage && <div className="alert alert-warning" role="alert">
                {errorMessage}
            </div>}
            {successMessage && <div className="alert alert-success" role="alert">
                {successMessage}
            </div>}
        </div>
    );
};

export default memo(SignupForm);