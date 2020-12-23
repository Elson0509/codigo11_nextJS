import React from 'react';
import Link from 'next/link'
import classes from './Landing.module.css'
const Signup = () => {
    return (
        <section className={`${classes.Call_to_action} text-white text-center`} style={{backgroundImage: "url('/img/bg-masthead2.jpg')", backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
            <div className={classes.Overlay}></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-9 mx-auto">
                    <h2 className="mb-4">Está pronto para utilizar? Crie uma conta agora.</h2>
                    <h2 className="mb-4">É grátis.</h2>
                    </div>
                    <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                        <Link href={'/login?aba=1'}>
                            <a className="btn btn-block btn-lg btn-primary">
                                Criar conta
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;