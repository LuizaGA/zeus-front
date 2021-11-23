import React, {useState, useEffect} from "react";
import "./styles.css";
import api from "../Services/api"

export default function Adicionar() {
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  // const [incidents, setIncidests] = useState('');
  // essa linha de cima é um teste

  async function AdicionarCompras(e){
    e.preventDefault();

    const dados = {
      brand,
      quantity,
      price
    };
    
    try {
      const resposta = await api.post('register', dados);
      alert(`Sua compra foi adicionada com sucesso`);
    } catch (err) {
      alert('Erro, tente novamente.');
    }
  }
  
  // useEffect(() => {
  //     api.get('find', await (resposta =>{
  //       setIncidests(resposta.data)
  //     }) )
  // }, [])
  // esse useEffect é um teste
 
  
  return (
    <>
      <div>
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
      <div >
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
              {/* {incidents.map(incident => (
                <tr>
                  <td>{incident.brand}</td>
                  <td>{incident.quantity}</td>
                  <td>{incident.price}</td>
                  <td>21/11</td>
                </tr>
              ))} */}
            </tr>
          </tbody>
        </table>        
      </div>
    </>
  );
}
