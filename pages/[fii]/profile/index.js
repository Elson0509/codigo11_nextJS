import React from 'react';
import Head from 'next/head'
import {useState, useEffect, Fragment} from 'react';
import { useRouter } from 'next/router'
import axios from '../../../util/axios-base'
import PanelAdmin from '../../../layout/PanelAdmin/PanelAdmin'
import MainAdmin from '../../../layout/MainAdmin/MainAdmin'
import NavbarAdmin from '../../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../../layout/HeaderAdmin/HeaderAdmin'
import ProfileTitleList from '../../../components/Lists/ProfileTitleList'

const index = ({data}) => {
    const router = useRouter()
    const [notaCommunity, setNotaCommunity] = useState(0)
    const [notaUser, setNotaUser] = useState(0)

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

    console.log("data----",data)
    return (
        !data.message && 
        <Fragment>
            <Head>
                <meta name="description" content={`Codigo11 - ${router.query.fii.toUpperCase()}11 - Perfil e informações gerais relevantes do Fundo imobiliário`} />
                <title>{`Codigo11: ${data.cotacao.cod_neg} - Perfil de FII`}</title>
                {/* <script data-ad-client="ca-pub-8540652797620487" 
                    async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
                </script> */}
            </Head>
            <NavbarAdmin/>
            <HeaderAdmin/>
            <PanelAdmin 
                bgcolor={data.segmento.bgcolor}
                fiiname={data.razao_social}
                fiiticker={data.cotacao.cod_neg}
                icon={data.segmento.icon || "building"}
                descricao={data.segmento.descricao}
            />
            <MainAdmin>
                
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
                
            </MainAdmin>
            {data && "teste" || "nada"}
        </Fragment>
        ||
        <Fragment>{data.message}</Fragment>
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
            props:{}
        }
    }
}

export default index;