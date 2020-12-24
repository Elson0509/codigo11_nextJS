import Head from 'next/head'
import {useState, useEffect, Fragment} from 'react';
import {Row, Col} from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from '../../util/axios-base'
import NavbarAdmin from '../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../layout/HeaderAdmin/HeaderAdmin'
import GeneralCard from '../../components/Cards/GeneralCard'
import EventosPageTable from '../../components/Tables/EventosPageTable'

const index = ({data}) => {
    const router = useRouter()
    return (
        <Fragment>
            <NavbarAdmin/>
            <HeaderAdmin/>
            {data && !data.message && 
                <Fragment>
                    <Head>
                        <meta name="description" content={`Codigo11 - Últimos Eventos de Fundos de Investimento Imobiliários ativos na bolsa.`} />
                        <title>{`Codigo11: Eventos recentes de Fundos Imobiliários`}</title>
                        {/* <script data-ad-client="ca-pub-8540652797620487" 
                            async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
                        </script> */}
                    </Head>
                    <div>
                        <GeneralCard title='Emissões' comentary='Emissões de novas cotas de fundos imobiliários'>
                            <EventosPageTable eventos={data.rel_emissao}/>
                        </GeneralCard>
                        <GeneralCard title='Fatos Relevantes' comentary='Informações aos cotistas e ao mercado sobre fatos relevantes'>
                            <EventosPageTable eventos={data.rel_fato}/>
                        </GeneralCard>
                        <GeneralCard title='Relatórios Gerenciais' comentary='Relatórios gerenciais recém divulgados'>
                            <EventosPageTable eventos={data.rel_gerencial}/>
                        </GeneralCard>
                        <GeneralCard title='Relatórios Trimestrais' comentary='Relatórios trimestrais recém divulgados'>
                            <EventosPageTable eventos={data.rel_trimestral}/>
                        </GeneralCard>
                        <GeneralCard title='Informativos Mensais' comentary='informativos mensais recém divulgados'>
                            <EventosPageTable eventos={data.rel_mensal}/>
                        </GeneralCard>
                        <GeneralCard title='Aluguéis e Amortizações' comentary='Relatório de proventos recém anunciados'>
                            <EventosPageTable eventos={data.rel_rendimentos}/>
                        </GeneralCard>
                    </div>
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
    try{
        const response = await axios.get('/relatorios/reldias')
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

export default index;