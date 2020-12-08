import classes from './AccordionAdmin.module.css';
import { Button, Card, Accordion } from 'react-bootstrap'; 
import { faMoneyCheck, faCity, faChartArea, faChartPie, faCommentDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AccordionAdmin = () => {
    const router = useRouter()
    const fii = router.query.fii.toUpperCase()

    const MenuItems = [
        {
            name: "Perfil",
            icon: faMoneyCheck,
            subItemns:[],
            link: `${fii}/profile`
        },
        {
            name: "Ativos",
            icon: faCity,
            subItemns:[
                {
                    name: "Físicos",
                    link: `${fii}/ativos/fisicos`
                },
                {
                    name: "Financeiros",
                    link: `${fii}/ativos/financeiros`
                },
                {
                    name: "Consolidado",
                    link: `${fii}/ativos/consolidado`
                },
                {
                    name: "Aquisições/Alienações",
                    link: `${fii}/ativos/aquisicoes`
                },
            ]
        },
        {
            name: "Dados e simulações",
            icon: faChartArea,
            subItemns:[
                {
                    name: "Fundamentos",
                    link: `${fii}/dados/fundamentos`
                },
                {
                    name: "Aluguéis",
                    link: `${fii}/dados/alugueis`
                },
                {
                    name: "Simulação de investimento",
                    link: `${fii}/dados/simulacao`
                },
                {
                    name: "Cotações",
                    link: `${fii}/dados/cotacoes`
                },
            ]
        },
        {
            name: "Relatórios",
            icon: faChartPie,
            subItemns:[
                {
                    name: "Mensal",
                    link: `${fii}/relatorios/mensal`
                },
                {
                    name: "Trimestral",
                    link: `${fii}/relatorios/trimestral`
                },
                {
                    name: "Gerencial",
                    link: `${fii}/relatorios/gerencial`
                }
            ]
        },
        {
            name: "Discussão",
            icon: faCommentDollar,
            subItemns:[],
            link: `${fii}/discussao`
        },
    ]

    return (
        <div className={`col-md-3 mb-4 col-xl-2 ${classes.Accordion}`}>
            <Accordion>
                {
                    MenuItems.map((item, ind) => {
                        return (
                        <Card key={ind}>
                            <Card.Header>
                                {
                                    item.link &&
                                    <Link href={`/${item.link}`}>
                                        <a className={`text-left btn-no-box-shadow no_text_decoration ${classes.Item_Text} ${classes.Margin_padding}`}>
                                            <FontAwesomeIcon size="lg" className="mr-2" icon={item.icon}/>
                                            {item.name}
                                        </a>
                                    </Link>
                                    ||
                                    <Accordion.Toggle as={Button} variant="link" eventKey={ind} className={`text-left btn-no-box-shadow no_text_decoration ${classes.Item_Text} ${classes.Margin_padding}`}>
                                        <FontAwesomeIcon size="lg" className="mr-2" icon={item.icon}/>
                                            {item.name}
                                    </Accordion.Toggle>
                                }
                            </Card.Header>
                            <div className={classes.Submenu}>
                                {item.subItemns.map((subItem, subind) => {
                                    return (
                                        <Accordion.Collapse eventKey={ind} key={`${ind}-${subind}`}>
                                            <div className={subind !== item.subItemns.length-1 && classes.Submenu_item_border_bottom || ""}>
                                                <Card.Body>
                                                    <Link href={subItem.link? `/${subItem.link}` : '#'}>
                                                        <a className={`no_text_decoration`}>{subItem.name}</a>
                                                    </Link>
                                                </Card.Body>
                                            </div>
                                        </Accordion.Collapse>
                                    )
                                })}
                            </div>
                        </Card>
                        )
                    })
                }
            </Accordion>
        </div>
    );
};

export default AccordionAdmin;