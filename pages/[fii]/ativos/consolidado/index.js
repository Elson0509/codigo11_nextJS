import Head from 'next/head'
import {useState, useEffect, Fragment} from 'react';
import {Row, Col} from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from '../../../../util/axios-base'
import MainAdmin from '../../../../layout/MainAdmin/MainAdmin'
import NavbarAdmin from '../../../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../../../layout/HeaderAdmin/HeaderAdmin'
import Icon from '../../../../components/Icon/Icon'
import AtvFisConsTable from '../../../../components/Tables/AtvFisConsTable'

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
                        <meta name="description" content={`Codigo11 - ${router.query.fii.toUpperCase()}11 - Informações de ativos consolidados do FII`} />
                        <title>{`Codigo11: ${router.query.fii.toUpperCase()}11 - Ativos consolidados do FII`}</title>
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
                        title="Ativos consolidados">
                        <Fragment>
                            <div className={`mb-3 card card-body`}>
                                <div className="card-header bg-vicious-stance text-white">
                                    <h4 className={`text-white text-uppercase`}>
                                        <span className="font-number pr-2 mb-2">
                                            <Icon icon="building"/>
                                        </span>
                                        Ativos físicos
                                    </h4>
                                </div>
                                {data.AtvFis && data.AtvFis.length > 0 ?
                                (
                                    <Fragment>
                                        <div className="card-body over">
                                            <AtvFisConsTable ativos={data.AtvFis}/>
                                        </div>
                                    </Fragment>
                                )
                                : 
                                <h4 className='text-center m-4'>
                                    Este fundo não apresentou ativos físicos em seu último trimestre.
                                </h4>
                                }    
                            </div>
                        </Fragment>
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
                `/ativos/con/${fii}`
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