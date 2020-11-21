import {memo} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {lineCharColors, lineCharHover} from '../../util/Utilities'

const ChartImovelPercReceita = (props) => {

    const legend = {
        display: false
    }

    const options = {
        responsive: true,
        animation: {
            animateScale: true,
            animateRotate: true
        },
        tooltips: {
            mode: 'label',
            callbacks: {
                label: function (tooltipItem, data) {
                        return `${(data.labels[tooltipItem.index])} - ${Number(data.datasets[0].data[tooltipItem.index]).toLocaleString('pt-BR')} %` 
                    }
            }
        },
    }

    const loadData = () => {
        let data = {
            labels:[],
            datasets: [{
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: []
            }]
        }

         props.imoveis.map((ter, ind) => {
            data.labels.push(`${props.type} ${ind+1}`);
            data.datasets[0].data.push(ter.porc_rec_fii)
            data.datasets[0].backgroundColor.push(lineCharColors[ind % lineCharColors.length])
            data.datasets[0].hoverBackgroundColor.push(lineCharHover[ind % lineCharHover.length])
        })
        return data;
    }

    const plugins = [{
        afterDraw: (chartInstance, easing) => {
            const ctx = chartInstance.chart.ctx;
            ctx.fillStyle = "#1E90FF";
            ctx.fillText("codigo11.com.br", 4, 10);
        }
    }];

    return (
        <Doughnut data={loadData()} legend={legend} options={options} plugins={plugins}/>
    );
};

export default memo(ChartImovelPercReceita);