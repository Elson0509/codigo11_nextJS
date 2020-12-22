import React, {memo} from 'react';
import bgShowCase1  from '../../../assets/img/bg-showcase-1.jpg'
import bgShowCase2  from '../../../assets/img/bg-showcase-2.jpg'
import bgShowCase3  from '../../../assets/img/bg-showcase-3.jpg'
import classes from './Landing.module.css'
const ImageShowcases = () => {
    return (
        <section className="showcase">
            <div className="container-fluid p-0">
                <div className="row no-gutters">
                    <div className="col-lg-6 order-lg-2 text-white showcase-img" style={{backgroundImage: `url(${bgShowCase1})`}}/>
                    <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>Simulações de investimento</h2>
                        <p className="lead mb-0">Realize uma simulação de investimento contínuo no seu fundo de investimento favorito. Selecione o FII, o valor dos aportes e sua periodicidade, e você verá o resultado de seu retorno.</p>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col-lg-6 text-white showcase-img" style={{backgroundImage: `url(${bgShowCase2})`}}/>
                    <div className="col-lg-6 my-auto showcase-text">
                        <h2>Informações claras</h2>
                        <p className="lead mb-0">Os dados são apresentados principalmente por meio visual. Aqui você encontrará gráficos de fácil interpretação que mostrarão como está a situação do fundo imobiliário que você analisa.</p>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col-lg-6 order-lg-2 text-white showcase-img" style={{backgroundImage: `url(${bgShowCase3})`}}/>
                    <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>Navegação moderna &amp; interativa</h2>
                        <p className="lead mb-0">Cada FII com seu próprio menu e informações separadas em tópicos com navegação intuitiva.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(ImageShowcases);