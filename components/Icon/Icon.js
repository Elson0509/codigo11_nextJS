import {Fragment, memo} from 'react';
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {
    faStore, /*store*/
    /*lnr-store*/
    faShoppingBag, /*shopping-bag*/
    faBuilding, /*building*/
    faBriefcase, /*briefcase*/
    faWarehouse, /*warehouse*/
    faMoneyCheckAlt, /*money-check-alt*/
    faCity, /*city*/
    faHotel, /*hotel*/
    faHospital, /*hospital*/
    faAngleUp, /*angle-up*/
    faArrowRight,
    faArrowUp,
    faArrowLeft,
    faAngleDown,
    faHandshake, /*handshake*/
    faMoneyBillWave,/*money-bill-wave*/
    faUsers, /*users*/
    faTh, /*th*/
    faCoins,/*coins*/
    faPercentage, /*percentage*/
    faChartPie, /*chart-pie*/
    faGem, /*gem*/
    faChartLine, /*chart-line*/
    faPiggyBank, /*piggy-bank*/ 
    faFileInvoiceDollar, /*file-invoice-dollar*/
    faCartPlus, /*cart-plus*/
    faCartArrowDown, /*cart-arrow-down*/
    faMapMarkedAlt, /*map-marked-alt*/
    faThLarge, /*th-large*/
    faFileContract, /*file-contract*/
    faHouseDamage, /*house-damage*/
    faWallet, /*wallet*/
    faQuestionCircle,/*question-circle*/
    faClock, /*clock*/
    faPlusSquare,/*plus-square*/
    faMinusSquare,/*minus-square*/
    faClipboardList,/*clipboard-list*/
    faBook, /*book*/
    faCalendarAlt, /*calendar-alt*/
    faComments, /*comments*/
    faMeh, /*meh*/  
    faSort, /*sort*/
    faSortUp, /*sort-up*/ 
    faSortDown, /*sort-down*/    
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

library.add(
    faStore,
    faShoppingBag,
    faBuilding,
    faBriefcase,
    faWarehouse,
    faMoneyCheckAlt,
    faCity,
    faHotel,
    faHospital,
    faAngleUp,
    faArrowRight,
    faArrowUp,
    faArrowLeft,
    faAngleDown,
    faHandshake, 
    faMoneyBillWave,
    faUsers,
    faTh,
    faCoins,
    faPercentage,
    faChartPie,
    faGem,
    faChartLine,
    faPiggyBank,
    faFileInvoiceDollar,
    faCartPlus,
    faCartArrowDown, 
    faMapMarkedAlt,
    faThLarge,
    faFileContract,
    faHouseDamage,
    faWallet,
    faQuestionCircle,
    faClock,
    faPlusSquare,
    faMinusSquare,
    faClipboardList,
    faBook,
    faCalendarAlt,
    faComments,
    faMeh,
    faSort, 
    faSortUp, 
    faSortDown, 
);


const Icon = (props) => {
    return (
        props.icon != null ?
            <Fragment>
                <span onClick={props.clicked} id={props.iconId}>
                    {
                        props.icon.indexOf('lnr-')=== 0 || props.icon.indexOf('pe-')=== 0 ? 
                            <i className={props.icon}/>
                            :
                            <FontAwesomeIcon icon={props.icon}/>
                    }
                </span>
            </Fragment>
        :
        null
    );
};

export default memo(Icon);