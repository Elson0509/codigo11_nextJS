import { memo, useState } from 'react';
import classes from './HeaderAdmin.module.css'
import { useRouter } from 'next/router'
import ModalLoading from '../../components/Modals/ModalLoading'
import { ToastContainer, toast } from 'react-toastify';

const HeaderAdmin = () => {
    const [showModalLoading, setShowModalLoading] = useState(false)
    const [LoadingMessage, setLoadingMessage] = useState('')
    const router = useRouter()
    const menuItems = [
        {
            name: 'Dashboard',
            description: 'Dashboard',
            link: '/dashboard'
        },
        {
            name: 'Pesquisar',
            description: 'Pesquisar',
            link: '/pesquisar'
        },
        {
            name: 'Lista de FIIs',
            description: 'Lista de FIIs',
            link: '/lista'
        },
        {
            name: 'Eventos',
            description: 'Últimos Eventos',
            link: '/eventos'
        },
    ]

    const configToast = {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    const showLoadingModal = el => {
        if(router.pathname.toLowerCase()!==el.link.toLowerCase()){
            setLoadingMessage(`Carregando ${el.description}...`)
            setShowModalLoading(true)
            router.push(el.link)
        }
        else{
            toast.info(`Você já está na página.`, configToast);
        }
    }

    const itens = menuItems.map((el, ind)=>(
        <li className="nav-item active" key={ind}>
            <a className={["nav-link m-2 text-center", classes.Header_item].join(" ")} onClick={()=> showLoadingModal(el)}>{el.name}</a>
        </li>
    ))

    return (
        <header className="bg-premium-dark p-2">
            <ModalLoading commentary={LoadingMessage} modal={showModalLoading}/>
            <div className="container">
                <div className="row">
                    <div className="col-12 hide-md">
                        <ul className="nav zero_auto">
                            {
                                itens
                            }
                        </ul>
                    </div>
                    <div className="nav flex-column col-12 show-md">
                        <ul style={{listStyleType:'none'}}>
                        {
                            itens
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default memo(HeaderAdmin);