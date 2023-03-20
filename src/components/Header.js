import logoMesto from "../images/logo/mesto-white.svg";
import { Link } from "react-router-dom";

function Header(header) {
  return (
    <header className="header">
      <img src={logoMesto} alt="Логотип Место" className="logo" />
      {/* <p>{header.email}</p>
      <Link to={header.link}>{header.linkText}</Link> */}
      <p className="header__email">
        {`someEmail@mail.com `}
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      </p>
    </header>
  );
}

export default Header;
