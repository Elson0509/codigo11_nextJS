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
import AtvFinConsTable from '../../../../components/Tables/AtvFinConsTable'
import ChartDoughImovelConsArea from '../../../../components/Charts/ChartDoughImovelConsArea'
import ChartDoughAtvFinCons from '../../../../components/Charts/ChartDoughAtvFinCons'
import ChartPieImovelConsReceita from '../../../../components/Charts/ChartPieImovelConsReceita'
import GeneralCard from '../../../../components/Cards/GeneralCard'

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
                            {/*Ativos Físicos*/}
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
                                        <div className="row">
                                            <div className="col-md-12 col-lg-6">
                                                <GeneralCard title={`% - Área de Ativos físicos`} titleStyle="text-center">
                                                    <ChartDoughImovelConsArea ativos={data.AtvFis}/>
                                                </GeneralCard>
                                            </div>
                                            <div className="col-md-12 col-lg-6">
                                                <GeneralCard title={`% - Receita de Ativos físicos`} titleStyle="text-center">
                                                    <ChartPieImovelConsReceita ativos={data.AtvFis}/>
                                                </GeneralCard>
                                            </div>
                                        </div>
                                    </Fragment>
                                )
                                : 
                                <h4 className='text-center m-4'>
                                    Este fundo não apresentou ativos físicos em seu último trimestre.
                                </h4>
                                }    
                            </div>
                            {/*Ativos Financeiros*/}
                            <div className={`mb-3 card card-body`}>
                                <div className="card-header bg-vicious-stance text-white">
                                    <h4 className={`text-white text-uppercase`}>
                                        <span className="font-number pr-2 mb-2">
                                            <Icon icon="file-invoice-dollar"/>
                                        </span>
                                        Ativos financeiros
                                    </h4>
                                </div>
                                {data.AtvFin && data.AtvFin.length > 0 ?
                                    (
                                        <Fragment>
                                            <div className="card-body over">
                                                <AtvFinConsTable ativos={data.AtvFin}/>
                                            </div>
                                            <div className="card-footer"/>
                                                <div className="row">
                                                    <div className="col-sm-12 col-lg-12">
                                                        <GeneralCard title={`% - Valor de Ativos financeiros`} titleStyle="text-center">
                                                            <ChartDoughAtvFinCons ativos={data.AtvFin}/>
                                                        </GeneralCard>
                                                    </div>
                                                </div>
                                            
                                        </Fragment>   
                                    )
                                    : 
                                    <h4 className='text-center m-4'>
                                        Este fundo não apresentou ativos financeiros em seu último trimestre.
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