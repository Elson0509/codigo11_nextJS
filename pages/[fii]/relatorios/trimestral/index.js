import Head from 'next/head'
import {useState, useEffect, Fragment} from 'react';
import {Row, Col} from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from '../../../../util/axios-base'
import MainAdmin from '../../../../layout/MainAdmin/MainAdmin'
import NavbarAdmin from '../../../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../../../layout/HeaderAdmin/HeaderAdmin'
import ChartLineImoveisQtt from '../../../../components/Charts/ChartLineImoveisQtt'
import ChartLineDataValor from '../../../../components/Charts/ChartLineDataValor'
import ChartLineReceitas from '../../../../components/Charts/ChartLineReceitas'
import ChartLineDespesasContas from '../../../../components/Charts/ChartLineDespesasContas'

const index = ({data}) => {
    const router = useRouter()

    const formatVacancia = data.vacancia.map(el => ({
            data: el.data,
            valor: el.valor.toFixed(2)
        })
    )

    console.log(data)
    return (
        <Fragment>
            <NavbarAdmin/>
            <HeaderAdmin/>
            {data && !data.message && 
                <Fragment>
                    <Head>
                        <meta name="description" content={`Codigo11 - ${router.query.fii.toUpperCase()}11 - Relatório de Informações trimestrais do Fundo Imobiliário (FII)`} />
                        <title>{`Codigo11: ${router.query.fii.toUpperCase()}11 - Relatório de Informações trimestrais`}</title>
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
                        title="Relatório de Informações Trimestrais">
                            <Row>
                                <Col xs='12' className='my-2 py-4 bg-light'>
                                    <h3 className='h5 text-center'>Quantidade de imóveis (por tipo)</h3>
                                    <ChartLineImoveisQtt imoveis={data.imoveis_qtd}/>
                                </Col>
                                <Col xs='12' className='my-2 py-4 bg-light'>
                                    <h3 className='h5 text-center'>% de vacância</h3>
                                    <ChartLineDataValor 
                                        label='Vacância' 
                                        valores={formatVacancia}
                                        ttsufix='%'
                                        backgroundColor='#938294'
                                        hoverBackgroundColor='#938294'
                                        borderColor='#938294'
                                        hoverBorderColor='#938294'
                                        borderWidth={3}
                                    />
                                </Col>
                                <Col xs='12' className='my-2 py-4 bg-light'>
                                    <h3 className='h5 text-center'>Valor em ativos financeiros</h3>
                                    <ChartLineDataValor 
                                        label='Ativos financeiros' 
                                        valores={data.atv_fin}
                                        ttprefix='R$ '
                                        backgroundColor='#f2c00c'
                                        hoverBackgroundColor='#f2c00c'
                                        borderColor='#f2c00c'
                                        hoverBorderColor='#f2c00c'
                                        borderWidth={3}
                                        rodape='Ativos financeiros: valores em outros FII, CRI, LCI, FIA, FIP, ações e outros.'
                                    />
                                </Col>
                                <Col xs='12' className='my-2 py-4 bg-light'>
                                    <h3 className='h5 text-center'>Receitas (por tipo)</h3>
                                    <ChartLineReceitas contas={data.contas}/>
                                </Col>
                                <Col xs='12' className='my-2 py-4 bg-light'>
                                    <h3 className='h5 text-center'>Taxas e despesas</h3>
                                    <ChartLineDespesasContas contas={data.contas}/>
                                </Col>
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
                `/relatorios/trimestrais/${fii}`
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