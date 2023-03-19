import logoMesto from '../images/logo/mesto-white.svg'

function Header() {
    return (
        <header className="header">
            <img src={logoMesto} alt="Логотип Место" className="logo" />
        </header>
    );
}

export default Header;
