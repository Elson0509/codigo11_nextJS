const GeneralCard = (props) => {
    return (
        <div className={`mb-3 card card-body ${props.bgColor}`}>
            {
                props.title && 
                <h4 className={`${props.titleStyle}`}>
                    {props.title}
                </h4>
            }
            {props.comentary && 
                <p>
                    {props.comentary}
                </p>
            }
                {props.children}
        </div>
    );
};

export default GeneralCard;