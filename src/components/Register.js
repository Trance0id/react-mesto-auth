import React from "react";
import useValidation from "../hooks/useValidation.js";
import * as auth from "../utils/auth.js";
import { useNavigate } from "react-router-dom";

function Register({ onSubmit, formIsLoading }) {
  const validation = useValidation();

  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });

    validation.handleChange(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValue.password === formValue.confirmPassword) {
      auth.register(formValue).then(() => {
        navigate("/sign-in", { replace: true });
      });
    }
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
        <div className="popup__error">{validation.errors.name}</div>
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
        <div className="popup__error">{validation.errors.link}</div>
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
      <a href="#" className="popup__bottom-link">
        Уже зарегистрированы? Войти
      </a>
    </div>
  );
}

export default Register;
