import Head from 'next/head'
import Link from 'next/link'
import {Fragment, useState, useEffect, useRef} from 'react';
import ButtonListFundos from '../components/Buttons/ButtonListFundos/ButtonListFundos'
import NavBar from '../layout/Landing/Navbar'
import classes from '../layout/Landing/Landing.module.css'
import SpinnerSearch from '../components/Loading/SpinnerSearch'
import ListSearch from '../components/Lists/ListSearch/ListSearch'
import axios from '../util/axios-base'
import {removerAcentos} from '../util/Utilities'
import IconsGrid from '../layout/Landing/IconsGrid'
import ImageShowcases from '../layout/Landing/ImageShowcases'
import Signup from '../layout/Landing/Signup'
import Footer from '../layout/Landing/Footer'
import AnimatedSection from '../layout/Landing/AnimatedSection'

export default function Home() {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [display, setDisplay] = useState(false)
  const [result, setResult] = useState()
  const wrapperRef = useRef(null)

  useEffect(() => {
    if(!search || search.length < 2)  
        setResult()  

    const timer = setTimeout(() => {
        if(search && search.length >= 2){
            setLoading(true)
            setDisplay(false)
            axios.get(`/fii/${removerAcentos(search).replace(' ','_').replace('11B', '').replace('11', '')}`)
                .then( res => {
                    setLoading(false)
                    setDisplay(true)
                    setResult(res.data.fiis)
                })
                .catch(err =>{
                    setResult([])
                    setLoading(false)
                })
        }
        else{
            setResult([])
        }
    }, 1500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    document.addEventListener('mousedown', handClickOutside)

    return () => {
        document.removeEventListener('mousedown', handClickOutside)
    }
  }, [])

  const handClickOutside = (event) => {
    const {current: wrap} = wrapperRef
    if(wrap && !wrap.contains(event.target)){
        setDisplay(false)
    }
  }

  return (
    <div>
      <Head>
        <title>Codigo11 - Análise e informações sobre investimento em FIIs</title>
        <meta name="description" content={`Codigo11 - Análise e informações sobre investimento em Fundos Imobiliarios (FII).`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar/>
      <header className={`${classes.Masthead} text-white text-center`} style={{backgroundImage: "url('/img/bg-masthead.jpg')", backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className={classes.overlay}></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto">
              <h1 className="mb-5 h1 font-weight-bold">Bem vindo a Codigo11</h1>
              <h2 className="mb-5 h2">A plataforma gratuita mais completa sobre investimento em Fundos Imobiliários.</h2>
              <h3 className="mb-4 h3">Acesse a lista completa de FIIs disponíveis:</h3>
              <ButtonListFundos/>
              <h3 className="mb-4 h3">Ou faça sua pesquisa abaixo:</h3>
            </div>
            <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
              <form>
                <div ref={wrapperRef} className="col-12 col-md-9 margin-auto zero_auto">
                  <input type="text" 
                    className="form-control form-control-lg" 
                    placeholder="Digite nome, código ou segmento (Ex: Shopping)"
                    onChange={(ev)=> setSearch(ev.target.value)}
                  />
                  {loading && <div className={classes.Loading_search_landing}><SpinnerSearch/></div>}
                  {display && result && result.length > 0 && <ListSearch isLanding result={result} isLanding/>}
                  {display && result && result.length === 0 && <div className={`${classes.Loading_search} text-white`}>Sem resultado...</div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>

      <AnimatedSection/>

      <IconsGrid/>
      
      <ImageShowcases/>

      {/* <Testemonials/> */}

      <Signup/>

      <Footer/>

    </div>
  )
}
