import {memo} from 'react'
import ListFin from '../Lists/ListFin/ListFin'

const CardAtvFin = (props) => {
    return (
        <div className="col-sm-12 col-lg-6">
            <div className="card mb-3">
                <div className="card-body">
                    <ListFin atv_fin={props.atv_fin} bgcolor={props.bgcolor}/>
                </div>
            </div>
        </div>
    );
};

export default memo(CardAtvFin);