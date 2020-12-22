import React from 'react';
import Testemonial1 from '../../../assets/img/testimonials-1.jpg'
import Testemonial2 from '../../../assets/img/testimonials-2.jpg'
import Testemonial3 from '../../../assets/img/testimonials-3.jpg'
import classes from './Landing.module.css'
const Testemonials = () => {
    return (
        <section className="testimonials text-center bg-light">
                <div className="container">
                    <h2 className="mb-5">What people are saying...</h2>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                                <img className="img-fluid rounded-circle mb-3" src={Testemonial1} alt=""/>
                                <h5>Margaret E.</h5>
                                <p className="font-weight-light mb-0">"This is fantastic! Thanks so much guys!"</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                                <img className="img-fluid rounded-circle mb-3" src={Testemonial2} alt=""/>
                                <h5>Fred S.</h5>
                                <p className="font-weight-light mb-0">"Bootstrap is amazing. I've been using it to create lots of super nice landing pages."</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                                <img className="img-fluid rounded-circle mb-3" src={Testemonial3} alt=""/>
                                <h5>Sarah W.</h5>
                                <p className="font-weight-light mb-0">"Thanks so much for making these free resources available to us!"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
};

export default Testemonials;