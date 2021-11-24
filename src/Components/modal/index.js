import React from "react";
import "./styles.css";

const Modal = ({ onClose = () => {}, children }) => {
  const fecharModal = (e) => {
    if (e.target.className === "modal") {
      onClose();
    }
  };

  return (
    <div id="modal" className="modal" onClick={fecharModal}>
      <div className="container">
        <h1>Editar Compras</h1>
        <h3>{children}</h3>
        <button className="botao-modal">Atualizar</button>
        <button className="botao-modal" onClick={onClose}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default Modal;
