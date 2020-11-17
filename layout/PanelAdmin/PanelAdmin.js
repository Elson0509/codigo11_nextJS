import classes from './PanelAdmin.module.css'

const PanelAdmin = (props) => {
    return (
        <section className={["container p-3 my-2 slow-shadow", `bg-${props.bgcolor}`].join(" ")}>
            <h1 className={["h1 text-white text-center", classes.Panel_font].join(" ")}>{props.fiiname}</h1>
            <h1 className={["h1 text-white text-center", classes.Panel_font].join(" ")}>({props.fiiticker})</h1>
        </section>
    );
};

export default PanelAdmin;