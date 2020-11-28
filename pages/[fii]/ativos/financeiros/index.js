import Head from 'next/head'
import {useState, useEffect, Fragment} from 'react';
import {Row, Col} from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from '../../../../util/axios-base'
import MainAdmin from '../../../../layout/MainAdmin/MainAdmin'
import NavbarAdmin from '../../../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../../../layout/HeaderAdmin/HeaderAdmin'
import DashedCard from '../../../../components/Cards/DashedCard'
import GeneralCard from '../../../../components/Cards/GeneralCard'
import AtvFinTable from '../../../../components/Tables/AtvFinTable'
import ChartPieAtvFin from '../../../../components/Charts/ChartPieAtvFin'

const index = ({data}) => {
    const router = useRouter()
    console.log(data)

    const allEmpty = () => {
        let find = true;
        data.atvFin.forEach(element => {
            if(element.ativos.length>0)
                find = false;
        });
        return find;
    }

    const content = () => {
        let count = 1;
        return (
            <Fragment>
                {data.atvFin.map((atv, ind) => {
                    return atv.ativos.length > 0 ?
                    <div className={`mb-3 card card-body`} key={`atfin${ind}`}>
                        <div className="card-header">
                            <h4 className={`cart-title text-dark`}>{`${count++}. ${atv.descricao}`}</h4>
                        </div>
                        <div className="card-body over">
                            <AtvFinTable ativos={atv.ativos}/>
                            <GeneralCard title={`% - ${atv.descricao}`} titleStyle="text-center">
                                <ChartPieAtvFin ativos={atv.ativos}/>
                            </GeneralCard>
                        </div>
                        
                    </div>
                    :
                    null
                })}
            </Fragment>
        )
    }


    return (
        <Fragment>
            <NavbarAdmin/>
            <HeaderAdmin/>
            {data && !data.message && 
                <Fragment>
                    <Head>
                        <meta name="description" content={`Codigo11 - ${router.query.fii.toUpperCase()}11 - Informações de ativos físicos do FII`} />
                        <title>{`Codigo11: ${router.query.fii.toUpperCase()}11 - Ativos financeiros do FII`}</title>
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
                        title="Ativos financeiros">
                        {!allEmpty() &&
                            <Fragment>
                                {content()}
                            </Fragment>
                            ||
                            <DashedCard icon="money-check-alt" message="Este fundo não possui ativos financeiros."/>
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
                `/ativos/fin/${fii}`
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