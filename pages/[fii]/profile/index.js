import React from 'react';
import Head from 'next/head'
import {useState, useEffect, Fragment} from 'react';
import {Row, Col} from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from '../../../util/axios-base'
import PanelAdmin from '../../../layout/PanelAdmin/PanelAdmin'
import MainAdmin from '../../../layout/MainAdmin/MainAdmin'
import NavbarAdmin from '../../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../../layout/HeaderAdmin/HeaderAdmin'
import ProfileTitleList from '../../../components/Lists/ProfileTitleList'
import FavoritoButton from '../../../components/Buttons/FavoritoButton/FavoritoButton'
import CardCotacao from '../../../components/Cards/CardCotacao'
import CardCotacaoDetalhes from '../../../components/Cards/CardCotacaoDetalhes'
import CardVolume from '../../../components/Cards/CardVolume'
import CardNegocios from '../../../components/Cards/CardNegocios'
import CardAdm from '../../../components/Cards/CardAdm'
import classes from './profile.module.css'
import { ToastContainer, toast } from 'react-toastify';

const index = ({data}) => {
    const router = useRouter()
    const [notaCommunity, setNotaCommunity] = useState(0)
    const [notaUser, setNotaUser] = useState(0)
    const [favorito, setFavorito] = useState(false)

    const configToast = {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
     
    console.log(data)

    useEffect(() => {
        axios.get(`notas/media/${router.query.fii.toUpperCase()}`)
            .then(res => {
                setNotaCommunity(res.data.nota)
            })
            .catch(err => {
                setNotaCommunity(0)
            })
    }, [])

    const changeRating = (newRating, name) => {
        setNotaUser(newRating)
        if(newRating==5)
                 toast.warn(`Nota ${newRating} registrada. Você gosta mesmo desse fundo!`, configToast);
             else
                 toast.warn(`Nota ${newRating} registrada. Obrigado!`, configToast);
        const token = localStorage.userToken
        // if(!!token && !!jwt_decode(token)){
        //     setNotaUser(newRating)
        //     if(newRating==5)
        //         toast.warn(`Nota ${newRating} registrada. Você gosta mesmo desse fundo!`, configToast);
        //     else
        //         toast.warn(`Nota ${newRating} registrada. Obrigado!`, configToast);
        //     const decode = jwt_decode(token)
        //     axios.post(`/notas/update`, {
        //         id: decode.uid,
        //         fii,
        //         nota: newRating,
        //         token
        //     })
        // }
        // else{
        //     //toast.error(`Essa nota só tem efeito se você estiver logado :(`, configToast);
        // }
    }

    const favoritoHandler = () => {
        const token = localStorage.userToken
        if(!!token && !!jwt_decode(token)){
            let newFav = !favorito
            setFavorito(newFav)
            if(newFav)
                toast.info(`Você agora está seguindo ${cotacao.cod_neg} e passará a receber e-mails sempre que houver alguma novidade!`, configToast);
            else
                toast.error(`Você não está mais seguindo ${cotacao.cod_neg} :(`, configToast);
            const decode = jwt_decode(token)
            axios.post(`/favoritos/update`, {
                id: decode.uid,
                fii,
                favorito: newFav,
                token
            })
        }
        else{
            toast.error('Você precisa estar logado para seguir esse FII.');
        }
    }

    console.log("data----",data)
    return (
        <Fragment>
            <ToastContainer />
            <NavbarAdmin/>
            <HeaderAdmin/>
            {data && !data.message && 
                <Fragment>
                    <Head>
                        <meta name="description" content={`Codigo11 - ${router.query.fii.toUpperCase()}11 - Perfil e informações gerais relevantes do Fundo imobiliário`} />
                        <title>{`Codigo11: ${data.cotacao.cod_neg} - Perfil de FII`}</title>
                        {/* <script data-ad-client="ca-pub-8540652797620487" 
                            async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
                        </script> */}
                    </Head>
                    <PanelAdmin 
                        bgcolor={data.segmento.bgcolor}
                        fiiname={data.razao_social}
                        fiiticker={data.cotacao.cod_neg}
                        icon={data.segmento.icon || "building"}
                        descricao={data.segmento.descricao}
                    />
                    <MainAdmin>
                        <div className={`card ${data.segmento.bgcolor}`}>
                            <div className="card-header text-white">
                                <div className={classes.Card_header_profile}>
                                    <div className={classes.Card_header_profile_title}>
                                        <h3>Perfil</h3>
                                    </div>
                                    <FavoritoButton seguindo={favorito} onClick={favoritoHandler}/>
                                </div>
                            </div>
                            <div className="card-body">
                                <ProfileTitleList 
                                    segmento={data.segmento} 
                                    codigo={data.cotacao.cod_neg}
                                    cnpj={data.cnpj}
                                    site={data.site}
                                    data_func={data.data_func}
                                    idade={data.idade}
                                    tipoGestao={data.tipo_gestao}
                                    notaUsuario={notaUser}
                                    notaComunidade={notaCommunity}
                                    changeRating = {changeRating}/>
                            </div>
                        </div>
                        <Row className="mt-2">
                            <Col lg="4" md="6" sm="12">
                                <CardCotacao cotacao={data.cotacao}/>
                            </Col>
                            <Col lg="4" md="6" sm="12">
                                <CardCotacaoDetalhes cotacao={data.cotacao}/>
                            </Col>
                            <Col lg="4" md="6" sm="12">
                                <CardVolume cotacao={data.cotacao}/>
                            </Col>
                            <Col lg="4" md="6" sm="12">
                                <CardNegocios cotacao={data.cotacao}/>
                            </Col>
                            {data.administrador_fii &&
                            <Col lg="6" md="6" sm="12">
                                <CardAdm adm={data.administrador_fii}/>
                            </Col>}
                        </Row>
                            
                    </MainAdmin>
                    
                </Fragment>
                || data && data.message &&
                <main className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="alert alert-danger text-center" role="alert">
                        {data.message}
                            </div>
                        </div>
                    </div>
                </main>
                ||
                <main className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="alert alert-danger text-center" role="alert">
                        Ops. Um erro ocorreu.
                            </div>
                        </div>
                    </div>
                </main>
            }
        </Fragment>
    );
};

export const getServerSideProps = async (context) => {
    const fii = context.query.fii
    if(fii && fii.length==4){
        try{
            const response = await axios.get(
                `/profile/${fii}`
            )
            return {
                props: {
                    data: response.data,
                }
            }
        }catch(er){
            return {
                props:{data: er.response.data}
            }
        }
    }
    else{
        return {
            props:{ data: {
                message: `Este codigo (${context.query.fii}) não é válido. Eles costumam ter 4 letras.`
                }
            }
        }
    }
}

export default index;