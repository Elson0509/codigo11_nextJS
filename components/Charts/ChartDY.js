import {memo} from 'react';
import {Bar} from 'react-chartjs-2';

const ChartProventos = (props) => {

    let dysum=0;
    let periods=0;
    let previousdy=0;
    
    const options = {
        responsive: true,
        tooltips: {
            mode: 'label'
        },
        elements: {
            line: {
                fill: false
            }
        },
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
    };

    const data = () => {
        const info = {
            labels: [],
            datasets: [
                {
                    label: props.label,
                    backgroundColor: props.backgroundColor || 'rgba(40,148,80,0.5)',
                    borderColor: props.borderColor || 'rgba(40,148,80,1)',
                    borderWidth: props.borderWidth || 1,
                    hoverBackgroundColor: props.hoverBackgroundColor || 'rgba(40,148,80,0.4)',
                    hoverBorderColor: props.hoverBorderColor || 'rgba(40,148,80,1)',
                    borderCapStyle: props.borderCapStyle || 'round',
                    data: []
                },
                {
                    label: "DY médio (móvel)",
                    backgroundColor:'rgba(40,148,250,0.9)',
                    borderColor:'rgba(40,148,250,0.9)',
                    data: [],
                    type: 'line'
                }
            ]
        };

        let prov = [...props.proventos];
        prov.reverse().forEach( val => {
            info.labels.push(val.data_pagamento);
            info.datasets[0].data.push(val.dy)
            if(val.dy !== 0){
                dysum+=val.dy
                periods++;
                previousdy=(parseInt((dysum/periods)*100))/100.0
            }
            info.datasets[1].data.push(previousdy)
        })

        return info;
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