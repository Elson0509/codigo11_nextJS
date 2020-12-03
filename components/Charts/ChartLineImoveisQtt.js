import {memo} from 'react';
import {Bar} from 'react-chartjs-2';
import {revertData} from '../../util/Utilities'

const ChartLineImoveisQtt = (props) => {
    const data = () => {
        const info = {
            labels: [],
            datasets: [
              {
                label: 'Terrenos',
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
                label: 'Renda',
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
                label: 'Renda em construção',
                type:'line',
                data: [],
                fill: false,
                borderColor: '#f0ad4e',
                backgroundColor: '#f0ad4e',
                pointBorderColor: '#f0ad4e',
                pointBackgroundColor: '#f0ad4e',
                pointHoverBackgroundColor: '#f0ad4e',
                pointHoverBorderColor: '#f0ad4e'
              },
              {
                label: 'Venda',
                type:'line',
                data: [],
                fill: false,
                borderColor: '#d9534f',
                backgroundColor: '#d9534f',
                pointBorderColor: '#d9534f',
                pointBackgroundColor: '#d9534f',
                pointHoverBackgroundColor: '#d9534f',
                pointHoverBorderColor: '#d9534f'
              },
              {
                label: 'Venda em construção',
                type:'line',
                data: [],
                fill: false,
                borderColor: '#292b2c',
                backgroundColor: '#292b2c',
                pointBorderColor: '#292b2c',
                pointBackgroundColor: '#292b2c',
                pointHoverBackgroundColor: '#292b2c',
                pointHoverBorderColor: '#292b2c'
              },
            ]
        };

        props.imoveis.forEach(el => {
            info.labels.push(revertData(el.data))
            info.datasets[0].data.push(el.imv_qtd[1])
            info.datasets[1].data.push(el.imv_qtd[2])
            info.datasets[2].data.push(el.imv_qtd[3])
            info.datasets[3].data.push(el.imv_qtd[4])
            info.datasets[4].data.push(el.imv_qtd[5])
        })


        return info;
    }

    const options = () => {
        const opt = {
            responsive: true,
            title: {
                display: false,
                text: 'Quantidade de imóveis (por tipo)',
                fontSize: 16
            },
            tooltips: {
                mode: 'label',
                callbacks: {
                    label: function (tooltipItem, data) {
                            return tooltipItem.yLabel > 1 ? 
                                `${tooltipItem.yLabel} imóveis` :
                                `${tooltipItem.yLabel} imóvel` 
                        }
                }
            },
            legend:{
                labels:{
                    fontColor: 'red',
                    fontSize: 10
                }
            },
            elements: {
                line: {
                    fill: false
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                    fontSize: 9,
                    fontFamily: 'verdana',
                    fontColor: 'blue',
                    }
                }]
            }
            
        }
        return opt;
    }

    const plugins = [{
        afterDraw: (chartInstance, easing) => {
            const ctx = chartInstance.chart.ctx;
            ctx.fillStyle = "#1E90FF";
            ctx.fillText("codigo11.com.br", 4, 4);
        }
    }];

    return (
        props.imoveis ? <Bar data={data()} options={options()} plugins={plugins}/> : null
    )
};

export default memo(ChartLineImoveisQtt);

