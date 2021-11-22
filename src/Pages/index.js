import React, { useState} from "react";
import "./styles.css";
import api from "../Services/api"

export default function Adicionar() {
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  function AdicionarCompras(e){
    e.preventDefault();

    console.log({
      brand,
      quantity,
      price
    })

  }
  return (
    <>
      <div className="container">
        <form onSubmit={AdicionarCompras}>
          <h1>Adicionar Compras</h1>
          <div>
            <label> Marca da Ração:</label>
            <input placeholder="Marca X" value={brand} onChange={e => setBrand(e.target.value)}></input>
          </div>
          <div>
            <label>Quantidade (kg): </label>
            <input type="number" placeholder="20" value={quantity} onChange={e => setQuantity(e.target.value)}></input>
          </div>
          <div>
            <label>Preço (R$): </label>
            <input type="number" placeholder="100" value={price} onChange={e => setPrice(e.target.value)}></input>
          </div>
          <button type="submit">
            <h3>Adiconar Compra</h3>
          </button>
        </form>
      </div>
      <div className = "containerVisualizar">
        <h1>Visualizar Compras</h1>
        <table>
          <thead>
            <tr>
              <th>Marca</th>
              <th>Quantidade (kg)</th>
              <th>Preço R$</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MarcaX</td>
              <td>10</td>
              <td>100</td>
              <td>21/11</td>
            </tr>
            <tr>
              <td>MarcaY</td>
              <td>20</td>
              <td>200</td>
              <td>21/11</td>
            </tr>
          </tbody>
        </table>        
      </div>
    </>
  );
}
