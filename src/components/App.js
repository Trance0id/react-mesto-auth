import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmDeletionPopup from "./ConfirmDeletionPopup.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletionPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((prevCards) =>
          prevCards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(err);
        alert(`Не удалось получить ответ от сервера. \n${err}`);
      });
  }

  function handleCardDelete(cardId) {
    setFormIsLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
        alert(`Не удалось получить ответ от сервера. \n${err}`);
      })
      .finally(() => {
        setFormIsLoading(false);
      });
  }

  function handleCardDeleteClick(cardId) {
    setCardIdToDelete(cardId);
    setIsConfirmDeletionPopupOpen(true);
  }

  function handleUpdateUser(userInfo) {
    setFormIsLoading(true);
    api
      .setUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
        alert(`Не удалось получить ответ от сервера. \n${err}`);
      })
      .finally(() => {
        setFormIsLoading(false);
      });
  }

  function handleAddPlace(newCard) {
    setFormIsLoading(true);
    api
      .addNewPlace(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
        alert(`Не удалось получить ответ от сервера. \n${err}`);
      })
      .finally(() => {
        setFormIsLoading(false);
      });
  }

  function handleUpdateAvatar(userAvatar) {
    setFormIsLoading(true);
    api
      .setUserAvatar(userAvatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
        alert(`Не удалось получить ответ от сервера. \n${err}`);
      })
      .finally(() => {
        setFormIsLoading(false);
      });
  }

  function onLogOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
  }

  function onLogin(formData) {
    auth
      .authorize(formData)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  }

  function onRegister(formData) {
    console.log(formData);
    auth
      .register(formData)
      .then(() => {
        navigate("/sign-in", { replace: true });
        setRegisterSuccess(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setRegisterSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [registerSuccess, setRegisterSuccess] = React.useState(false);
  const [headerContent, setHeaderContent] = React.useState({
    onClick: () => {
      navigate("/sign-up", { replace: true });
    },
    email: "defEmail@yandex.ru",
    buttonText: "Регистрация",
  });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmDeletionPopupOpen, setIsConfirmDeletionPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardIdToDelete, setCardIdToDelete] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [formIsLoading, setFormIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then((results) => {
        setCurrentUser(results[0]);
        setCards(results[1]);
      })
      .catch((err) => {
        console.log(err);
        alert(`Не удалось получить ответ от сервера. \n${err}`);
      });
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }

  function addKeyListener() {
    document.addEventListener("keydown", handleKeyDown);
  }

  React.useEffect(addKeyListener, []);

  const jwt = localStorage.getItem("jwt");

  React.useEffect(() => {
    auth
      .checkToken(jwt)
      .then((res) => {
        if (res.email) {
          setLoggedIn(true);
          setHeaderContent({ email: res.email, buttonText: "Выйти" });
        }
      })
      .catch((err) => {
        console.log(`ошибка проверки токена: ${err}`);
        alert(`Ошибка проверки токена! \n${err}`);
      });
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header headerContent={headerContent} />
        <Routes>
          <Route
            path="*"
            element={
              <ProtectedRoute
                component={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDeleteClick}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                formIsLoading={formIsLoading}
                handleRegister={onRegister}
              />
            }
          />
          <Route path="/sign-in" element={<Login handleLogin={onLogin} />} />
        </Routes>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          formIsLoading={formIsLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          formIsLoading={formIsLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          formIsLoading={formIsLoading}
        />

        <ConfirmDeletionPopup
          isOpen={isConfirmDeletionPopupOpen}
          onClose={closeAllPopups}
          formIsLoading={formIsLoading}
          cardId={cardIdToDelete}
          onCardDelete={handleCardDelete}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          regSucceed={registerSuccess}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
