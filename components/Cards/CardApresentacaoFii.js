import {memo} from 'react';
import ListApresentacaoFii from '../Lists/ListApresentacaoFii/ListApresentacaoFii'

const CardApresentacaoFii = (props) => {
    return (
        <div className="col-12 col-lg-6 col-xl-9">
            <div className="card mb-3">
                <div className="card-body">
                    <ListApresentacaoFii apresentacao={props.apresentacao} bgcolor={props.bgcolor}/>
                </div>
            </div>
        </div>
    );
};

export default memo(CardApresentacaoFii);