import React from "react";

function InfoTooltip({ isOpen, onClose, title, picture }) {
  return (
    <div
      className={`popup popup_type_info ${isOpen && "popup_opened"}`}
      onClick={onClose}
    >
      <div
        className="popup__container popup__container_type_info"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="button popup__close"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <div
          style={{ backgroundImage: `url(${picture})` }}
          className="popup__status-pic"
        />
        <h3 className="popup__heading popup__heading_type_info">{title}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
