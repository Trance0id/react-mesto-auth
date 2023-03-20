import React from "react";
import useValidation from "../hooks/useValidation.js";
import * as auth from "../utils/auth.js";
import { Link } from "react-router-dom";

function Register({ onSubmit, formIsLoading, handleRegister }) {
  const validation = useValidation();

  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });

    validation.onInputChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleRegister(formValue);
  };

  return (
    <div className="popup__container popup__container_type_auth">
      <h3 className="popup__heading popup__heading_type_auth">Регистрация</h3>
      <form name="register" className="popup__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="popup__input popup__input_env_auth"
          name="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="30"
          autoComplete="off"
          value={formValue.email || ""}
          onChange={handleChange}
        />
        <div className="popup__error">{validation.errors.email}</div>
        <input
          type="password"
          className="popup__input popup__input_env_auth"
          name="password"
          placeholder="Пароль"
          required
          autoComplete="off"
          minLength="4"
          maxLength="16"
          value={formValue.password || ""}
          onChange={handleChange}
        />
        <div className="popup__error">{validation.errors.email}</div>
        <button
          type="submit"
          className={`button popup__button popup__button_env_auth ${
            validation.isFormValid || true ? "" : "popup__button_disabled"
          }`}
          disabled={!validation.isFormValid || true}
        >
          {formIsLoading ? "Подождите..." : "Зарегистрироваться"}
        </button>
      </form>
      <Link to="/sign-in" className="popup__bottom-link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
