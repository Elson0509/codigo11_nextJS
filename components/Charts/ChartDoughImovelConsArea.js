import {memo} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {lineCharColors, lineCharHover, percentNumberBrazilian} from '../../util/Utilities'

const ChartDoughImovelConsArea = (props) => {

    const legend = {
        display: false
    }

    const options = {
        responsive: true,
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }

    // const totalArea = props.ativos.reduce((acc, curr) => {
    //     return acc + curr.area
    // }, 0)

    const totalArea = () => {
        let total = 0
        props.ativos.map((ter) => {
            total+=ter.area
        })
        return total;
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


         props.ativos.map((ter, ind) => {
            data.labels.push(`${ind+1}. ${ter.tipo} (${percentNumberBrazilian(ter.area/totalArea()*100.0,2)})`);
            data.datasets[0].data.push(ter.area)
            data.datasets[0].backgroundColor.push(lineCharColors[ind % lineCharColors.length])
            data.datasets[0].hoverBackgroundColor.push(lineCharHover[ind % lineCharHover.length])
        })

        return data;
    }

    return (
        <Doughnut data={loadData()} legend={legend} options={options}/>
    );
};

export default memo(ChartDoughImovelConsArea);