import {memo} from 'react';
import {Bar} from 'react-chartjs-2';

const ChartProventos = (props) => {
    const data = () => {
        const info = {
            labels: [],
            datasets: [
                {
                    label: props.label,
                    backgroundColor: '#db4857',
                    borderColor: '#db4857',
                    borderWidth: 1,
                    hoverBackgroundColor: '#d65865',
                    hoverBorderColor: '#d65865',
                    borderCapStyle: 'round',
                    data: []
                }
            ]
        };


        let prov = [...props.proventos];
        prov.reverse().forEach( val => {
            info.labels.push(val.data_pagamento);
            info.datasets[0].data.push(val.valor_rendimento)
        })

        return info;
    }

    const options = {
        responsive: true,
        legend:{
            labels:{
                fontColor: 'red',
                fontSize: 10
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

    const plugins = [{
        afterDraw: (chartInstance, easing) => {
            const ctx = chartInstance.chart.ctx;
            ctx.fillStyle = "#1E90FF";
            ctx.fillText("codigo11.com.br", 4, 4);
        }
    }];

    return (
        props.proventos && props.proventos.length > 0 ? <Bar data={data()} options={options} plugins={plugins}/> : null
    )
};

export default memo(ChartProventos);