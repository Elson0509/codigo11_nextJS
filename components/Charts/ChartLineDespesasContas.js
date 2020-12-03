import React, {memo} from 'react';
import {Bar} from 'react-chartjs-2';
import {revertData} from '../../util/Utilities'

const ChartLineDespesasContas = (props) => {
    const data = () => {
        const info = {
            labels: [],
            datasets: [
              {
                label: 'Taxa Adm.',
                type:'line',
                data: [],
                fill: false,
                borderColor: '#d41717',
                backgroundColor: '#d41717',
                pointBorderColor: '#d41717',
                pointBackgroundColor: '#d41717',
                pointHoverBackgroundColor: '#d41717',
                pointHoverBorderColor: '#d41717'
              },
              {
                label: 'Taxa de desempenho',
                type:'line',
                data: [],
                fill: false,
                borderColor: '#00ffd5',
                backgroundColor: '#00ffd5',
                pointBorderColor: '#00ffd5',
                pointBackgroundColor: '#00ffd5',
                pointHoverBackgroundColor: '#00ffd5',
                pointHoverBorderColor: '#00ffd5'                
              },
              {
                label: 'Serviços facultativos',
                type:'line',
                data: [],
                fill: false,
                borderColor: '#be64c4',
                backgroundColor: '#be64c4',
                pointBorderColor: '#be64c4',
                pointBackgroundColor: '#be64c4',
                pointHoverBackgroundColor: '#be64c4',
                pointHoverBorderColor: '#be64c4'
              }
            ]
        };

        props.contas.forEach(el => {
            info.labels.push(revertData(el.data))
            info.datasets[0].data.push(el.taxa_adm)
            info.datasets[1].data.push(el.taxa_des)
            info.datasets[2].data.push(el.servicos_facultativos)
        })
        return info;
    }

    const options =  {
        responsive: true,
        title: {
            display: false,
            text: 'Taxas e despesas',
            fontSize: 16
        },
        scales: {
            yAxes: [{
                ticks: {
                    callback(value) {
                        return Number(value).toLocaleString('pt-BR')
                    }
                }
            }],
            xAxes: [{
                ticks: {
                fontSize: 9,
                fontFamily: 'verdana',
                fontColor: 'blue',
                }
            }]
        },
        legend:{
            labels:{
                fontColor: 'red',
                fontSize: 10
            }
        },
        tooltips: {
            mode: 'label',
            callbacks: {
                label: function (tooltipItem, data) {
                        return 'R$' + Number(tooltipItem.yLabel).toLocaleString('pt-BR')
                    }
            }
        },
        elements: {
            line: {
                fill: false
            }
        }
    }

    const plugins = [{
        afterDraw: (chartInstance, easing) => {
            const ctx = chartInstance.chart.ctx;
            ctx.fillStyle = "#1E90FF";
            ctx.fillText("codigo11.com.br", 4, 4);
        }
    }];

    return (
        props.contas ? 
        <div>
            <Bar data={data()} options={options} plugins={plugins}/>
            <small className='text-black'>* Serviços facultativos: Despesas opcionais com consultoria especializada, empresa especializada em locação e formador de mercado.</small>
        </div>
        : null
    )
};

export default memo(ChartLineDespesasContas);

