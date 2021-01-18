import NavbarAdmin from '../layout/NavbarAdmin/NavbarAdmin'
import HeaderAdmin from '../layout/HeaderAdmin/HeaderAdmin'
import FooterAdmin from '../layout/FooterAdmin/FooterAdmin'
import Body404 from '../layout/Body404/Body404'
import {Fragment} from 'react'


const FourOhFour = () => {
    return (
        <Fragment>
            <NavbarAdmin/>
            <HeaderAdmin/>
            <Body404/>
            <FooterAdmin/>
        </Fragment>
    );
};

export default FourOhFour;