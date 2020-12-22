import {memo} from 'react';
import ListSearchItem from './ListSearchItem'
import Link from 'next/link'
import classes from './ListSearch.module.css'

const ListSearch = (props) => {
    // const getLink = (codigo) => {
    //     let splithPath = props.location.pathname.split('/')
    //     splithPath.shift()
    //     splithPath.shift()
    //     return props.match && props.match.params.fii ? `/${codigo}/${splithPath.join('/')}` : `/${codigo}/profile`
    // }
    
    return (
        <div className={props.isLanding ? classes.Final_result_landing : classes.Final_result}>
            <ul className={`list-group ${classes.Search_list}`}>
                {props.result && props.result.map((el, ind) => {
                    return (
                        //  <Link href={getLink(el.codigo)} key={`se${ind}`}>
                         <Link href={`/${el.codigo}/profile`} key={`se${ind}`}>
                            <a><ListSearchItem item={el}/></a>
                         </Link>
                    )
                })}
            </ul>
        </div>
    );
};

export default memo(ListSearch);