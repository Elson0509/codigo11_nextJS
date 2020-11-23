import Head from 'next/head'
import {useState, useEffect, Fragment} from 'react';
import {Row, Col, Button, Card, Accordion } from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from '../../../../util/axios-base'
import Icon from '../../../../components/Icon/Icon'
import GeneralCard from '../../../../components/Cards/GeneralCard'
import ChartImovelArea from '../../../../components/Charts/ChartImovelArea'
import ChartImovelPercReceita from '../../../../components/Charts/ChartImovelPercReceita'
import ChartHorizontalLabelsObject from '../../../../components/Charts/ChartHorizontalLabelsObject'
import VectorMap from '../../../../components/Map/VectorMap'
import PanelAdmin from '../../../../layout/PanelAdmin/PanelAdmin'
import MainAdmin from '../../../../layout/MainAdmin/MainAdmin'
import NavbarAdmin from '../../../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../../../layout/HeaderAdmin/HeaderAdmin'
import ListTerrenos from '../../../../components/Lists/ListTerrenos/ListTerrenos'
import ListRendaAcabados from '../../../../components/Lists/ListRendaAcabados/ListRendaAcabados'
import ListSingle from '../../../../components/Lists/ListSingle/ListSingle'
import ListCaracContr from '../../../../components/Lists/ListCaracContr/ListCaracContr'
import {barCharColors, barCharColorsHover, lineCharColors, lineCharHover} from '../../../../util/Utilities'

const index = ({data}) => {
    const [toggleTerreno, setToggleTerreno] = useState(false)
    const [toggleRendaAcabado, setToggleRendaAcabado] = useState(false)
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
                        {/*Terrenos*/}
                        {data.terrenos.length > 0 &&
                        <Accordion>
                            <div className={`mb-3 card bg-${terrenosColor}`}>
                                <Accordion.Toggle 
                                    as={Button} 
                                    variant="link" 
                                    eventKey="terrenosAccordion" 
                                    className="btn-no-box-shadow text-left text-uppercase nolink"
                                    onClick={()=> setToggleTerreno(prev => !prev)}>
                                    <div className={`card-header bg-${terrenosColor} text-white`}>
                                        <h4 className={`card-title`}>
                                            <Icon icon={toggleTerreno && "minus-square" || "plus-square"}/>
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
                                        <div className="card-footer"/>
                                        <Row>
                                            <Col sm="12">
                                                <Col>
                                                    <GeneralCard title="Terrenos por área" titleStyle="text-center" addClasses="slow-shadow">
                                                        <ChartImovelArea imoveis={data.terrenos} type="Terreno"/>
                                                    </GeneralCard>
                                                </Col>
                                            </Col>
                                            { data.terrenos.some(el => el.porc_rec_fii != 0) &&
                                            <Col sm="12">
                                                <Col>
                                                    <GeneralCard title="Terrenos por % Receita" titleStyle="text-center" addClasses="slow-shadow">
                                                        <ChartImovelPercReceita imoveis={data.terrenos} type="Terreno"/>
                                                    </GeneralCard>
                                                </Col>
                                            </Col>
                                            }
                                            <Col sm="12">
                                                <Col>
                                                    <GeneralCard title="Mapa de Terrenos" titleStyle="text-center" addClasses="slow-shadow">
                                                        <VectorMap imoveis={data.terrenos} markerColor={terrenosMarkerColor}/>
                                                    </GeneralCard>
                                                </Col>
                                            </Col>
                                        </Row>
                                    </Fragment>
                                </Accordion.Collapse>
                            </div>
                        </Accordion>
                        }
                        {/*Renda-Acabado*/}
                        {data.renda_acabado.length > 0 &&
                        <Accordion>
                            <div className={`mb-3 card bg-${rendaAcabadoColor}`}>
                                <Accordion.Toggle 
                                    as={Button} 
                                    variant="link" 
                                    eventKey="rendaAcabadoAccordion" 
                                    className="btn-no-box-shadow text-left text-uppercase nolink"
                                    onClick={()=> setToggleRendaAcabado(prev => !prev)}>
                                    <div className={`card-header bg-${rendaAcabadoColor} text-white`}>
                                        <h4 className={`card-title`}>
                                            <Icon icon={toggleRendaAcabado && "minus-square" || "plus-square"}/>
                                            <span className="ml-2">
                                                Imóveis para renda
                                            </span>
                                        </h4>
                                    </div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="rendaAcabadoAccordion">
                                    <Fragment>
                                        <Row className="card-body">
                                            <ListRendaAcabados imoveis={data.renda_acabado}/>
                                        </Row>
                                        <div className="card-footer"/>
                                        <Row>
                                            <Col sm="12">
                                                <Col>
                                                    <GeneralCard title="Imóveis por área" titleStyle="text-center" addClasses="slow-shadow">
                                                        <ChartImovelArea imoveis={data.renda_acabado} type="Imóvel"/>
                                                    </GeneralCard>
                                                </Col>
                                            </Col>
                                            { data.renda_acabado.some(el => el.porc_rec_fii != 0) &&
                                            <Col sm="12">
                                                <Col>
                                                    <GeneralCard title="Imóveis por % Receita" titleStyle="text-center" addClasses="slow-shadow">
                                                        <ChartImovelPercReceita imoveis={data.renda_acabado} type="Imóvel"/>
                                                    </GeneralCard>
                                                </Col>
                                            </Col>
                                            }
                                            <Col sm="12">
                                                <Col>
                                                    <GeneralCard title="Mapa de Imóveis para renda" titleStyle="text-center" addClasses="slow-shadow">
                                                        <VectorMap imoveis={data.renda_acabado} markerColor={rendaAcabadoMarkerColor}/>
                                                    </GeneralCard>
                                                </Col>
                                            </Col>
                                        </Row>
                                        <Row>
                                           {data.contrato_locacao_renda_acabado &&
                                                Object.entries(data.contrato_locacao_renda_acabado).some(el => el[1] != 0) &&
                                                    <Col sm="12">
                                                        <Col>
                                                            <GeneralCard title="Prazos dos contratos" titleStyle="text-center" addClasses="slow-shadow">
                                                                <ChartHorizontalLabelsObject 
                                                                    label="%"
                                                                    object={data.contrato_locacao_renda_acabado}
                                                                    backgroundColor={barCharColors[0]}
                                                                    hoverBackgroundColor={barCharColorsHover[0]}
                                                                    borderColor={lineCharColors[0]}
                                                                    hoverBorderColor={lineCharHover[0]}
                                                                    />
                                                            </GeneralCard>
                                                        </Col>
                                                    </Col>
                                            }
                                            {data.contrato_indexadores &&
                                                Object.entries(data.contrato_indexadores).length > 0 &&
                                                    <Col sm="12">
                                                        <Col>
                                                            <GeneralCard title="Índices dos contatos" titleStyle="text-center" addClasses="slow-shadow">
                                                                <ChartHorizontalLabelsObject 
                                                                    label="%"
                                                                    object={data.contrato_indexadores}
                                                                    backgroundColor={barCharColors[1]}
                                                                    hoverBackgroundColor={barCharColorsHover[1]}
                                                                    borderColor={lineCharColors[1]}
                                                                    hoverBorderColor={lineCharHover[1]}
                                                                    />
                                                            </GeneralCard>
                                                        </Col>
                                                    </Col>
                                            }
                                        </Row>
                                        <div className="card-footer"/>
                                        <Row>
                                            <Col sm="12">
                                                <Col>
                                                    <ListCaracContr 
                                                        caracteristicas={data.características_contratuais_renda_acabado} 
                                                        themeColor={rendaAcabadoColor}
                                                        addClasses="slow-shadow"/>
                                                </Col>
                                            </Col>
                                        </Row>
                                        {data.politica_seguro_renda_acabado &&
                                            <Row>
                                                <Col sm="12">
                                                    <Col>
                                                        <ListSingle 
                                                            themeColor={rendaAcabadoColor}
                                                            icon="house-damage" 
                                                            title="Política de seguro para Imóveis para Renda" 
                                                            description={data.politica_seguro_renda_acabado}
                                                            addClasses="slow-shadow"
                                                        />
                                                    </Col>
                                                </Col>
                                            </Row>
                                        }
                                    </Fragment>
                                </Accordion.Collapse>
                            </div>
                        </Accordion>
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