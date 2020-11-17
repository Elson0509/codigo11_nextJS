import AccordionAdmin from './AccordionAdmin/AccordionAdmin'
import MainPageAdmin from './MainPageAdmin/MainPageAdmin'
import classes from './MainAdmin.module.css'

const MainAdmin = (props) => {
    return (
        <main className="container">
            <div className="row">
                <AccordionAdmin/>
                <MainPageAdmin>
                    {props.children}
                </MainPageAdmin>
            </div>
        </main>
    );
};

export default MainAdmin;