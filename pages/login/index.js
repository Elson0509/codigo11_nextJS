import {useEffect, useState, Fragment} from 'react';
import Head from 'next/head'
import Tabs from 'react-responsive-tabs';
import Link from 'next/link'
import { useRouter } from 'next/router'
import LoginForm from '../../components/Forms/LoginForm/LoginForm'
import SignupForm from '../../components/Forms/SignupForm/SignupForm'
import ModalForgetPassword from '../../components/Modals/ModalForgetPassword'
import classes from './Login.module.css'

const index = () => {
    const [modal, setModal] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.userToken
        if(!!token){
            router.push('/dashboard')
        }
    })

    const tabsContent = [
        {
            title: 'Login',
            content: <LoginForm toggle={() => setModal(prev=> !prev)}/>
        },
        {
            title: 'Criar Conta',
            content: <SignupForm/>
        },
    ];

    const getTabs = () => {
        return tabsContent.map((tab, index) => ({
            title: tab.title,
            getContent: () => tab.content,
            key: index,
        }));
    }

    return (
        <Fragment>
            <Head>
                <meta name="description" content={`Codigo11 - Login e Crição de conta na plataforma`} />
                <title>{`Codigo11: Login e criação de conta`}</title>
                {/* <script data-ad-client="ca-pub-8540652797620487" 
                    async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
                </script> */}
            </Head>
            <header className={classes.LoginBack}>
                <ModalForgetPassword modal={modal} toggle={() => setModal(prev=> !prev)}/>
                <div className={classes.LoginPanel}>
                    <Link href='/'>
                        <a>
                            <div className={`${classes.Logo_login} zero_auto`}/>
                        </a>
                    </Link>
                    <Tabs 
                        selectedTabKey={router.query.aba == 1 ? router.query.aba : 0}
                        transform={false} 
                        showInkBar={true} 
                        items={getTabs()}/>
                </div>
            </header>
        </Fragment>
    );
};



export default index;