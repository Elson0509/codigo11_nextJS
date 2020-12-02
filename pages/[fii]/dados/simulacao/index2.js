import Head from 'next/head'
import {useState, useEffect, Fragment} from 'react';
import {Row, Col} from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from '../../../../util/axios-base'
import MainAdmin from '../../../../layout/MainAdmin/MainAdmin'
import NavbarAdmin from '../../../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../../../layout/HeaderAdmin/HeaderAdmin'
import {userId} from '../../../../util/UserFunctions'
import GeneralCard from '../../../../components/Cards/GeneralCard'
import Spinner from '../../../../components/Loading/Spinner'

const index = () => {
    const [dados, setDados] = useState()
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [codigo, setCodigo] = useState('')
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
    const [alertdangerform, setAlertdangerform] = useState('')
    const [alertsuccessform, setAlertsuccessform] = useState('')
    const [spinner, setSpinner] = useState(false)
    const [simulacao, setSimulacao] = useState()

    const router = useRouter()
    const fii = router.query.fii

    useEffect(() => {
        // if(userId()){
        //     const path = `/dados/simulacao/${fii}`
        //     axios.get(path)
        //         .then(res => {
        //             setLoading(false)
        //             setDados(res.data)
        //             setCodigo(res.data.codneg)
        //             setDataMin(res.data.dataMin)
        //             setDataInicio(res.data.dataMin)
        //         })
        //         .catch(err => {
        //             setLoading(false)
        //             setErrorMessage(err.response.data.message || 'Desculpe, mas um erro ocorreu.')
        //         })
        // }
        // else{
        //     setLoading(false)
        //     setErrorMessage('Desculpe, mas você precisa estar logado para utilizar esta ferramenta.')
        // }
            if(!fii)
                return null
            const path = `/dados/simulacao/${fii}`
            console.log('path', path)
            axios.get(path)
                .then(res => {
                    setLoading(false)
                    setDados(res.data)
                    setCodigo(res.data.codneg)
                    setDataMin(res.data.dataMin)
                    setDataInicio(res.data.dataMin)
                })
                .catch(err => {
                    setLoading(false)
                    setErrorMessage(err.response.data.message || 'Desculpe, mas um erro ocorreu.')
                })
    }, [])

    useEffect(() => {
        if (router.asPath !== router.route) {
            const fii = router.query.fii
            const path = `/dados/simulacao/${fii}`
            console.log('path', path)
            axios.get(path)
                .then(res => {
                    setLoading(false)
                    setDados(res.data)
                    setCodigo(res.data.codneg)
                    setDataMin(res.data.dataMin)
                    setDataInicio(res.data.dataMin)
                })
                .catch(err => {
                    setLoading(false)
                    setErrorMessage(err.response.data.message || 'Desculpe, mas um erro ocorreu.')
                })
        }
    }, [router])

    const simularHandler = (e) => {
        e.preventDefault()
        setSimulacao()
        if(validForm()){
            setSpinner(true)
            setAlertdangerform('')
            const path = `/dados/simulacao/${fii}`
            axios.post(path,{
                codigo,
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
                    setSpinner(false)
                    setErrorMessage('')
                    setSimulacao(res.data)
                })
                .catch(err => {
                    setSpinner(false)
                    setAlertdangerform(err.response.data.message || 'Desculpe, por algum motivo um erro ocorreu.')
                })
        }
    }

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

    return (
        <Fragment>
            <NavbarAdmin/>
            <HeaderAdmin/>
                {dados && 
                <MainAdmin
                    bgcolor={dados.segmento.bgcolor}
                    fiiname={dados.razao_social}
                    fiiticker={`${router.query.fii.toUpperCase()}11`}
                    icon={dados.segmento.icon || "building"}
                    descricao={dados.segmento.descricao}
                    title="Simulação de investimento constante">
                    <Fragment>
                            <Fragment>
                                <GeneralCard title="Parâmetros" comentary="Especifique como você deseja simular um investimento periódico neste FII.">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="ativo">Ativo</label>
                                            <input type="text" className="form-control" name="ativo" id="ativo" aria-describedby="ativohelp" value={codigo} disabled/>
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
                                {/* {
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
                                            <div className="col-12 mt-4">
                                                <ChartVerticalAportes aportes={simulacao.aportes_data} label='Aportes'/>
                                            </div>
                                            <div className="col-12 mt-4">
                                                <ChartVerticalCotas eventos={simulacao.eventos} label='Quantidade de cotas'/>
                                            </div>
                                            <div className="col-12 mt-4">
                                                <ChartLinePatrimonio eventos={simulacao.eventos} label='Evolução patrimonial'/>
                                            </div>
                                            <div className="col-12 mt-4">
                                                <ChartLineBarProventos eventos={simulacao.eventos} label='Proventos Recebidos'/>
                                            </div>
                                            <div className="col-12 mt-4">
                                                <ChartLinePrecoPrecoMedio eventos={simulacao.eventos} label='Preço x Preço Médio'/>
                                            </div>
                                            <div className="col-12 mt-4">
                                                <EventosTable eventos={simulacao.eventos}/>
                                            </div>
                                        </div>
                                    </Fragment>
                                } */}
                            </Fragment>
                    </Fragment>
                    </MainAdmin>
                }
                {loading && <Spinner/>}
                {errorMessage && 
                    <div className="alert alert-danger">
                        <p>{errorMessage}</p>
                    </div>
                }
        </Fragment>
    );
}



export default index;