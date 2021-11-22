import React from "react";
import "./styles.css";

export default function Adicionar() {
  return (
    <>
      <div className="container">
        <form>
          <h1>Adicionar Compras</h1>
          <div>
            <label> Marca da Ração:</label>
            <input placeholder="Marca X"></input>
          </div>
          <div>
            <label>Quantidade (kg): </label>
            <input type="number" placeholder="20"></input>
          </div>
          <div>
            <label>Preço (R$): </label>
            <input type="number" placeholder="100"></input>
          </div>
          <button type="submit">
            <h3>Adiconar Compra</h3>
          </button>
        </form>
      </div>
    </>
  );
}
