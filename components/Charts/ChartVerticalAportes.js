import {memo} from 'react';
import {Bar} from 'react-chartjs-2';
import {revertData} from '../../util/Utilities'

const ChartVerticalAportes = (props) => {

    const data = () => {
        const info = {
            labels: [],
            datasets: [
                {
                    label: props.label,
                    backgroundColor: 'rgba(66, 135, 245)',
                    borderColor: 'rgba(66, 75, 245)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(66, 96, 245)',
                    hoverBorderColor: 'rgba(81, 66, 245)',
                    borderCapStyle: 'round',
                    data: []
                }
            ]
        };

        props.aportes.forEach(el => {
            info.labels.push(revertData(el.data));
            info.datasets[0].data.push(el.valor)
        })

        return info;
    }

    const plugins = [{
        afterDraw: (chartInstance, easing) => {
            const ctx = chartInstance.chart.ctx;
            ctx.fillText("codigo11.com.br", 10, 10);
        }
    }];

    const options = {
        scales: {
          yAxes: [{
            ticks: {
              callback(value) {
                return Number(Number.parseInt(value)).toLocaleString('pt-BR')
              }
            }
          }]
        },
        title: {
            display: true,
            text: 'Histórico de aportes',
            fontSize: 16
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                        return `R$${Number(tooltipItem.yLabel).toLocaleString('pt-BR')}`
                }
          }
        }
    }

    return (
        props.aportes ? <Bar data={data()} plugins={plugins} options={options}/> : null
    )
};

export default memo(ChartVerticalAportes);