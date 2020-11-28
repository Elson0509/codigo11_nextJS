import {memo} from 'react';
import {Pie} from 'react-chartjs-2';
import {lineCharColors, lineCharHover, percentNumberBrazilian} from '../../util/Utilities'

const ChartPieAtvFin = (props) => {

    const legend = {
        display: false
    }

    const total = () => {
        return props.ativos.reduce((acc, curr) => {
            return acc + curr.valor
        }, 0)
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

         props.ativos.forEach((ter, ind) => {
            data.labels.push(`${ind+1}. (${percentNumberBrazilian(ter.valor*100.0/total(), 1)})`);
            data.datasets[0].data.push(ter.valor)
            data.datasets[0].backgroundColor.push(lineCharColors[ind % lineCharColors.length])
            data.datasets[0].hoverBackgroundColor.push(lineCharHover[ind % lineCharHover.length])
        })

        return data;
    }

    const plugins = [{
        afterDraw: (chartInstance, easing) => {
            const ctx = chartInstance.chart.ctx;
            ctx.fillText("codigo11.com.br", 10, 10);
        }
    }];

    const options = {
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                        return data.labels[tooltipItem.index]
                    }
          }
        },
    }

    return (
        <Pie data={loadData()} legend={legend} options={options} plugins={plugins}/>
    );
};

export default memo(ChartPieAtvFin);