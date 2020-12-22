import LoginButton from '../../components/Buttons/LoginButton/LoginButton'
import classes from './Landing.module.css'

const Navbar = () => {
    return (
        <nav className={`navbar ${classes.Bg_theme_color} static-top`}>
            <div className="container">
                <div className={`navbar-brand ${classes.Logo_landing}`}/>
                <span>
                    <LoginButton link='/login?aba=1' nameLink='Criar Conta'/>
                    <LoginButton link='/login' nameLink='Entrar'/>
                </span>
            </div>
        </nav>
    );
};

export default Navbar;