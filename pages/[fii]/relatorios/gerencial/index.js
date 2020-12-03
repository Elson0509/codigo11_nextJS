import Head from 'next/head'
import {useState, useEffect, Fragment} from 'react';
import {Row, Col} from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from '../../../../util/axios-base'
import MainAdmin from '../../../../layout/MainAdmin/MainAdmin'
import NavbarAdmin from '../../../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../../../layout/HeaderAdmin/HeaderAdmin'
import {revertData} from '../../../../util/Utilities'
import CardListRelatorios from '../../../../components/Cards/CardListRelatorios'

const index = ({data}) => {
    const router = useRouter()

    const listaDataFormatada = data.relgers.map(el => (
        {
            data_ref: revertData(el.data_ref),
            documento_nr: el.documento_nr
        }
    ))

    console.log(data)
    return (
        <Fragment>
            <NavbarAdmin/>
            <HeaderAdmin/>
            {data && !data.message && 
                <Fragment>
                    <Head>
                        <meta name="description" content={`Codigo11 - ${router.query.fii.toUpperCase()}11 - 11 - Lista de Relatórios Gerenciais do Fundo Imobiliário (FII)`} />
                        <title>{`Codigo11: ${router.query.fii.toUpperCase()}11 - Lista de Relatórios Gerenciais`}</title>
                        {/* <script data-ad-client="ca-pub-8540652797620487" 
                            async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
                        </script> */}
                    </Head>
                    <MainAdmin
                        bgcolor={data.segmento.bgcolor}
                        fiiname={data.razao_social}
                        fiiticker={`${router.query.fii.toUpperCase()}11`}
                        icon={data.segmento.icon || "building"}
                        descricao={data.segmento.descricao}
                        title="Relatórios Gerenciais">
                            <CardListRelatorios list={listaDataFormatada} title='Lista de relatórios gerenciais' bgTitleColor={data.segmento.bgcolor}/>
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
                `/relatorios/gerenciais/${fii}`
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