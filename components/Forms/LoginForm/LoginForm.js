import {memo, useState, Fragment} from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from '../../../util/axios-base';
import { useRouter } from 'next/router'

const LoginForm = (props) => {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState('')
    const [textButton, setTextButton] = useState('ENTRAR')

    const validationSchema = Yup.object({
        email: Yup.string().email('Por favor, digite um formato de email válido.').required('Por favor, digite um email.'),
        password: Yup.string().required('Digite a senha.').min(6, 'Pelo menos ${min} caracteres')
    })

    const formik = useFormik({ 
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            setTextButton('ENTRANDO...')
            setErrorMessage('')
            axios.post('/authenticate', values)
                .then(res => {
                    localStorage.setItem('userToken', res.data.token)
                    router.push('/dashboard')
                })
                .catch(err => {
                    setErrorMessage(err.response.data.message || 'Login inválido.')
                    setTextButton('ENTRAR')
                })
        },
        validationSchema
    })

    return (
        <Fragment>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" 
                            name="email" 
                            className="form-control" 
                            aria-describedby="emailHelp" 
                            onChange={formik.handleChange} 
                            value={formik.values.email}
                            onBlur={formik.handleBlur}/>
                        {formik.touched.email && formik.errors.email && <div className="alert alert-warning" role="alert">
                            {formik.errors.email}
                        </div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="form-control" 
                            onChange={formik.handleChange} 
                            value={formik.values.password}
                            onBlur={formik.handleBlur}/>
                        {formik.touched.password && formik.errors.password && <div className="alert alert-warning" role="alert">
                            {formik.errors.password}
                        </div>}
                        <button type="button"
                            onClick={props.toggle}
                            className="btn btn-link btn-no-box-shadow btn-no-outline">
                                Esqueci minha senha
                        </button>
                    </div>
                    
                    <button 
                        type="submit" 
                        className={`btn btn-lg btn-wide btn-block btn-primary mt-4 ${textButton!=='ENTRAR' ? 'disabled' : ''}`}
                        >{textButton}</button>
                </form>
                {errorMessage && <div className="alert alert-warning" role="alert">
                    {errorMessage}
                </div>}
            </div>
        </Fragment>
    );
};

export default memo(LoginForm);