import {useState} from 'react';
import ListSearchItem from './ListSearchItem'
import Link from 'next/link'
import classes from './ListSearch.module.css'
import ModalLoading from '../../Modals/ModalLoading'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';

const ListSearch = (props) => {
    const router = useRouter()
    const [showModalLoading, setShowModalLoading] = useState(false)
    const [LoadingMessage, setLoadingMessage] = useState('')

    const configToast = {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    const clickHandler = (el) => {
        props.clicked && props.clicked();
        if(router.asPath.toLowerCase()!==`/${el.codigo}/profile`.toLowerCase()){
            setLoadingMessage(`Carregando Perfil de ${el.codigo}...`)
            setShowModalLoading(true)
            router.push(`/${el.codigo}/profile`)
        }
        else{
            toast.info(`Você já está na página.`, configToast);
        }
        
    }

    return (
        <div className={props.isLanding ? classes.Final_result_landing : classes.Final_result}>
            <ModalLoading commentary={LoadingMessage} modal={showModalLoading}/>
            <ul className={`list-group ${classes.Search_list}`}>
                {props.result && props.result.map((el, ind) => {
                    return (
                        <a onClick={()=>clickHandler(el)} className="link" key={`se${ind}`}>
                            <ListSearchItem item={el}/>
                        </a>
                    )
                })}
            </ul>
        </div>
    );
};

export default ListSearch;