import Head from 'next/head'
import {useState, useEffect, Fragment} from 'react';
import {Row, Col} from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from '../../../util/axios-base'
import MainAdmin from '../../../layout/MainAdmin/MainAdmin'
import NavbarAdmin from '../../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../../layout/HeaderAdmin/HeaderAdmin'
import ProfileTitleList from '../../../components/Lists/ProfileTitleList'
import FavoritoButton from '../../../components/Buttons/FavoritoButton/FavoritoButton'
import CardCotacao from '../../../components/Cards/CardCotacao'
import CardCotacaoDetalhes from '../../../components/Cards/CardCotacaoDetalhes'
import CardVolume from '../../../components/Cards/CardVolume'
//import CardNegocios from '../../../components/Cards/CardNegocios'
import CardAdm from '../../../components/Cards/CardAdm'
import CardLiquidez from '../../../components/Cards/CardLiquidez'
import SingleCard from '../../../components/Cards/SingleCard'
import CardProventos from '../../../components/Cards/CardProventos'
import CardListRelatorios from '../../../components/Cards/CardListRelatorios'
import {numberWithVirgula, 
        numberWithPercentual, 
        numberWithDots, 
        valueToRes, 
        numberToMoney} from '../../../util/Utilities'
import classes from './profile.module.css'
import { ToastContainer, toast } from 'react-toastify';
import jwt_decode from 'jwt-decode'

const index = ({data}) => {
    const router = useRouter()
    const [notaCommunity, setNotaCommunity] = useState(0)
    const [notaUser, setNotaUser] = useState(0)
    const [favorito, setFavorito] = useState(false)

    const fii = router.query.fii.toUpperCase()

    const configToast = {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    const dadosAtvLiq = () => {
        return {
            disponibilidades: data.disponibilidades,
            tit_pub: data.tit_pub,
            tit_priv: data.tit_priv,
            fundos_rf: data.fundos_rf,
        }
    }

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
        const token = localStorage.userToken
        if(!!token && !!jwt_decode(token)){
            setNotaUser(newRating)
            if(newRating==5)
                toast.warn(`Nota ${newRating} registrada. Você gosta mesmo desse fundo!`, configToast);
            else
                toast.warn(`Nota ${newRating} registrada. Obrigado!`, configToast);
            const decode = jwt_decode(token)
            axios.post(`/notas/update`, {
                id: decode.uid,
                fii,
                nota: newRating,
                token
            })
        }
        else{
            toast.error(`Essa nota só tem efeito se você estiver logado :(`, configToast);
        }
    }

    const favoritoHandler = () => {
        const token = localStorage.userToken
        
        if(!!token && !!jwt_decode(token)){
            let newFav = !favorito
            setFavorito(newFav)
            if(newFav)
                toast.info(`Você agora está seguindo ${fii} e passará a receber e-mails sempre que houver alguma novidade!`, configToast);
            else
                toast.error(`Você não está mais seguindo ${fii} :(`, configToast);
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

    useEffect(() => {
        const token = localStorage.userToken
        if(!!token){
            const decoded = jwt_decode(token)
            if(!!decoded){
                axios.get(`favoritos/${decoded.uid}/${fii}`)
                    .then(res => {
                        setFavorito(res.data.favorito)
                    })
                    .catch(err => {
                        setFavorito(false)
                    })
            }
        }
    }, [])

    useEffect(() => {
        const token = localStorage.userToken
        if(!!token && !!jwt_decode(token)){
            const decode = jwt_decode(token)
            axios.get(`/notas/${fii}/${decode.uid}`, {
                params: {
                    token
                }
            })
            .then(res => {
                setNotaUser(res.data.nota)
            })
            .catch(err => {
                setNotaUser(0)
            })
        }
    }, [])

    return (
        <Fragment>
            <ToastContainer />
            <NavbarAdmin/>
            <HeaderAdmin/>
            {data && !data.message && 
                <Fragment>
                    <Head>
                        <meta name="description" content={`Codigo11 - ${router.query.fii.toUpperCase()}11 - Perfil e informações gerais relevantes do Fundo imobiliário`} />
                        <title>{`Codigo11: ${data.cotacao?.cod_neg || `${router.query.fii.toUpperCase()}11`} - Perfil de FII`}</title>
                        {/* <script data-ad-client="ca-pub-8540652797620487" 
                            async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
                        </script> */}
                    </Head>
                    <MainAdmin
                        bgcolor={data.segmento.bgcolor}
                        fiiname={data.razao_social}
                        fiiticker={`${data.cotacao?.cod_neg || `${router.query.fii.toUpperCase()}11`}`}
                        icon={data.segmento.icon || "building"}
                        descricao={data.segmento.descricao}>
                        <div className={`card slow-shadow ${data.segmento.bgcolor}`}>
                            <div className="card-header text-white">
                                <div className={classes.Card_header_profile}>
                                    <div className={classes.Card_header_profile_title}>
                                        <h3 className="h3 ml-2">Perfil do fundo</h3>
                                    </div>
                                    <FavoritoButton seguindo={favorito} onClick={favoritoHandler}/>
                                </div>
                            </div>
                            <div className="card-body">
                                <ProfileTitleList 
                                    segmento={data.segmento} 
                                    codigo={`${data.cotacao?.cod_neg || `${router.query.fii.toUpperCase()}11`}`}
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
                            {data.cotacao &&
                            <Fragment>
                                <Col lg="4" md="6" sm="12">
                                    <CardCotacao cotacao={data.cotacao}/>
                                </Col>
                                <Col lg="4" md="6" sm="12">
                                    <CardCotacaoDetalhes cotacao={data.cotacao}/>
                                </Col>
                                <Col lg="4" md="6" sm="12">
                                    <CardVolume cotacao={data.cotacao}/>
                                </Col>
                            </Fragment>
                            }
                            {/* <Col lg="4" md="6" sm="12">
                                <CardNegocios cotacao={data.cotacao}/>
                            </Col> */}
                            {data.administrador_fii &&
                            <Col lg="6" md="12" sm="12">
                                <CardAdm adm={data.administrador_fii}/>
                            </Col>}
                            {dadosAtvLiq() &&
                            <Col lg="6" md="12" sm="12">
                                <CardLiquidez dados={dadosAtvLiq()}/>
                            </Col>}
                        </Row>
                        <Row>
                            {data.proventos && data.proventos.length > 0 && 
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="piggy-bank"
                                        bgIcon="happy-itmeo" 
                                        title={`Último Rendimento (${data.proventos[0].data_pagamento})`}
                                        text1={"Rendimento: R$ " + numberWithVirgula(data.proventos[0].valor_rendimento)}
                                        colorText1="dark"
                                        text2={"Amortização: R$ " + numberWithVirgula(data.proventos[0].valor_amortizacao)}
                                        colorText2="dark"
                                    />
                                </Col>
                            }
                            {data && !isNaN(data.dy_medio) && 
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="chart-line"
                                        bgIcon="night-sky" 
                                        title="Yield médio"   
                                        text1={numberWithPercentual(data.dy_medio)}
                                        colorText1="success"
                                        text2="12 meses"
                                        colorText2="secondary"
                                    />
                                </Col>
                            }
                            {data.cotacao && !isNaN(data.cotacao.numero_negocios) && 
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="handshake"
                                        bgIcon="primary" 
                                        title="Quantidade de Negócios"   
                                        text1={numberWithDots(data.cotacao.numero_negocios)}
                                        colorText1="success"
                                    />
                                </Col>
                            }
                            {data && !isNaN(data.cotistas_qtt) && 
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="users"
                                        bgIcon="love-kiss" 
                                        title="Quantidade de Cotistas"   
                                        text1={numberWithDots(data.cotistas_qtt)}
                                        colorText1="primary"
                                    />
                                </Col>
                            }
                            {data && !isNaN(data.cotas_emitidas) && 
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="th"
                                        bgIcon="mean-fruit" 
                                        title="Cotas emitidas"   
                                        text1={numberWithDots(data.cotas_emitidas)}
                                        colorText1="warning"
                                    />
                                </Col>
                            }
                            {data && !isNaN(data.valor_mercado) && 
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="coins"
                                        bgIcon="plum-plate" 
                                        title="Valor de Mercado"   
                                        text1={"R$" + valueToRes(data.valor_mercado)}
                                        colorText1="dark"
                                    />
                                </Col>
                            }
                            {data && !isNaN(data.pat_liq)  && 
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="city"
                                        bgIcon="asteroid" 
                                        title="Patrimônio Líquido"   
                                        text1={"R$ " + valueToRes(data.pat_liq)}
                                        colorText1="primary"
                                        text2={"R$" + numberWithDots(data.pat_liq)}
                                        colorText2="secondary"
                                    />
                                </Col>
                            }
                            {data && !isNaN(data.pvp)  && 
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="building"
                                        bgIcon="happy-green" 
                                        title="P/VP"   
                                        text1={data.pat_liq_res}
                                        colorText1="primary"
                                        text2={numberWithVirgula(data.pvp)}
                                        colorText2="dark"
                                    />
                                </Col>
                            }
                            {data && !isNaN(data.receita_alugueis)  && 
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="hand-holding-usd"
                                        bgIcon="primary" 
                                        title="Receita de aluguéis"   
                                        text1={`R$${valueToRes(data.receita_alugueis)}`}
                                        colorText1="secondary"
                                        text2={"Último trimestre"}
                                        colorText2="muted"
                                    />
                                </Col>
                            }
                            {data && !isNaN(data.receita_aplicacoes)  && 
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="hand-holding-usd"
                                        bgIcon="success" 
                                        title="Receita de aplicações financeiras"   
                                        text1={`R$${valueToRes(data.receita_aplicacoes)}`}
                                        colorText1="info"
                                        text2={"Último trimestre"}
                                        colorText2="muted"
                                    />
                                </Col>
                            }
                            {data && !isNaN(data.valor_tx_adm)  && 
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="money-bill-wave"
                                        bgIcon="danger" 
                                        title="Taxa de Administracão"   
                                        text1={`R$${valueToRes(data.valor_tx_adm)}`}
                                        colorText1="danger"
                                        text2="Último trimestre"
                                        colorText2="muted"
                                    />
                                </Col>
                            }
                            {data && !isNaN(data.tx_adm_pl)  && 
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="percentage"
                                        bgIcon="malibu-beach" 
                                        title="Taxa Adm / Patrimônio Líquido"   
                                        text1={numberWithPercentual(data.tx_adm_pl)}
                                        colorText1="danger"
                                        text2={"Taxa trimestral anualizada"}
                                        colorText2="muted"
                                    />
                                </Col>
                            }
                            {data && !isNaN(data.custo_tx_por_cota_anual) && 
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="wallet"
                                        bgIcon="warning" 
                                        title="Custo anual da taxa adm / cota"   
                                        text1={numberToMoney(data.custo_tx_por_cota_anual)}
                                        colorText1="danger"
                                        text2={"Custo trimestral anualizado"}
                                        colorText2="muted"
                                    />
                                </Col>
                            }
                            {data && data.pat_cota && 
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="chart-pie"
                                        bgIcon="success" 
                                        title="Valor Patrimonial por Cota"   
                                        text1={"R$ " + numberWithVirgula(data.pat_cota)}
                                        colorText1="primary"
                                    />
                                </Col>
                            }
                            {data &&
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="building"
                                        bgIcon="premium-dark" 
                                        title="Quantidade de ativos físicos"
                                        text1={data.bens_imoveis_qtt}
                                        colorText1="dark"
                                    />
                                </Col>
                            }
                            {data &&
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="file-invoice-dollar"
                                        bgIcon="premium-dark" 
                                        title="Quantidade de ativos financeiros"
                                        text1={data.ativos_fin}
                                        colorText1="danger"
                                    />
                                </Col>
                            }
                            {data &&
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="cart-plus"
                                        bgIcon="royal" 
                                        title="Aquisições do trimestre"   
                                        text1={data.aquisicoes_trimestre}
                                        colorText1="dark"
                                    />
                                </Col>
                            }
                            {data &&
                                <Col md="6" xl="4">
                                    <SingleCard 
                                        icon="cart-arrow-down"
                                        bgIcon="danger" 
                                        title="Alienações do trimestre"   
                                        text1={data.alienacoes_trimestre}
                                        colorText1="info"
                                    />
                                </Col>
                            }
                        </Row>
                        {data.proventos && 
                            <Row>
                                <div className="col-12">
                                    <CardProventos proventos={data.proventos}/>
                                </div>
                            </Row>
                        }
                        <Row>
                            {data.relatorios_gerenciais && data.relatorios_gerenciais.length > 0 && 
                                <div className="col-md-12 col-xl-6 mb-3">
                                    <CardListRelatorios title="Últimos Relatórios Gerenciais" list={data.relatorios_gerenciais} bgTitleColor="bg-plum-plate"/>
                                </div>
                            }
                            {data.relatorios_trimestrais && data.relatorios_trimestrais.length > 0 && 
                                <div className="col-md-12 col-xl-6 mb-3">
                                    <CardListRelatorios title="Últimos Relatórios Trimestrais" list={data.relatorios_trimestrais} bgTitleColor="bg-midnight-bloom"/>
                                </div>
                            }
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