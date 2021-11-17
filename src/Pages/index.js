import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import api from "../Services/api";
//import Modal from "../Components/modal/index";

export default function Adicionar() {
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [incidents, setIncidests] = useState([]);
  const formRef = useRef(null);
  const [visibility, setVisibility] = useState(false);

  const [editBrand, setEditBrand] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editId, setEditId] = useState("");

  async function AdicionarCompras(e) {
    e.preventDefault();

    const dados = {
      brand,
      quantity,
      price,
    };

    const resposta = await api
      .post("register", dados)
      .then((response) => {
        alert(`Sua compra foi adicionada com sucesso`);
        getItems().then((response) => {
          setBrand("");
          setQuantity("");
          setPrice("");
          formRef.current.reset();
        });
      })
      .catch((error) => {
        alert("Erro, tente novamente.");
      });
  }

  const getItems = async () => {
    await api.get("find").then((res) => {
      setIncidests(res.data);
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`delete/${id}`).then((res) => {
      alert("Compra deletada.");
      getItems();
    });
  };

  const atualizar = async (editId) => { 
    const dados = {
      brand: editBrand,
      quantity: editQuantity,
      price: editPrice,
    }
    try {
      await api.put(`update/${editId}`, dados);
      closeEdit();
      getItems();
    } catch (err) {
      
    }
  }

  function handleEdit(id, brand, quantity, price) {
    setVisibility(true);
    setEditBrand(brand);
    setEditQuantity(quantity);
    setEditPrice(price);
    setEditId(id);
  }

  function closeEdit() {
    setVisibility(false);
  }

  return (
    <>
      <div>
        <form onSubmit={AdicionarCompras} ref={formRef}>
          <h1>Adicionar Compras</h1>
          <div>
            <label> Marca da Ração:</label>
            <input
              placeholder="Marca X"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Quantidade (kg): </label>
            <input
              type="number"
              placeholder="20"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Preço (R$): </label>
            <input
              type="number"
              placeholder="100"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
          <button type="submit" className="botao1">
            <h3>Adiconar Compra</h3>
          </button>
        </form>
      </div>
      <div>
        <h1>Visualizar Compras</h1>
        <table>
          <thead>
            <tr>
              <th>Marca</th>
              <th>Quantidade (kg)</th>
              <th>Preço R$</th>
              <th>Data</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => {
              const date = new Date(incident.createdAt);
              return (
                <tr key={incident._id}>
                  <td>{incident?.brand}</td>
                  <td>{incident?.quantity}</td>
                  <td>{incident?.price}</td>
                  <td>{`${date.getDate()}/${date.getMonth() + 1
                    }/${date.getFullYear()}`}</td>
                  <td>
                    <button onClick={() => handleEdit(incident._id, incident.brand, incident.quantity, incident.price)} > Editar</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(incident._id)}>
                      Deletar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* {visibility ? (
        <div className="modal">
          <div className="container">
            <h1>Editar Compras</h1>
            <div>
              <label> Marca da Ração:</label>
              <input>
                value={editBrand}
                onChange={(e) => setEditBrand(e.target.value)}
              </input>
              <label>Quantidade (kg): </label>
              <input>
                value={editQuantity}
                onChange={(e) => setEditQuantity(e.target.value)}
              </input>
              <label>Preço (R$): </label>
              <input>
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              </input>
            </div>
            <button className="botao-modal" onClick={handleEdit}>Atualizar</button>
            <button className="botao-modal" onClick={closeEdit}>
              Sair
            </button>
          </div>
        </div>
      ) : null} */}
      {visibility ? (
        <div className="modal">
          <div className="container">
            <h1>Editar Compras</h1>
            <div>
              <label> Marca da Ração:</label>
              <input
                value={editBrand}
                onChange={(e) => setEditBrand(e.target.value)}>
              </input>
              <label>Quantidade (kg): </label>
              <input
                type="number"
                value={editQuantity}
                onChange={(e) => setEditQuantity(e.target.value)}
              ></input>
              <label>Preço (R$): </label>
              <input
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              ></input>
              <button className="botao-modal" onClick={() => atualizar(editId)}>Atualizar</button>
              <button className="botao-modal" onClick={ () => closeEdit}>Sair</button>
            </div>
          </div>

        </div>
      ) : null}
    </>
  );
}
