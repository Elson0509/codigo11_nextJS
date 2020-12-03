import {memo} from 'react';
import {Bar} from 'react-chartjs-2';
import {revertData} from '../../util/Utilities'

const ChartLineReceitas = (props) => {
    const data = () => {
        const info = {
            labels: [],
            datasets: [
              {
                label: 'Rec. Alugueis',
                type:'line',
                data: [],
                fill: false,
                borderColor: '#0275d8',
                backgroundColor: '#0275d8',
                pointBorderColor: '#0275d8',
                pointBackgroundColor: '#0275d8',
                pointHoverBackgroundColor: '#0275d8',
                pointHoverBorderColor: '#0275d8'
              },
              {
                label: 'Rec. Juros',
                type:'line',
                data: [],
                fill: false,
                borderColor: '#5cb85c',
                backgroundColor: '#5cb85c',
                pointBorderColor: '#5cb85c',
                pointBackgroundColor: '#5cb85c',
                pointHoverBackgroundColor: '#5cb85c',
                pointHoverBorderColor: '#5cb85c'
              },
              {
                label: 'Rec. Venda',
                type:'line',
                data: [],
                fill: false,
                borderColor: '#f0ad4e',
                backgroundColor: '#f0ad4e',
                pointBorderColor: '#f0ad4e',
                pointBackgroundColor: '#f0ad4e',
                pointHoverBackgroundColor: '#f0ad4e',
                pointHoverBorderColor: '#f0ad4e'
              }
            ]
        };

        props.contas.forEach(el => {
            info.labels.push(revertData(el.data))
            info.datasets[0].data.push(el.receita_alugueis)
            info.datasets[1].data.push(el.receita_juros)
            info.datasets[2].data.push(el.receita_venda_imoveis)
        })
        return info;
    }

    const options =  {
        responsive: true,
        title: {
            display: false,
            text: 'Receitas (por tipo)',
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
        props.contas ? <Bar data={data()} options={options} plugins={plugins}/> : null
    )
};

export default memo(ChartLineReceitas);

