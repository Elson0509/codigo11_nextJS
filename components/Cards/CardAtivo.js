
const CardAtivo = (props) => {
    return (
        <div className="col-md-12 col-lg-6">
            <div className={`card card-box border-${props.bgCard} mb-3 slow-shadow`}>
                <div className="card-body">
                    <div className="d-flex">
                        <div className="mr-1">
                            <div className={`text-center rounded-circle font-number text-white bg-${props.bgNumber}`}>
                                {props.order}
                            </div>
                        </div>
                        <div>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardAtivo;