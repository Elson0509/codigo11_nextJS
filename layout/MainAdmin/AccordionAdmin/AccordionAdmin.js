import classes from './AccordionAdmin.module.css';
import { Button, Card, Accordion } from 'react-bootstrap'; 
import {memo, useState} from 'react';
import { faMoneyCheck, faCity, faChartArea, faChartPie, faCommentDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import ModalLoading from '../../../components/Modals/ModalLoading'
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link'

const AccordionAdmin = () => {
    const router = useRouter()
    const fii = router.query.fii.toUpperCase()
    const [showModalLoading, setShowModalLoading] = useState(false)
    const [LoadingMessage, setLoadingMessage] = useState('')

    const MenuItems = [
        {
            name: "Perfil",
            icon: faMoneyCheck,
            subItems:[],
            link: `/${fii}/profile`,
            description: "Perfil"
        },
        {
            name: "Ativos",
            icon: faCity,
            subItems:[
                {
                    name: "Físicos",
                    link: `/${fii}/ativos/fisicos`,
                    description: "Ativos Físicos"
                },
                {
                    name: "Financeiros",
                    link: `/${fii}/ativos/financeiros`,
                    description: "Ativos Financeiros"
                },
                {
                    name: "Consolidado",
                    link: `/${fii}/ativos/consolidado`,
                    description: "Ativos Consolidados"
                },
                {
                    name: "Aquisições/Alienações",
                    link: `/${fii}/ativos/aquisicoes`,
                    description: "Aquisições/Alienações"
                },
            ]
        },
        {
            name: "Dados e simulações",
            icon: faChartArea,
            subItems:[
                {
                    name: "Fundamentos",
                    link: `/${fii}/dados/fundamentos`,
                    description: "Fundamentos"
                },
                {
                    name: "Aluguéis",
                    link: `/${fii}/dados/alugueis`,
                    description: "Dados de Aluguéis"
                },
                {
                    name: "Simulação de investimento",
                    link: `/${fii}/dados/simulacao`,
                    description: "Simulação de investimento"
                },
                {
                    name: "Cotações",
                    link: `/${fii}/dados/cotacoes`,
                    description: "Cotações"
                },
            ]
        },
        {
            name: "Relatórios",
            icon: faChartPie,
            subItems:[
                {
                    name: "Mensal",
                    link: `/${fii}/relatorios/mensal`,
                    description: "Relatório Mensal"
                },
                {
                    name: "Trimestral",
                    link: `/${fii}/relatorios/trimestral`,
                    description: "Relatório Trimestral"
                },
                {
                    name: "Gerencial",
                    link: `/${fii}/relatorios/gerencial`,
                    description: "Relatórios Gerenciais"
                }
            ]
        },
        {
            name: "Discussão",
            icon: faCommentDollar,
            subItems:[],
            link: `/${fii}/discussao`,
            description: "Fórum"
        },
    ]

    const configToast = {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    const showLoadingModal = item => {
        if(router.asPath.toLowerCase()!==item.link.toLowerCase()){
            setLoadingMessage(`Carregando ${item.description} de ${fii}...`)
            setShowModalLoading(true)
            router.push(item.link)
        }
        else{
            toast.info(`Você já está na página.`, configToast);
        }
    }

    return (
        <div className={`col-md-3 mb-4 col-xl-2 ${classes.Accordion}`}>
            <Accordion>
                <ModalLoading commentary={LoadingMessage} modal={showModalLoading}/>
                {
                    MenuItems.map((item, ind) => {
                        return (
                        <Card key={ind}>
                            <Card.Header>
                                {
                                    item.link &&
                                        <Link href={item.link}>
                                            <a onClick={()=> showLoadingModal(item)} className={`text-left btn-no-box-shadow no_text_decoration link ${classes.Item_Text} ${classes.Margin_padding}`}>
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
                                {item.subItems.map((subItem, subind) => {
                                    return (
                                        <Accordion.Collapse eventKey={ind} key={`${ind}-${subind}`}>
                                            <div className={subind !== item.subItems.length-1 && classes.Submenu_item_border_bottom || ""}>
                                                <Card.Body>
                                                    <Link href={subItem.link}>
                                                        <a onClick={()=> showLoadingModal(subItem)} className={`no_text_decoration link`}>{subItem.name}</a>
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

export default memo(AccordionAdmin);