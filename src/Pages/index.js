import React from "react";
import "./styles.css";

export default function Adicionar() {
  return (
    <>
      <form>
        <h1>Adicionar Compras</h1>
        <div>
          <h2> Marca da Ração:</h2>
          <input placeholder="marca da ração"></input>
        </div>
        <div>
          <h2>Quantidade (kg): </h2>
          <input type="number" placeholder="quantidade da ração"></input>
        </div>
        <div>
          <h2>Preço (R$): </h2>
          <input type="number" placeholder="preço da ração"></input>
        </div>
        <button type="submit">
          <h3>Adiconar Compra</h3>
        </button>
      </form>
    </>
  );
}
