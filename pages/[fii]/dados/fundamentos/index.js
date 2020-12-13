import Head from 'next/head'
import {Fragment} from 'react';
import {Row, Col} from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from '../../../../util/axios-base'
import MainAdmin from '../../../../layout/MainAdmin/MainAdmin'
import NavbarAdmin from '../../../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../../../layout/HeaderAdmin/HeaderAdmin'
import CardApresentacaoFii from '../../../../components/Cards/CardApresentacaoFii'
import CardSegmento from '../../../../components/Cards/CardSegmento'
import CardCotacaoFundamentos from '../../../../components/Cards/CardCotacaoFundamentos'
import CardAtvFin from '../../../../components/Cards/CardAtvFin'
import CardImoveis from '../../../../components/Cards/CardImoveis'
import CardIndicadores from '../../../../components/Cards/CardIndicadores'

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
                        <meta name="description" content={`Codigo11 - ${router.query.fii.toUpperCase()}11 - Tabela de informações com fundamentos do FII`} />
                        <title>{`Codigo11: ${router.query.fii.toUpperCase()}11 - Tabelas de Fundamentos do FII`}</title>
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
                        title="Fundamentos">
                        <Row>
                            <CardApresentacaoFii apresentacao={data.apresentacao} bgcolor={data.segmento.color}/>
                            <CardSegmento segmento={data.segmento}/>
                            {data.cotacao.codneg && <CardCotacaoFundamentos cotacao={data.cotacao}  bgcolor={data.segmento.color}/>}
                            <CardAtvFin atv_fin={data.atv_fin} bgcolor={data.segmento.color}/>
                            <CardImoveis imoveis={data.imoveis}  bgcolor={data.segmento.color}/>
                            <CardIndicadores indicadores={data.indicadores} bgcolor={data.segmento.color}/>
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
                `/dados/fundamentos/${fii}`
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