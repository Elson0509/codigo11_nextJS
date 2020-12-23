import {memo} from 'react';
import classes from './Landing.module.css'
const ImageShowcases = () => {
    return (
        <section className={classes.Showcase}>
            <div className="container-fluid p-0">
                <div className={`row ${classes.No_gutters}`}>
                    <div className={`col-lg-6 order-lg-2 text-white ${classes.Showcase_img}`} style={{backgroundImage: `url('/img/bg-showcase-1.jpg')`}}/>
                    <div className={`col-lg-6 order-lg-1 my-auto ${classes.Showcase_text}`}>
                        <h2>Simulações de investimento</h2>
                        <p className={`${classes.Lead} mb-0`}>Realize uma simulação de investimento contínuo no seu fundo de investimento favorito. Selecione o FII, o valor dos aportes e sua periodicidade, e você verá o resultado de seu retorno!</p>
                    </div>
                </div>
                <div className={`row ${classes.No_gutters}`}>
                    <div className={`col-lg-6 text-white ${classes.Showcase_img}`} style={{backgroundImage: `url('/img/bg-showcase-2.jpg')`}}/>
                    <div className={`col-lg-6 my-auto ${classes.Showcase_text}`}>
                        <h2>Informações claras</h2>
                        <p className={`${classes.Lead} mb-0`}>Os dados são apresentados por meio textual e visual. Aqui você encontrará informações de fácil interpretação que mostrarão como está a situação do fundo imobiliário que você analisa.</p>
                    </div>
                </div>
                <div className={`row ${classes.No_gutters}`}>
                    <div className={`col-lg-6 order-lg-2 text-white ${classes.Showcase_img}`} style={{backgroundImage: `url('/img/bg-showcase-3.jpg')`}}/>
                    <div className={`col-lg-6 order-lg-1 my-auto ${classes.Showcase_text}`}>
                        <h2>Navegação moderna &amp; interativa</h2>
                        <p className={`${classes.Lead} mb-0`}>Cada FII com seu próprio menu e informações separadas em tópicos com navegação intuitiva.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(ImageShowcases);