import Head from 'next/head'
import {useState, useEffect, Fragment} from 'react';
import {Row, Col} from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from '../../../../util/axios-base'
import MainAdmin from '../../../../layout/MainAdmin/MainAdmin'
import NavbarAdmin from '../../../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../../../layout/HeaderAdmin/HeaderAdmin'
import ChartProventos from '../../../../components/Charts/ChartProventos'
import ChartDY from '../../../../components/Charts/ChartDY'
import CardProventosExtended from '../../../../components/Cards/CardProventosExtended'

const index = ({data}) => {
    const router = useRouter()
    console.log(data)
    return (
        <Fragment>
            <NavbarAdmin/>
            <HeaderAdmin/>
            {data && !data.message && 
                <Fragment>
                    <Head>
                        <meta name="description" content={`Codigo11 - ${router.query.fii.toUpperCase()}11 - Dados históricos de aluguéis e amortizações do FII`} />
                        <title>{`Codigo11: ${router.query.fii.toUpperCase()}11 -  Aluguéis históricos do FII`}</title>
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
                        title="Histórico de Aluguéis">
                            {data.proventos.length===0 ? (
                                    <div className="alert alert-info" role="alert">
                                        Este FII ainda não possui informações suficientes para serem mostradas.
                                    </div>)
                                    :(
                                    <Fragment>
                                        <div className="my-2 py-4 bg-light">
                                            <h3 className='h5 text-center'>Histórico de Aluguéis</h3>
                                            <ChartProventos proventos={data.proventos} label="Aluguéis - R$"/>
                                        </div>
                                        <div className="my-2 py-4 bg-light">
                                            <h3 className='h5 text-center'>Yield Histórico</h3>
                                            <ChartDY proventos={data.proventos} label="Yield Histórico"/>
                                        </div>
                                        <div className="my-2">
                                            <CardProventosExtended proventos={data.proventos}/>
                                        </div>
                                    </Fragment>
                                )
                            }
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
                `/dados/alugueis/${fii}`
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