import classes from './AccordionAdmin.module.css';
import React, { useState } from 'react';
import { Button, Card, Accordion } from 'react-bootstrap'; 
import { faMoneyCheck, faCity, faChartLine, faChartPie, faCommentDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AccordionAdmin = (props) => {

    const MenuItems = [
        {
            name: "Perfil",
            icon: faMoneyCheck,
            subItemns:[]
        },
        {
            name: "Ativos",
            icon: faCity,
            subItemns:[
                {
                    name: "Físicos",
                    link: ""
                },
                {
                    name: "Financeiros",
                    link: ""
                },
                {
                    name: "Consolidado",
                    link: ""
                },
                {
                    name: "Aquisições/Alienações",
                    link: ""
                },
            ]
        },
        {
            name: "Dados e simulações",
            icon: faChartLine,
            subItemns:[
                {
                    name: "Fundamentus",
                    link: ""
                },
                {
                    name: "Aluguéis",
                    link: ""
                },
                {
                    name: "Simulação de investimento",
                    link: ""
                },
                {
                    name: "Cotações",
                    link: ""
                },
            ]
        },
        {
            name: "Relatórios",
            icon: faChartPie,
            subItemns:[
                {
                    name: "Mensal",
                    link: ""
                },
                {
                    name: "Trimestral",
                    link: ""
                },
                {
                    name: "Gerencial",
                    link: ""
                }
            ]
        },
        {
            name: "Discussão",
            icon: faCommentDollar,
            subItemns:[]
        },
    ]

    return (
        <div className={["col-md-3 mb-4", classes.Accordion].join(" ")}>
            <Accordion>
                {
                    MenuItems.map((item, ind) => {
                        return (
                        <Card key={ind}>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey={ind} className={["text-left btn-no-box-shadow no_text_decoration", classes.Item_Text].join(" ")}>
                                    <FontAwesomeIcon size="lg" className="mr-2" icon={item.icon}/>
                                        {item.name}
                                </Accordion.Toggle>
                            </Card.Header>
                            <div className={classes.Submenu}>
                                {item.subItemns.map((subItem, subind) => {
                                    return (
                                        <Accordion.Collapse eventKey={ind} key={`${ind}-${subind}`}>
                                            <div className={subind !== item.subItemns.length-1 && classes.Submenu_item_border_bottom || ""}>
                                                <Card.Body>
                                                    <Button variant="link" className="text-left btn-no-box-shadow no_text_decoration">
                                                        {subItem.name}
                                                    </Button>
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