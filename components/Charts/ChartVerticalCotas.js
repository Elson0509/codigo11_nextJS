import {Fragment} from 'react';
import {Bar} from 'react-chartjs-2';
import {revertData} from '../../util/Utilities'

const ChartVerticalCotas = (props) => {
    const data = () => {
        const info = {
            labels: [],
            datasets: [
                {
                    label: props.label,
                    backgroundColor: 'rgba(54, 199, 63)',
                    borderColor: 'rgba(26, 135, 32)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(39, 176, 47)',
                    hoverBorderColor: 'rgba(16, 99, 21)',
                    borderCapStyle: 'round',
                    data: []
                }
            ]
        };

        let quantidade_anterior = -1

        props.eventos.forEach(el => {
            if(el.qtd_total !== quantidade_anterior){
                info.labels.push(revertData(el.data));
                info.datasets[0].data.push(el.qtd_total)
                quantidade_anterior = el.qtd_total
            }
        })

        return info;
    }

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
            text: 'Histórico de quantidade de cotas',
            fontSize: 16
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                        return `Cotas: ${Number(tooltipItem.yLabel).toLocaleString('pt-BR')}`
                }
          }
        }
    }

    const plugins = [{
        afterDraw: (chartInstance, easing) => {
            const ctx = chartInstance.chart.ctx;
            ctx.fillText("codigo11.com.br", 10, 10);
        }
    }];

    return (
        props.eventos ? (
            <Fragment>
                <Bar data={data()} plugins={plugins} options={options}/> 
                <h6 className="h6">*Considera-se aportes, desdobramentos, grupamentos e participações em subscrições.</h6>
            </Fragment>
            )
            : 
            null
    )
};

export default ChartVerticalCotas;