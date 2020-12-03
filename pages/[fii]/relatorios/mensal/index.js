import Head from 'next/head'
import {useState, useEffect, Fragment} from 'react';
import {Row, Col} from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from '../../../../util/axios-base'
import MainAdmin from '../../../../layout/MainAdmin/MainAdmin'
import NavbarAdmin from '../../../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../../../layout/HeaderAdmin/HeaderAdmin'
import ChartLineDataValor from '../../../../components/Charts/ChartLineDataValor'

const index = ({data}) => {
    const router = useRouter()

    const arrayPL = data.relmensais.map(el => ({
        data: el.data_ref,
        valor: el.pat_liq
    }))
    const arrayCotas = data.relmensais.map(el => ({
        data: el.data_ref,
        valor: el.cotas_qtt
    }))
    const arrayCotistas = data.relmensais.map(el => ({
        data: el.data_ref,
        valor: el.cotistas_qtt
    }))
    const arrayAtvLiq = data.relmensais.map(el => ({
        data: el.data_ref,
        valor: el.tit_priv + el.tit_pub + el.disponibilidades + el.fundos_rf
    }))
    const arrayVpc = data.relmensais.map(el => ({
        data: el.data_ref,
        valor: el.pat_liq / el.cotas_qtt
    }))

    console.log(data)
    return (
        <Fragment>
            <NavbarAdmin/>
            <HeaderAdmin/>
            {data && !data.message && 
                <Fragment>
                    <Head>
                        <meta name="description" content={`Codigo11 - ${router.query.fii.toUpperCase()}11 - Relatório de Informações Mensais do Fundo Imobiliário (FII)`} />
                        <title>{`Codigo11: ${router.query.fii.toUpperCase()}11 - Relatório de Informações Mensais`}</title>
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
                        title="Relatório de Informações Mensais">
                        <Row>
                            <Col xs='12' className='my-2 py-4 bg-light'>
                                <h3 className='h5 text-center'>Patrimônio Líquido ({`${data.codigo}11`})</h3>
                                <ChartLineDataValor 
                                    label='Patrimônio líquido' 
                                    valores={arrayPL}
                                    ttprefix='R$'
                                    backgroundColor='#07e642'
                                    borderColor='#07e642'
                                    borderWidth={3}
                                />
                            </Col>
                            <Col xs='12' className='my-2 py-4 bg-light'>
                                <h3 className='h5 text-center'>Quantidade de cotas ({`${data.codigo}11`})</h3>
                                <ChartLineDataValor 
                                    label='Quantidade de cotas' 
                                    valores={arrayCotas}
                                    backgroundColor='#f0960e'
                                    borderColor='#f0960e'
                                    hoverBackgroundColor='#f0960e'
                                    borderWidth={3}
                                />
                            </Col>
                            <Col xs='12' className='my-2 py-4 bg-light'>
                                <h3 className='h5 text-center'>Valor patrimonial / Cota ({`${data.codigo}11`})</h3>
                                <ChartLineDataValor 
                                    label='Valor patrimonial por cota (VPC)' 
                                    valores={arrayVpc}
                                    backgroundColor='#e0f500'
                                    borderColor='#e0f500'
                                    hoverBackgroundColor='#e0f500'
                                    borderWidth={3}
                                />
                            </Col>
                            <Col xs='12' className='my-2 py-4 bg-light'>
                                <h3 className='h5 text-center'>Quantidade de cotistas ({`${data.codigo}11`})</h3>
                                <ChartLineDataValor 
                                    label='Quantidade de cotistas' 
                                    valores={arrayCotistas}
                                    backgroundColor='#940acf'
                                    borderColor='#940acf'
                                    hoverBackgroundColor='#940acf'
                                    borderWidth={2}
                                />
                            </Col>
                            <Col xs='12' className='my-2 py-4 bg-light'>
                                <h3 className='h5 text-center'>Valor dos ativos líquidos ({`${data.codigo}11`})</h3>
                                <ChartLineDataValor 
                                    label='Ativos líquidos' 
                                    valores={arrayAtvLiq}
                                    fill
                                    ttprefix='R$'
                                    borderWidth={2}
                                    rodape='Ativos líquidos: Valores de alta liquidez (disponibilidades, tít. públicos e privados e fundos de RF)'
                                />
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
                `/relatorios/mensais/${fii}`
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