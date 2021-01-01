import Head from 'next/head'
import {Fragment} from 'react';
import { useRouter } from 'next/router'
import axios from '../../util/axios-base'
import NavbarAdmin from '../../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../../layout/HeaderAdmin/HeaderAdmin'
import GeneralCard from '../../components/Cards/GeneralCard'
import SearchTable from '../../components/Tables/SearchTable'
import FooterAdmin from '../../layout/FooterAdmin/FooterAdmin'

const index = ({data}) => {
    const router = useRouter()
    return (
        <Fragment>
            <NavbarAdmin/>
            <HeaderAdmin/>
            {data && !data.message && 
                <Fragment>
                    <Head>
                        <meta name="description" content={`Codigo11 - Lista de Fundos de Investimento Imobiliários ativos na bolsa.`} />
                        <title>{`Codigo11: Lista de Fundos Imobiliários`}</title>
                        {/* <script data-ad-client="ca-pub-8540652797620487" 
                            async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
                        </script> */}
                    </Head>
                    <div className="col-12 over">
                        <GeneralCard title="Lista de Fundos Imobiliários (FII)" titleStyle="text-center">
                            <SearchTable fiis={data}/>
                        </GeneralCard>
                    </div>
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
            <FooterAdmin/>
        </Fragment>
    );
};

export const getServerSideProps = async (context) => {
    try{
        /*https://codigo11-com-br.umbler.net/fii/search?search=&selectAvancada=false&selectDY=false&selectSegmento=false&selectQtdNegocios=false&selectPL=false&selectPVP=false&selectVPC=false&selectAtvFis=false&selectGestao=false&dyChange=%3E%3D&dy=0&segmento[]=2&negociosChange=%3E%3D&negocios=10&plChange=%3E%3D&gestao=0&pl=100000000&pvpChange=%3E%3D&pvp=1&vpcChange=%3E%3D&vpc=50&atvFisChange=%3E%3D&atvFis=2*/
        const response = await axios.get('/fii/search', {
            params: {
                search: '',
                selectAvancada: false,
                selectDY: false,
                selectSegmento: false,
                selectQtdNegocios: false,
                selectPL: false,
                selectPVP: false,
                selectVPC: false,
                selectAtvFis: false,
                selectGestao: false,
                dyChange: '>=',
                dy: 0,
                segmento: [2],
                negociosChange: '>=',
                negocios: 10,
                plChange: '>=',
                gestao: 0,
                pl: 100000000,
                pvpChange: '>=',
                pvp: 1,
                vpcChange: '>=',
                vpc: 50,
                atvFisChange: '>=',
                atvFis: 2
            }
        })
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