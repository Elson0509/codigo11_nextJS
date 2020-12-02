import {memo, Fragment} from 'react';
import {Bar} from 'react-chartjs-2';
import {revertData} from '../../util/Utilities'

const ChartLinePrecoPrecoMedio = (props) => {
    const data = () => {
        const info = {
            labels: [],
            datasets: [{
                label: 'Preço da cota no mercado',
                type:'line',
                data: [],
                fill: false,
                borderColor: '#0902c9',
                backgroundColor: '#0902c9',
                pointBorderColor: '#0902c9',
                pointBackgroundColor: '#0902c9',
                pointHoverBackgroundColor: '#0902c9',
                pointHoverBorderColor: '#0902c9'
              },{
                type: 'line',
                label: 'Preço médio',
                data: [],
                fill: false,
                backgroundColor: '#e80c0c',
                borderColor: '#e80c0c',
                hoverBackgroundColor: '#e80c0c',
                hoverBorderColor: '#e80c0c'
              }]
        };

        props.eventos.forEach(el => {
            info.labels.push(revertData(el.data))
            info.datasets[0].data.push(el.preco_cota.toFixed(2))
            info.datasets[1].data.push(el.preco_medio.toFixed(2))
        })

        return info;
    }

    const options = () => {
        const opt = {
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
            scales: {
                xAxes: [
                    {
                        display: true,
                        gridLines: {
                            display: false
                        }
                    }
                ]
            }
        }
        return opt;
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
                <Bar data={data()} options={options()} plugins={plugins}/>
                <h6 className="h6">*Preço médio embute custos e é ajustado por amortizações. Aluguéis não alteram preço médio.</h6>
            </Fragment>
         ) 
         : null
    )
};

export default memo(ChartLinePrecoPrecoMedio);

