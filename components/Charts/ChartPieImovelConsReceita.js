import {memo} from 'react';
import {Pie} from 'react-chartjs-2';
import {lineCharColors, lineCharHover, percentNumberBrazilian} from '../../util/Utilities'

const ChartPieImovelConsReceita = (props) => {

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

    // const totalRec = props.ativos.reduce((acc, curr) => {
    //     return acc + curr.porc_rec_fii
    // }, 0)

    const totalRec = () => {
        let total = 0
        props.ativos.map((ter) => {
            total+=ter.porc_rec_fii
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
             if(ter.porc_rec_fii>0){
                data.labels.push(`${ind+1}. ${ter.tipo} (${percentNumberBrazilian(ter.porc_rec_fii/totalRec()*100.0,2)})`);
                data.datasets[0].data.push(ter.porc_rec_fii)
                data.datasets[0].backgroundColor.push(lineCharColors[ind % lineCharColors.length])
                data.datasets[0].hoverBackgroundColor.push(lineCharHover[ind % lineCharHover.length])
             }
        })

        return data;
    }

    return (
        <Pie data={loadData()} legend={legend} options={options}/>
    );
};

export default memo(ChartPieImovelConsReceita);