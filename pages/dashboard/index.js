import {useState, useEffect, Fragment} from 'react';
import axios from '../../util/axios-base';
import Icon from '../../components/Icon/Icon'
import CardFavoritoCollapse from '../../components/Cards/CardFavoritoCollapse'
import {userId} from '../../util/UserFunctions'
import {saudacaoHorario, IconHorario} from '../../util/Utilities'
import Loading from '../../components/Loading/Spinner'
import Link from 'next/link'
import Head from 'next/head'
import NavbarAdmin from '../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../layout/HeaderAdmin/HeaderAdmin'
import GeneralCard from '../../components/Cards/GeneralCard'
import classes from './dashboard.module.css'
import CardQuotation from '../../components/Cards/CardQuotation'
import DashedCard from '../../components/Cards/DashedCard'

const Index = () => {
    const [dados, setDados] = useState()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [infoMessage, setinfoMessage] = useState("")

    useEffect(() => {
        if(userId()){
            const token = localStorage.userToken
            setLoading(true)
            const path = `/user/dashboard/${userId()}`
            axios.get(path, {
                params: {
                    token
                }
            })
                .then(res => {
                    setLoading(false)
                    setDados(res.data)
                })
                .catch(err => {
                    setLoading(false)
                    setErrorMessage(err.response.data.message || 'Ops, um erro ocorreu!')
                })
            }
        else{
            setLoading(false)
            setinfoMessage('Você precisa logar para ter seu próprio dashboard.')
        }
    }, [])

    return (
        <Fragment>
            <Head>
                <meta name="description" content={`Codigo11 - Dashboard de usuário com lista de FIIs favoritos`} />
                <title>{`Codigo11: Dashboard de usuário`}</title>
                {/* <script data-ad-client="ca-pub-8540652797620487" 
                    async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
                </script> */}
            </Head>
            <NavbarAdmin/>
            <HeaderAdmin/>
            {dados && 
                <Fragment>
                    <GeneralCard title='Dashboard'>
                        <p className={classes.Greeting}>
                            <span className={classes.GreetingIcon}>
                                <Icon icon={IconHorario()}/> 
                            </span>
                            <span>
                                {`${saudacaoHorario()}, ${dados.user.username}!`}
                            </span>
                        </p>
                    </GeneralCard>
                    <div className="col-12">
                        <CardQuotation frase={dados.frase}/>
                    </div>
                    {dados.favoritos.length > 0 ?
                         <GeneralCard>
                            <div className="row">
                                {dados.favoritos.map((el, ind) => {
                                    return <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={`fav${ind}`}>
                                                <CardFavoritoCollapse favorito={el}/>
                                            </div>
                                })}
                            </div>
                        </GeneralCard>
                    :
                    <div className="col-12">
                        <DashedCard icon="meh" message="Você ainda não está seguindo nenhum fundo."/>
                    </div>
                    }
                </Fragment>
            }
            
            {
                loading && <Loading/>
            }
            {errorMessage && 
                <div className="alert alert-danger">
                    <p>{errorMessage}</p>
                </div>
            }
            {infoMessage && 
                <Link href="/login">
                    <a className="link">
                        <div className="alert alert-info">
                            <p>{infoMessage}</p>
                        </div>
                    </a>
                </Link>
            }
        </Fragment>
    );
};

export default Index;