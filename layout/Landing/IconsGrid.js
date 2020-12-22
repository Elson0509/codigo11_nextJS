import classes from './Landing.module.css'
const IconsGrid = () => {
    return (
        <section className="features-icons bg-light-landing text-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div className="features-icons-icon d-flex">
                                <i className="lnr-license m-auto text-info"></i>
                            </div>
                            <h3>Perfil do FII</h3>
                            <p className="lead mb-0">Informações completas sobre cada fundo imobiliário.</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div className="features-icons-icon d-flex">
                                <i className="pe-7s-graph2 m-auto text-info"></i>
                            </div>
                            <h3>Relatórios</h3>
                            <p className="lead mb-0">Veja dados históricos de aluguéis, cotações, ativos físicos, financeiros e diversas outras informações qualitativas.</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                            <div className="features-icons-icon d-flex">
                                <i className="pe-7s-chat m-auto text-info"></i>
                            </div>
                            <h3>Discussão</h3>
                            <p className="lead mb-0">Interaja com outros investidores por meio de um fórum segmentado.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IconsGrid;