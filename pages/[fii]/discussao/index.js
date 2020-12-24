import Head from 'next/head'
import {useState, useEffect, Fragment} from 'react';
import {Row, Col} from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from '../../../util/axios-base'
import MainAdmin from '../../../layout/MainAdmin/MainAdmin'
import NavbarAdmin from '../../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../../layout/HeaderAdmin/HeaderAdmin'
import Forum from '../../../components/Forum/Forum'
import Tabs from 'react-responsive-tabs'

const index = ({data}) => {
    const fii=data.codigo

    const tabsContent = [
        {
            title: 'Geral',
            content: <Forum secao={1} fii={fii}/>
        },
        {
            title: 'Eventos',
            content: <Forum secao={2} fii={fii}/>
        },
        {
            title: 'Proventos',
            content: <Forum secao={3} fii={fii}/>
        },
        {
            title: 'Vacância',
            content: <Forum secao={4} fii={fii}/>
        },
        {
            title: 'Relatórios',
            content: <Forum secao={5} fii={fii}/>
        },
        {
            title: 'Ativos Físicos',
            content: <Forum secao={6} fii={fii}/>
        },
        {
            title: 'Ativos Financeiros',
            content: <Forum secao={7} fii={fii}/>
        },
        {
            title: 'Outros',
            content: <Forum secao={8} fii={fii}/>
        },
    ];

    const getTabs = () => {
        return tabsContent.map((tab, index) => ({
            title: tab.title,
            getContent: () => tab.content,
            key: index,
        }));
    }

    const router = useRouter()
    console.log(data)
    return (
        <Fragment>
            <NavbarAdmin/>
            <HeaderAdmin/>
            {data && !data.message && 
                <Fragment>
                    <Head>
                        <meta name="description" content={`Codigo11 - ${router.query.fii.toUpperCase()}11 - Fórum de discussão do Fundo Imobiliário (FII)`} />
                        <title>{`Codigo11: ${router.query.fii.toUpperCase()}11 - Fórum de discussão`}</title>
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
                        title="Fórum para discussão">
                            <Tabs 
                                transform={false} 
                                showInkBar={true} 
                                items={getTabs()}
                            />
                        
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
                `/ativos/aquiali/${fii}`
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