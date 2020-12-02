import {memo, Fragment} from 'react';
import {Line} from 'react-chartjs-2';
import {revertData} from '../../util/Utilities'

const ChartLinePatrimonio = (props) => {

    const data = () => {
        const info = {
            labels: [],
            datasets: [
                {
                    fill: true,
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

        let pat_anterior = -1

        props.eventos.forEach(el => {
            if(el.patrimonio !== pat_anterior){
                info.labels.push(revertData(el.data));
                info.datasets[0].data.push(el.patrimonio.toFixed(2))
                pat_anterior = el.patrimonio
            }
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
                return Number(value).toLocaleString('pt-BR')
              }
            }
          }]
        },
        title: {
            display: true,
            text: 'Histórico patrimonial',
            fontSize: 16
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                        return 'R$ ' + Number(tooltipItem.yLabel).toLocaleString('pt-BR')
                    }
          }
        }
    }

    return (
        props.eventos ? 
            <Fragment>
                <Line data={data()} plugins={plugins} options={options}/>
                <h6 className="h6">*Valor total das cotas somado ao valor em caixa.</h6>
            </Fragment> 
            : 
            null
    )
};

export default memo(ChartLinePatrimonio);