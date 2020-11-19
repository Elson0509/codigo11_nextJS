import {numberWithDots} from '../../util/Utilities'
import {faHandshake} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './Cards.module.css'
import {
    ResponsiveContainer,
    Bar,
    BarChart,
} from 'recharts';

const CardNegocios = (props) => {
    const data = [
        {name: 'Page A', uv: 600, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 1800, pv: 1398, amt: 2210},
        {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
        {name: 'Page D', uv: 2380, pv: 3908, amt: 2000},
        {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
        {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
        {name: 'Page G', uv: 1290, pv: 4300, amt: 2100},
        {name: 'Page C', uv: 900, pv: 6800, amt: 2290},
        {name: 'Page D', uv: 1600, pv: 7908, amt: 2000},
        {name: 'Page E', uv: 2290, pv: 9800, amt: 2181},
        {name: 'Page F', uv: 2500, pv: 3800, amt: 1500},
        {name: 'Page G', uv: 1200, pv: 4300, amt: 2100},
    ];

    return (
        Object.keys(props.cotacao).length > 0 && 
                <div className={`card mb-3 slow-shadow ${classes.Widget_chart}`}>
                    <div className={classes.Widget_chart_content}>
                        <div className={`${classes.Icon_wrapper} rounded-circle`}>
                            <div className={`${classes.Icon_wrapper_bg} bg-primary`}/>
                            <FontAwesomeIcon size="lg" className="ml-3" icon={faHandshake}/>
                        </div>
                        <div className={classes.Widget_numbers}>
                            {numberWithDots(props.cotacao.numero_negocios)}
                        </div>
                        <div className={`${classes.Widget_subheading} p-2`}>
                            Negócios Realizados
                        </div>
                        <div className={classes.Divider}/>
                    </div>
                    <div>
                        <ResponsiveContainer height={100}>
                            <BarChart data={data}>
                                <Bar dataKey='uv' fill='#6c966d' stroke='#003d3f' strokeWidth={2}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
    );
};

export default CardNegocios;