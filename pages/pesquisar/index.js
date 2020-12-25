import Head from 'next/head'
import {useState, Fragment} from 'react';
import axios from '../../util/axios-base'
import NavbarAdmin from '../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../layout/HeaderAdmin/HeaderAdmin'
import GeneralCard from '../../components/Cards/GeneralCard'
import classes from './pesquisar.module.css'
import {numberBrazilianMoney} from '../../util/Utilities'
import SearchTable from '../../components/Tables/SearchTable'
import {
    ButtonGroup, 
    Button,
    Card
} from 'react-bootstrap';
import CheckBoxGestao from '../../components/Buttons/CheckBoxGestao/CheckBoxGestao'
import LoadingAdvancedSearch from '../../components/Loading/LoadingAdvancedSearch'
import Icon from '../../components/Icon/Icon'

const index = ({data}) => {
    const [result, setResult] = useState()
    const [loadingSearch, setLoadingSearch] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [search, setSearch] = useState("")
    const [textPesquisar, setTextPesquisar] = useState('Pesquisar')
    const [selectAvancada, setSelectAvancada] = useState(false)
    const [selectDY, setSelectDY] = useState(false)
    const [selectSegmento, setSelectSegmento] = useState(false)
    const [selectQtdNegocios, setSelectQtdNegocios] = useState(false)
    const [selectPL, setSelectPL] = useState(false)
    const [selectPVP, setSelectPVP] = useState(false)
    const [selectVPC, setSelectVPC] = useState(false)
    const [selectAtvFis, setSelectAtvFis] = useState(false)
    const [selectGestao, setSelectGestao] = useState(false)
    const [dyChange, setDyChange] = useState('>=')
    const [dy, setDy] = useState(0)
    const [gestao, setGestao] = useState(0)
    const [segmento, setSegmento] = useState([2])
    const [negociosChange, setNegociosChange] = useState('>=')
    const [negocios, setNegocios] = useState(10)
    const [plChange, setPlChange] = useState('>=')
    const [pl, setPl] = useState(100000000)
    const [pvpChange, setPvpChange] = useState('>=')
    const [pvp, setPvp] = useState(1)
    const [vpcChange, setVpcChange] = useState('>=')
    const [vpc, setVpc] = useState(50)
    const [atvFisChange, setAtvFisChange] = useState('>=')
    const [atvFis, setAtvFis] = useState(2)

    const pesquisarHandler = () => {
        setLoadingSearch(true)
        setTextPesquisar('Pesquisando...')
        axios.get('/fii/search', {
            params: {
                search,
                selectAvancada,
                selectDY,
                selectSegmento,
                selectQtdNegocios,
                selectPL,
                selectPVP,
                selectVPC,
                selectAtvFis,
                selectGestao,
                dyChange,
                dy,
                segmento,
                negociosChange,
                negocios,
                plChange,
                gestao,
                pl,
                pvpChange,
                pvp,
                vpcChange,
                vpc,
                atvFisChange,
                atvFis
            }
        })
        .then(res => {
            setLoadingSearch(false)
            setTextPesquisar('Pesquisar')
            setResult(res.data)
        })
        .catch(err => {
            setLoadingSearch(false)
            setTextPesquisar('Pesquisar')
            setErrorMessage(err.response?.data?.message || 'Ops, um erro ocorreu!')
        })
    }

    const getSegmentosOptions = data.segmentos.map(seg => {
        return <option 
            value={seg.segmento_fii_id}
            key={`seg${seg.segmento_fii_id}`}
            >
                {seg.descricao}
        </option>
    })

    const selectSegmentosHandler = (ev) => {
        if(ev.target.options){
            let newSegmentos = []
            for(let i=0; i<ev.target.options.length; i++){
                if (ev.target.options[i].selected)
                    newSegmentos.push(ev.target.options[i].value)
            }
            setSegmento(newSegmentos)
        }
    }

    return (
        <Fragment>
            <NavbarAdmin/>
            <HeaderAdmin/>
            {data && !data.message && 
                <Fragment>
                    <Head>
                        <meta name="description" content={`Codigo11 - Pesquisa de Fundos de Investimento Imobiliários ativos na bolsa.`} />
                        <title>{`Codigo11: Pesquisa de Fundos Imobiliários (FII)`}</title>
                        {/* <script data-ad-client="ca-pub-8540652797620487" 
                            async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
                        </script> */}
                    </Head>
                    <Fragment>
                        <GeneralCard className="col-12" title="Pesquisa Avançada de Fundos Imobiliários" titleStyle="text-center">
                            <div className="mb-4">
                                <input 
                                    className="form-control mb-1" 
                                    type="text" 
                                    placeholder="Procure por nome ou código..." 
                                    aria-label="procurar" 
                                    value={search} 
                                    onChange={(ev) => setSearch(ev.target.value)}
                                />
                                {!selectAvancada &&
                                    <div>
                                        <button className="border-0 btn btn-outline-dark btn-sm btn-no-box-shadow btn-no-outline" onClick={() => setSelectAvancada(prev => !prev)}>
                                            Pesquisa Detalhada <Icon icon='caret-right'/>
                                        </button>
                                    </div>
                                    ||
                                    <div>
                                        <button className="border-0 btn btn-dark btn-sm btn-no-box-shadow btn-no-outline" onClick={() => setSelectAvancada(prev => !prev)}>
                                            Pesquisa Detalhada <Icon icon='caret-down'/>
                                        </button>
                                    </div>
                                }
                                {selectAvancada &&
                                    <div className="text-center my-4">
                                        <ButtonGroup className="flex-wrap" size="lg">
                                            <Button variant="light" onClick={() => setSelectDY(prev => !prev)}
                                                    active={selectDY}>Yield médio</Button>
                                            <Button variant="danger" onClick={() => setSelectSegmento(prev => !prev)}
                                                    active={selectSegmento}>Segmentos</Button>
                                            <Button variant="primary" onClick={() => setSelectQtdNegocios(prev => !prev)}
                                                    active={selectQtdNegocios}>Negócios</Button>
                                            <Button variant="success" onClick={() => setSelectPL(prev => !prev)}
                                                    active={selectPL}>Pat. Líquido</Button>
                                            <Button variant="warning" onClick={() => setSelectPVP(prev => !prev)}
                                                    active={selectPVP}>P/VP</Button>
                                            <Button variant="secondary" onClick={() => setSelectVPC(prev => !prev)}
                                                    active={selectVPC}>Cotação</Button>
                                            <Button variant="dark" onClick={() => setSelectAtvFis(prev => !prev)}
                                                    active={selectAtvFis}>At. Físicos</Button>
                                            <Button variant="info" onClick={() => setSelectGestao(prev => !prev)}
                                                    active={selectGestao}>Gestão</Button>
                                        </ButtonGroup>
                                    </div>
                                }
                                <div className="divider"/>
                                <div className="row">
                                    {selectAvancada && (
                                        <Fragment>
                                            {selectDY && 
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2 col-12">
                                                    <Card body inverse bg="light">
                                                        <Card.Title className={`text-center text-uppercase ${classes.Size_title}`}>Dividend Yeld Médio (mensal)</Card.Title>
                                                        <select value={dyChange} className='form-control' onChange={(ev) => setDyChange(ev.target.value)}>
                                                            <option value=">=">Maior que</option>
                                                            <option value="<=">Menor que</option>
                                                        </select>
                                                        <input type="range" className={`form-control ${classes.Slider}`} min="0" max="2" step="0.1" value={dy} onChange={(ev) => setDy(ev.target.value)}/>
                                                        <h4 className="text-center enfase">{dy}%</h4>
                                                    </Card>
                                                </div>
                                            }
                                            {selectSegmento &&  
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2 col-12">
                                                    <Card body inverse bg="danger">
                                                        <Card.Title className={`text-center text-uppercase text-white ${classes.Size_title}`}>Segmentos</Card.Title>
                                                        <select value={segmento} multiple className='form-control' onChange={selectSegmentosHandler}>
                                                            {getSegmentosOptions}
                                                        </select>
                                                    </Card>
                                                </div>
                                            }
                                            {selectQtdNegocios && 
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2 col-12">
                                                    <Card body inverse bg="primary">
                                                        <Card.Title className={`text-center text-uppercase text-white ${classes.Size_title}`}>Quantidade de negócios</Card.Title>
                                                        <select className='form-control' value={negociosChange} onChange={(ev) => setNegociosChange(ev.target.value)}>
                                                            <option value=">=">Maior que</option>
                                                            <option value="<=">Menor que</option>
                                                        </select>
                                                        <select className='form-control mt-2' value={negocios} onChange={(ev) => setNegocios(ev.target.value)}>
                                                            <option value="10">10 por dia</option>
                                                            <option value="25">30 por dia</option>
                                                            <option value="50">50 por dia</option>
                                                            <option value="100">100 por dia</option>
                                                            <option value="250">250 por dia</option>
                                                            <option value="500">500 por dia</option>
                                                            <option value="1000">1000 por dia</option>
                                                        </select>
                                                    </Card>
                                                </div>
                                            }
                                            {selectPL && 
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2 col-12">
                                                    <Card body inverse bg="success">
                                                    <Card.Title className={`text-center text-uppercase text-white ${classes.Size_title}`}>Patrimônio Líquido</Card.Title>
                                                        <select className='form-control' value={plChange} onChange={(ev) => setPlChange(ev.target.value)}>
                                                            <option value=">=">Maior que</option>
                                                            <option value="<=">Menor que</option>
                                                        </select>
                                                        <select className='form-control mt-2' value={pl} onChange={(ev) => setPl(ev.target.value)}>
                                                            <option value="0">R$ 0</option>
                                                            <option value="10000000">R$10 Milhões</option>
                                                            <option value="50000000">R$50 Milhões</option>
                                                            <option value="100000000">R$100 Milhões</option>
                                                            <option value="200000000">R$200 Milhões</option>
                                                            <option value="300000000">R$300 Milhões</option>
                                                            <option value="500000000">R$500 Milhões</option>
                                                            <option value="750000000">R$750 Milhões</option>
                                                            <option value="1000000000">R$1 Bilhão</option>
                                                            <option value="2000000000">R$2 Bilhões</option>
                                                            <option value="3000000000">R$3 Bilhões</option>
                                                            <option value="4000000000">R$4 Bilhões</option>
                                                            <option value="5000000000">R$5 Bilhões</option>
                                                        </select>
                                                    </Card>
                                                </div>
                                            }
                                            {selectPVP && 
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2 col-12">
                                                    <Card body inverse bg="warning">
                                                        <Card.Title className={`text-center text-uppercase text-white ${classes.Size_title}`}>Preço / Valor Patrimonial</Card.Title>
                                                        <select className='form-control' value={pvpChange} onChange={(ev) => setPvpChange(ev.target.value)}>
                                                            <option value=">=">Maior que</option>
                                                            <option value="<=">Menor que</option>
                                                        </select>
                                                        <input type="range" className={`form-control ${classes.Slider}`} min="0.1" max="3" step="0.1" value={pvp} onChange={(ev) => setPvp(ev.target.value)}/>
                                                        <h4 className="text-center enfase text-white">{pvp}</h4>
                                                    </Card>
                                                </div>
                                            }
                                            {selectVPC && 
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2 col-12">
                                                    <Card body bg="secondary">
                                                        <Card.Title className={`text-center text-uppercase text-white ${classes.Size_title}`}>Cotação</Card.Title>
                                                        <select className='form-control' value={vpcChange} onChange={(ev) => setVpcChange(ev.target.value)}>
                                                            <option value=">=">Maior que</option>
                                                            <option value="<=">Menor que</option>
                                                        </select>
                                                        <input type="range" className={`form-control ${classes.Slider}`} min="10" max="1000" step="10" value={vpc} onChange={(ev) => setVpc(ev.target.value)}/>
                                                        <h4 className="text-center enfase text-white">{numberBrazilianMoney(vpc)}</h4>
                                                    </Card>
                                                </div>
                                            }
                                            {selectAtvFis && 
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2 col-12">
                                                    <Card body inverse bg="dark">
                                                        <Card.Title className={`text-center text-uppercase text-white ${classes.Size_title}`}>Quantidade de ativos físicos</Card.Title>
                                                        <select className='form-control' value={atvFisChange} onChange={(ev) => setAtvFisChange(ev.target.value)}>
                                                            <option value=">=">Maior que</option>
                                                            <option value="<=">Menor que</option>
                                                        </select>
                                                        <input type="range" className={`form-control ${classes.Slider}`} min="0" max="30" step="1" value={atvFis} onChange={(ev) => setAtvFis(ev.target.value)}/>
                                                        <h4 className="text-center enfase text-white">{atvFis}</h4>
                                                    </Card>
                                                </div>
                                            }
                                            {selectGestao && 
                                                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2 col-12">
                                                    <Card body inverse bg="info">
                                                        <Card.Title className={`text-center text-uppercase text-white ${classes.Size_title}`}>Tipo de Gestão</Card.Title>
                                                        <CheckBoxGestao clicked={(ev) => setGestao(prev => prev == 1 ? 0 : 1)}/>
                                                    </Card>
                                                </div>
                                            }
                                        </Fragment>
                                    )}
                                </div>
                                <div className="text-center">
                                    {result && result.length>0 && 
                                        <div className="alert alert-success mt-2" role="alert">
                                            {result.length > 1 ? `Foram achados ${result.length} fundos!` : 'Foi achado um fundo!'}
                                        </div>
                                    }
                                    <button className={`btn btn-primary btn-rounded btn-lg my-4 ${loadingSearch ? 'disabled' : ''}`} onClick={pesquisarHandler}>{textPesquisar}</button>
                                </div>
                                {loadingSearch && <LoadingAdvancedSearch/>}
                            </div>
                        </GeneralCard>
                    </Fragment>
                    {
                        result &&
                        <GeneralCard>
                            <SearchTable fiis={result}/>
                        </GeneralCard>
                    }
                    {errorMessage && 
                        <div className="alert alert-danger">
                            <p>{errorMessage}</p>
                        </div>
                    }
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
        const response = await axios.get('/segmento')
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