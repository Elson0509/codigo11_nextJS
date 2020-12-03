import Head from 'next/head'
import {useState, useEffect, Fragment} from 'react';
import { useRouter } from 'next/router'
import axios from '../../../../util/axios-base'
import MainAdmin from '../../../../layout/MainAdmin/MainAdmin'
import NavbarAdmin from '../../../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../../../layout/HeaderAdmin/HeaderAdmin'
import GeneralCard from '../../../../components/Cards/GeneralCard'
import Spinner from '../../../../components/Loading/Spinner'
import ListSimulacaoAportado from '../../../../components/Lists/ListSimulacaoAportado/ListSimulacaoAportado'
import ListSimulacaoPatrimonio from '../../../../components/Lists/ListSimulacaoPatrimonio/ListSimulacaoPatrimonio'
import ChartVerticalAportes from '../../../../components/Charts/ChartVerticalAportes'
import ChartVerticalCotas from '../../../../components/Charts/ChartVerticalCotas'
import ChartLinePatrimonio from '../../../../components/Charts/ChartLinePatrimonio'
import ChartLineBarProventos from '../../../../components/Charts/ChartLineBarProventos'
import ChartLinePrecoPrecoMedio from '../../../../components/Charts/ChartLinePrecoPrecoMedio'
import EventosTable from '../../../../components/Tables/EventosTable'

const index = ({data}) => {
    const [alertdangerform, setAlertdangerform] = useState('')
    const [loading, setLoading] = useState(false)
    const [aporteInicial, setAporteInicial] = useState(1000)
    const [aportePeriodico, setAportePeriodico] = useState(1000)
    const [periodicidade, setPeriodicidade] = useState('mensal')
    const [dataInicio, setDataInicio] = useState({})
    const [dataMin, setDataMin] = useState({})
    const [dataFim, setDataFim] = useState(new Date().toISOString().split('T')[0])
    const [dataMax, setDataMax] = useState(new Date().toISOString().split('T')[0])
    const [reaplica, setReaplica] = useState('true')
    const [subscricoes, setSubscricoes] = useState('false')
    const [corretagem, setCorretagem] = useState(10)
    const [alertsuccessform, setAlertsuccessform] = useState('')
    const [spinner, setSpinner] = useState(false)
    const [simulacao, setSimulacao] = useState()
    const [errorMessage, setErrorMessage] = useState("")
    const router = useRouter()

    const validForm = () => {
        if(aporteInicial < 0 || aporteInicial > 500000){
            setAlertdangerform('O aporte inicial está incorreto.')
            return false;
        }
        if(aportePeriodico < 0 || aportePeriodico > 20000){
            setAlertdangerform('O aporte periódico está incorreto.')
            return false;
        }
        if(aporteInicial === 0 && aportePeriodico === 0){
            setAlertdangerform('Não é possível realizar uma simulação com ambos os aportes zerados. Não tenha medo de investir :)')
            return false;
        }
        if(periodicidade !== "mensal" && periodicidade !== "bimestral" && periodicidade !== "trimestral" && periodicidade !== "semestral" && periodicidade !== "anual"){
            setAlertdangerform('A periodicidade está incorreta.')
            return false;
        }
        if(new Date(dataInicio) < new Date(dataMin)){
            setAlertdangerform(`A data inicial não pode ser anterior à ${revertData(dataMin)}`)
            return false;
        }

        if(new Date(dataFim) > new Date(dataMax)){
            setAlertdangerform('A data final está no futuro, o que é impossível.')
            return false;
        }
        if(new Date(dataFim) <= new Date(dataInicio)){
            setAlertdangerform('A data final precisa ser posterior à data inicial.')
            return false;
        }
        if(corretagem < 0 || corretagem > 20){
            setAlertdangerform('A corretagem está incorreta.')
            return false;
        }
        return true
    }

    const simularHandler = (e) => {
        e.preventDefault()
        setSimulacao()
        if(validForm()){
            setSpinner(true)
            setAlertdangerform('')
            const path = `/dados/simulacao/${data.codigo}`
            axios.post(path,{
                codigo: data.codigo,
                aporteInicial,
                aportePeriodico,
                periodicidade,
                dataInicio,
                dataFim,
                reaplica: reaplica === 'true',
                subscricoes: subscricoes === 'true',
                corretagem
                })
                .then(res => {
                    console.log(res.data)
                    setSpinner(false)
                    setErrorMessage('')
                    setSimulacao(res.data)
                })
                .catch(err => {
                    setSpinner(false)
                    setAlertdangerform(err.response?.data?.message || 'Desculpe, por algum motivo um erro ocorreu.')
                })
        }
    }

    console.log(data)
    return (
        <Fragment>
            <NavbarAdmin/>
            <HeaderAdmin/>
            {data && !data.message && 
                <Fragment>
                    <Head>
                        <meta name="description" content={`Codigo11 - ${router.query.fii.toUpperCase()}11 - Simulador de investimento contínuo e periódico do FII`} />
                        <title>{`Codigo11: ${router.query.fii.toUpperCase()}11 - Simulação de investimento constante`}</title>
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
                        title="Simulação de investimento constante"
                        fii={data.codigo}>
                            <GeneralCard title="Parâmetros" comentary="Especifique como você deseja simular um investimento periódico neste FII.">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="ativo">Ativo</label>
                                        <input type="text" className="form-control" name="ativo" id="ativo" aria-describedby="ativohelp" value={data.codneg} disabled/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="aporte_inicial">Aporte inicial</label>
                                        <select className="form-control" name="aporte_inicial" id="aporte_inicial" value={aporteInicial} onChange={(e) => setAporteInicial(e.target.value)}>
                                            <option value="0">R$ 0</option>
                                            <option value="1000">R$ 1.000</option>
                                            <option value="2000">R$ 2.000</option>
                                            <option value="5000">R$ 5.000</option>
                                            <option value="10000">R$ 10.000</option>
                                            <option value="15000">R$ 15.000</option>
                                            <option value="20000">R$ 20.000</option>
                                            <option value="30000">R$ 30.000</option>
                                            <option value="40000">R$ 40.000</option>
                                            <option value="50000">R$ 50.000</option>
                                            <option value="75000">R$ 75.000</option>
                                            <option value="100000">R$ 100.000</option>
                                            <option value="150000">R$ 150.000</option>
                                            <option value="200000">R$ 200.000</option>
                                            <option value="300000">R$ 300.000</option>
                                            <option value="400000">R$ 400.000</option>
                                            <option value="500000">R$ 500.000</option>
                                        </select>
                                    </div>
                                    <div className="row">
                                        <div className="col form-group">
                                            <label htmlFor="aporte_periodico">Aporte periódico</label>
                                            <select className="form-control" 
                                                name="aporte_periodico" 
                                                id="aporte_periodico" 
                                                value={aportePeriodico} 
                                                onChange={(e) => setAportePeriodico(e.target.value)}>
                                                    <option value="0">R$ 0</option>
                                                    <option value="50">R$ 50</option>
                                                    <option value="100">R$ 100</option>
                                                    <option value="200">R$ 200</option>
                                                    <option value="300">R$ 300</option>
                                                    <option value="400">R$ 400</option>
                                                    <option value="500">R$ 500</option>
                                                    <option value="750">R$ 750</option>
                                                    <option value="1000">R$ 1.000</option>
                                                    <option value="2000">R$ 2.000</option>
                                                    <option value="5000">R$ 5.000</option>
                                                    <option value="10000">R$ 10.000</option>
                                                    <option value="15000">R$ 15.000</option>
                                                    <option value="20000">R$ 20.000</option>
                                            </select>
                                        </div>
                                        <div className="col form-group">
                                            <label htmlFor="periodicidade">Periodicidade</label>
                                            <select className="form-control" 
                                                name="periodicidade" 
                                                id="periodicidade" 
                                                value={periodicidade} 
                                                onChange={e => setPeriodicidade(e.target.value)}>
                                                    <option value="mensal">Mensal</option>
                                                    <option value="bimestral">Bimestral</option>
                                                    <option value="trimestral">Trimestral</option>
                                                    <option value="semestral">Semestral</option>
                                                    <option value="anual">Anual</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col form-group">
                                            <label htmlFor="data_inicial">Data Inicial</label>
                                            <input type="date" 
                                                className="form-control" 
                                                name="data_inicial" 
                                                id="data_inicial" 
                                                aria-describedby="data_inicialhelp"
                                                value={dataInicio}
                                                min={dataMin}
                                                max={dataMax}
                                                onChange={e => setDataInicio(e.target.value)}/>
                                        </div>
                                        <div className="col form-group">
                                            <label htmlFor="data_final">Data Final</label>
                                            <input type="date" 
                                                className="form-control" 
                                                name="data_final" 
                                                id="data_final" 
                                                aria-describedby="data_finalhelp"
                                                value={dataFim}
                                                min={dataMin}
                                                max={dataMax}
                                                onChange={e => setDataFim(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="reaplica">Reaplica aluguéis?</label>
                                        <select className="form-control" name="reaplica" id="reaplica" value={reaplica} onChange={e => setReaplica(e.target.value)}>
                                            <option value="true">Sim</option>
                                            <option value="false">Não</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="subscricao">Participa de subscrições?</label>
                                        <select className="form-control" name="subscricao" id="subscricao" value={subscricoes} onChange={e => setSubscricoes(e.target.value)}>
                                            <option value="true">Sim</option>
                                            <option value="false">Não</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="corretagem">Valor da corretagem:</label>
                                        <select className="form-control" name="corretagem" id="corretagem" value={corretagem} onChange={e => setCorretagem(e.target.value)}>
                                            <option value="0">R$ 0</option>
                                            <option value="5">R$ 5</option>
                                            <option value="10">R$ 10</option>
                                            <option value="20">R$ 20</option>
                                        </select>
                                    </div>
                                    {alertdangerform &&
                                        <div className="alert alert-danger" role="alert">
                                            {alertdangerform}
                                    </div>
                                    }
                                    {alertsuccessform &&
                                        <div className="alert alert-success" role="alert">
                                            {alertsuccessform}
                                    </div>
                                    }
                                    <div className="text-center">
                                        <button type="submit" className="btn-wide mb-2 mr-2 btn btn-primary btn-lg" onClick={simularHandler}>Simular!</button>
                                    </div>
                                    {spinner && <Spinner/>}
                                </form>
                            </GeneralCard>
                            {
                                simulacao &&
                                <Fragment>
                                    <div className="row">
                                        <div className="col-lg-6 col-sm-12">
                                            <GeneralCard 
                                                title='Informações gerais' 
                                                titleStyle='text-center' 
                                                comentary='Valor investido, preço final de cotas e informações pertinentes'>
                                                <ListSimulacaoAportado simulacao={simulacao}/>
                                            </GeneralCard>
                                        </div>
                                        <div className="col-lg-6 col-sm-12">
                                            <GeneralCard  
                                                title='Informações patrimoniais' 
                                                titleStyle='text-center'
                                                comentary='Patrimônio final e rentabilidades calculadas pela TIR'>
                                                <ListSimulacaoPatrimonio simulacao={simulacao}/>
                                            </GeneralCard>
                                        </div>
                                        <div className="col-12 my-2 py-2 bg-light">
                                            <ChartVerticalAportes aportes={simulacao.aportes_data} label='Aportes'/>
                                        </div>
                                        <div className="col-12 my-2 py-2 bg-light">
                                            <ChartVerticalCotas eventos={simulacao.eventos} label='Quantidade de cotas'/>
                                        </div>
                                        <div className="col-12 my-2 py-2 bg-light">
                                            <ChartLinePatrimonio eventos={simulacao.eventos} label='Evolução patrimonial'/>
                                        </div>
                                        <div className="col-12 my-2 py-2 bg-light">
                                            <ChartLineBarProventos eventos={simulacao.eventos} label='Proventos Recebidos'/>
                                        </div>
                                        <div className="col-12 my-2 py-2 bg-light">
                                            <ChartLinePrecoPrecoMedio eventos={simulacao.eventos} label='Preço x Preço Médio'/>
                                        </div>
                                        <div className="col-12 my-2 py-2">
                                            <EventosTable eventos={simulacao.eventos}/>
                                        </div>
                                    </div>
                                </Fragment>
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
                `/dados/simulacao/${fii}`
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