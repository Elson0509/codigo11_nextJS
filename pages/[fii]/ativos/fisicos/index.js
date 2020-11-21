import Head from 'next/head'
import {useState, useEffect, Fragment} from 'react';
import {Row, Col, Button, Card, Accordion } from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from '../../../../util/axios-base'
import Icon from '../../../../components/Icon/Icon'
import GeneralCard from '../../../../components/Cards/GeneralCard'
import ChartImovelArea from '../../../../components/Charts/ChartImovelArea'
import ChartImovelPercReceita from '../../../../components/Charts/ChartImovelPercReceita'
import VectorMap from '../../../../components/Map/VectorMap'
import PanelAdmin from '../../../../layout/PanelAdmin/PanelAdmin'
import MainAdmin from '../../../../layout/MainAdmin/MainAdmin'
import NavbarAdmin from '../../../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../../../layout/HeaderAdmin/HeaderAdmin'
import ListTerrenos from '../../../../components/Lists/ListTerrenos/ListTerrenos'

const index = ({data}) => {
    const [toggleTerrenos, setToggleTerreno] = useState(false)
    const router = useRouter()
    const terrenosColor="primary"
    const terrenosMarkerColor="#0275d8"
    const rendaAcabadoColor="success"
    const rendaAcabadoMarkerColor="#5cb85c"
    console.log(data)
    return (
        <Fragment>
            <NavbarAdmin/>
            <HeaderAdmin/>
            {data && !data.message && 
                <Fragment>
                    <Head>
                        <meta name="description" content={`Codigo11 - ${router.query.fii.toUpperCase()}11 - Informações de ativos físicos do FII`} />
                        <title>{`Codigo11: ${router.query.fii.toUpperCase()}11 - Ativos físicos do FII`}</title>
                        {/* <script data-ad-client="ca-pub-8540652797620487" 
                            async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
                        </script> */}
                    </Head>
                    <PanelAdmin 
                        bgcolor={data.segmento.bgcolor}
                        fiiname={data.razao_social}
                        fiiticker={`${router.query.fii.toUpperCase()}11`}
                        icon={data.segmento.icon || "building"}
                        descricao={data.segmento.descricao}
                    />
                    <MainAdmin>
                        <Accordion>
                            {/*Terrenos*/}
                            <div className={`mb-3 card bg-${terrenosColor}`}>
                                <Accordion.Toggle 
                                    as={Button} 
                                    variant="link" 
                                    eventKey="terrenosAccordion" 
                                    className="btn-no-box-shadow text-left text-uppercase nolink"
                                    onClick={()=> setToggleTerreno(prev => !prev)}>
                                    <div className={`card-header bg-${terrenosColor} text-white`}>
                                        <h4 className={`card-title`}>
                                            <Icon icon={toggleTerrenos && "minus-square" || "plus-square"}/>
                                            <span className="ml-2">
                                                Terrenos
                                            </span>
                                        </h4>
                                    </div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="terrenosAccordion">
                                    <Fragment>
                                    <Row className="card-body">
                                        <ListTerrenos terrenos={data.terrenos}/>
                                    </Row>
                                    {data.terrenos.length > 0 &&
                                        <Fragment>
                                            <div className="card-footer"/>
                                            <Row>
                                                <Col sm="12">
                                                    <GeneralCard title="Terrenos por área" titleStyle="text-center">
                                                        <ChartImovelArea imoveis={data.terrenos} type="Terreno"/>
                                                    </GeneralCard>
                                                </Col>
                                                {data.terrenos.reduce((acc, curr)=> {
                                                    return acc + curr.porc_rec_fii
                                                }, 0) !=0 &&
                                                <Col sm="12">
                                                    <GeneralCard title="Terrenos por % Receita" titleStyle="text-center">
                                                        <ChartImovelPercReceita imoveis={data.terrenos} type="Terreno"/>
                                                    </GeneralCard>
                                                </Col>
                                                }
                                                <Col sm="12">
                                                    <GeneralCard title="Mapa de Terrenos" titleStyle="text-center">
                                                        <VectorMap imoveis={data.terrenos} markerColor={terrenosMarkerColor}/>
                                                    </GeneralCard>
                                                </Col>
                                            </Row>
                                        </Fragment>
                                    }
                                    </Fragment>
                                </Accordion.Collapse>
                            </div>
                        </Accordion>
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
                `/ativos/fis/${fii}`
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