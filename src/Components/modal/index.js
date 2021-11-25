import React, { useState, useRef } from "react";
import "./styles.css";

const Modal = ({ onClose = () => { } }, handleEdit, incident) => {
  const fecharModal = (e) => {
    if (e.target.className === "modal") {
      onClose();
    }
  };
  const [brand, setBrand] = useState(incident.brand);
  const [quantity, setQuantity] = useState(incident.quantity);
  const [price, setPrice] = useState(incident.price);
  const formRef = useRef(null);

  return (
    <form ref={formRef}>
      <div id="modal" className="modal" onClick={fecharModal}>
        <div className="container">
          <h1>Editar Compras</h1>
          <div>
            <label> Marca da Ração:</label>
            <input>
              value={brand}
            </input>
            <label>Quantidade (kg): </label>
            <input></input>
            <label>Preço (R$): </label>
            <input></input>
          </div>
          <button className="botao-modal" onClick={handleEdit}>Atualizar</button>
          <button className="botao-modal" onClick={onClose}>
            Sair
          </button>
        </div>
      </div>
    </form>
  );
};

export default Modal;
