import {Fragment, useState, useEffect, useRef} from 'react';
import { faSearch, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SpinnerSearch from '../../../components/Loading/SpinnerSearch'
import {removerAcentos} from '../../../util/Utilities'
import axios from '../../../util/axios-base'
import ListSearch from '../../../components/Lists/ListSearch/ListSearch'
import classes from './SearchBox.module.css'

const SearchBox = (props) => {
    const [search, setSearch] = useState('')
    const [result, setResult] = useState()
    const [loading, setLoading] = useState(false)
    const [display, setDisplay] = useState(false)
    const wrapperRef = useRef(null)

    useEffect(() => {
        if(!search || search.length < 2)  
            setResult()  

        const timer = setTimeout(() => {
            if(search && search.length >= 2){
                setLoading(true)
                setDisplay(false)
                axios.get(`/fii/${removerAcentos(search).replace(' ','_').replace('11B', '').replace('11', '')}`)
                    .then( res => {
                        setLoading(false)
                        setDisplay(true)
                        setResult(res.data.fiis)
                    })
                    .catch( err =>{
                        setResult([])
                        setLoading(false)
                    })
            }
            else{
                setResult([])
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        document.addEventListener('mousedown', handClickOutside)
        return () => {
            document.removeEventListener('mousedown', handClickOutside)
        }
    }, [])

    const handClickOutside = (event) => {
        const {current: wrap} = wrapperRef
        if(wrap && !wrap.contains(event.target)){
            setDisplay(false)
        }
    }

    return (
        <Fragment>
            <div ref={wrapperRef} className={props.collapsed ? "search-collapsed-menu bg-premium-dark" : "mt-2 navbar-collapse"}>
                <input className={props.collapsed ? "search-input-collapsed-menu" : "search-input"}
                    type="text" 
                    placeholder="Código, nome ou segmento..." 
                    aria-label="Search"
                    onChange={(ev) => setSearch(ev.target.value)}/>
                <FontAwesomeIcon className={`text-white ${props.collapsed ? 'search-icon-collapsed-menu' : 'search-icon'}`} size="2x" icon={faSearch}/>
                {loading && <div className={classes.Loading_search}><SpinnerSearch/></div>}
                {display && result && result.length === 0 && <div className={`${classes.Loading_search} text-white`}>Sem resultado...</div>}
                {display && result && result.length > 0 && <ListSearch clicked={()=>setDisplay(false)} result={result}/>}
            </div>
        </Fragment>
    );
};

export default SearchBox;