import Icon from "../Icon/Icon"
import classes from './Cards.module.css'

const SingleCard = (props) => {

    const styleIcon = `text-center rounded-circle text-white ${classes.Font_icon} bg-${props.bgIcon}`;
    const styletext1 = `font-size-xxl mt-1 d-block text-${props.colorText1}`;
    const styletext2 = `font-size-xxl mt-1 d-block text-${props.colorText2}`;

    const getVariacao = () =>{
        if(props.valor){
            if(props.tipo_variacao){
                return (
                    <div className="mt-2 text-success">
                        <Icon icon="angle-up"/>
                        <span className="pl-2 text-success">{props.valor}</span>
                    </div>
                )
            }
            else{
                return (
                    <div className="mt-2 text-danger">
                        <Icon icon="angle-down"/>
                        <span className="pl-2 text-danger">{props.valor}</span>
                    </div>
                )
            }
        }
        else{
            return null;
        }
    }

    return (
        <div className="card mb-3 slow-shadow">
            <div className="card-body">
                <div className={`d-flex ${classes.Align_items_start}`}>
                    <div className="mr-3">
                        <div className={styleIcon}>
                            <Icon icon={props.icon}/>
                        </div>
                    </div>
                    <div>
                        <div className="font-weight-bold">
                            <small className={`text-black-50 d-block mb-1 text-uppercase ${classes.Enfase_title}`}>
                                {props.title}
                            </small>
                            <span className={styletext1}>{props.text1}</span>
                            <span className={styletext2}>{props.text2}</span>
                        </div>
                        {getVariacao()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCard;