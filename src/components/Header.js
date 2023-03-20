import logoMesto from "../images/logo/mesto-white.svg";
import { Link } from "react-router-dom";

function Header({ headerContent }) {
  return (
    <header className="header">
      <img src={logoMesto} alt="Логотип Место" className="logo" />
      <p className="header__content">
        {headerContent.email}
        <button
          type="button"
          onClick={headerContent.onClick}
          className="header__button"
        >
          {headerContent.buttonText}
        </button>
      </p>
    </header>
  );
}

export default Header;
