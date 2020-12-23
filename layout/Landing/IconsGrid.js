import classes from './Landing.module.css'
import Icon from '../../components/Icon/Icon'
import {memo} from 'react'

const IconsGrid = () => {
    return (
        <section className={`${classes.Features_icons} ${classes.Bg_light_landing} text-center`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className={`${classes.Features_icons_item} mx-auto mb-5 mb-lg-0 mb-lg-3`}>
                            <div className={`${classes.Features_icons_icon} d-flex`}>
                                <i className={`m-auto ${classes.Color_theme}`}>
                                    <Icon icon='search-dollar'/>
                                </i>
                            </div>
                            <h3>Perfil do FII</h3>
                            <p className={`${classes.Lead} mb-0`}>Informações completas sobre cada fundo imobiliário.</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className={`${classes.Features_icons_item} mx-auto mb-5 mb-lg-0 mb-lg-3`}>
                            <div className={`${classes.Features_icons_icon} d-flex`}>
                                <i className={`m-auto ${classes.Color_theme}`}>
                                    <Icon icon='chart-line'/>
                                </i>
                            </div>
                            <h3>Relatórios</h3>
                            <p className={`${classes.Lead} mb-0`}>Veja dados históricos de aluguéis, cotações, ativos físicos, financeiros e diversas outras informações qualitativas.</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className={`${classes.Features_icons_item} mx-auto mb-0 mb-lg-3`}>
                            <div className={`${classes.Features_icons_icon} d-flex`}>
                                <i className={`m-auto ${classes.Color_theme}`}>
                                    <Icon icon='comments-dollar'/>
                                </i>
                            </div>
                            <h3>Discussão</h3>
                            <p className={`${classes.Lead} mb-0`}>Interaja com outros investidores por meio de um fórum segmentado.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(IconsGrid);