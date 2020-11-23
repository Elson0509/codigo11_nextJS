import {memo} from 'react';
import {HorizontalBar} from 'react-chartjs-2';

const ChartHorizontalLabelsObject = (props) => {
    const data = () => {
        const info = {
            labels: [],
            datasets: [
                {
                    label: props.label,
                    backgroundColor: props.backgroundColor || 'rgba(255,99,132,0.2)',
                    borderColor: props.borderColor || 'rgba(255,99,132,1)',
                    borderWidth: props.borderWidth || 1,
                    hoverBackgroundColor: props.hoverBackgroundColor || 'rgba(255,99,132,0.4)',
                    hoverBorderColor: props.hoverBorderColor || 'rgba(255,99,132,1)',
                    borderCapStyle: props.borderCapStyle || 'round',
                    data: []
                }
            ]
        };

        Object.getOwnPropertyNames(props.object).map( val => {
            info.labels.push(val);
            info.datasets[0].data.push(props.object[val])
        })

        return info;
    }

    const plugins = [{
        afterDraw: (chartInstance, easing) => {
            const ctx = chartInstance.chart.ctx;
            ctx.fillStyle = "#1E90FF";
            ctx.fillText("codigo11.com.br", 4, 10);
        }
    }];

    return (
        props.object ? <HorizontalBar data={data()} plugins={plugins}/> : null
    )
};

export default memo(ChartHorizontalLabelsObject);