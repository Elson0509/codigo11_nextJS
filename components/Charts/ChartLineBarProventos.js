import {memo, Fragment} from 'react';
import {Bar} from 'react-chartjs-2';
import {revertData} from '../../util/Utilities'

const ChartLineBarProventos = (props) => {
    const data = () => {
        const info = {
            labels: [],
            datasets: [{
                label: 'Provento acumulado',
                type:'line',
                data: [],
                fill: false,
                borderColor: '#EC932F',
                backgroundColor: '#EC932F',
                pointBorderColor: '#EC932F',
                pointBackgroundColor: '#EC932F',
                pointHoverBackgroundColor: '#EC932F',
                pointHoverBorderColor: '#EC932F',
                yAxisID: 'y-axis-2'
              },{
                type: 'bar',
                label: 'Provento recebido',
                data: [],
                fill: false,
                backgroundColor: '#71B37C',
                borderColor: '#71B37C',
                hoverBackgroundColor: '#71B37C',
                hoverBorderColor: '#71B37C',
                yAxisID: 'y-axis-1'
              }]
        };

        let acumulador = 0;
        props.eventos.forEach(el => {
            if(el.tipo==='Recebimento de provento'){
                acumulador+=el.aluguel
                info.labels.push(revertData(el.data))
                info.datasets[0].data.push(acumulador.toFixed(2))
                info.datasets[1].data.push(el.aluguel.toFixed(2))
            }
        })

        return info;
    }

    const options = {
        responsive: true,
        tooltips: {
            mode: 'label',
            callbacks: {
                label: function (tooltipItem, data) {
                        return 'R$ ' + Number(tooltipItem.yLabel).toLocaleString('pt-BR')
                    }
            }
        },
        elements: {
            line: {
                fill: false
            }
        },
        title: {
            display: true,
            text: 'Histórico de recebimento de proventos',
            fontSize: 16
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: false
                },
                    
                }
            ],
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    gridLines: {
                        display: false
                },
                    labels: {
                        show: true
                    }
                },
                {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        display: false
                },
                    labels: {
                        show: true
                    }
                }
            ]
        }
    }

    const plugins = [{
        afterDraw: (chartInstance, easing) => {
            const ctx = chartInstance.chart.ctx;
            ctx.fillText("codigo11.com.br", 10, 10);
        }
    }];

    return (
        props.eventos ? 
            <Fragment>
                <Bar data={data()} options={options} plugins={plugins}/>
                <h6 className="h6">*Recebimento de aluguéis e amortizações.</h6>
            </Fragment> 
            :
            null
    )
};

export default memo(ChartLineBarProventos);

