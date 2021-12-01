import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import api from "../Services/api";

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

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");

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
      .catch((err) => {
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
    if (window.confirm("Deseja realmente excluir?")) {
      await api.delete(`delete/${id}`);
      getItems();
    }
  };

  const atualizar = async (editId) => {
    const dados = {
      brand: editBrand,
      quantity: editQuantity,
      price: editPrice,
    };
    try {
      await api.put(`update/${editId}`, dados);
      setVisibility(false);
      getItems();
      alert("Compra atualizada com sucesso.");
    } catch (err) {
      alert("Erro, tente novamente.");
    }
  };

  function handleEdit(id, brand, quantity, price) {
    setVisibility(true);
    setEditBrand(brand);
    setEditQuantity(quantity);
    setEditPrice(price);
    setEditId(id);
  }

  const calcularTotal = async (month, year) => {
    try {
      await api.get(`total?month=${month}&year=${year}`, {}).then((res) => {
        console.log(res.data);
        setTotalPrice(res.data.totalPrice);
        setTotalQuantity(res.data.totalQuantity);
      });
    } catch (err) {
      alert("Erro, tente novamente.");
    }
  };

  return (
    <>
      <header>
        <h2>Desafio Incrível - </h2>
        <h1> Zeus</h1>
      </header>
      <div className="tela">
        <div className="area1">
          <div>
            <form onSubmit={AdicionarCompras} ref={formRef}>
              <h3>Adicionar Compras</h3>
              <div>
                <label> Marca da Ração:</label>
                <input
                  className="input"
                  placeholder="Ex: Marca X"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  maxlength="20"
                ></input>
              </div>
              <div>
                <label>Quantidade (kg): </label>
                <input
                  className="input"
                  type="number"
                  placeholder="Ex: 20"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="0"
                  max="9999"
                ></input>
              </div>
              <div>
                <label>Preço (R$): </label>
                <input
                  className="input"
                  type="number"
                  placeholder="Ex: 100"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  max="999999"
                ></input>
              </div>
              <button type="submit" className="botao1">
                <h4>Adicionar Compra</h4>
              </button>
            </form>
          </div>

          <div>
            <h3>Total de Compras</h3>
            <div>
              <label>
                Escolha o mês e o ano e veja quanto gastou nesse mês :
              </label>
              <div>
                <label>Mês</label>
                <input
                  className="input"
                  type="number"
                  min="1"
                  max="12"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                ></input>
                <br></br>
                <label>Ano</label>
                <input
                  className="input"
                  type="number"
                  min="2021"
                  max="2050"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                ></input>
              </div>
              <button
                className="botao1"
                onClick={() => calcularTotal(month, year)}
              >
                <h4>Calcular Total</h4>
              </button>
              <div>
                <label>Quantidade Total (R$): {totalQuantity} </label>
              </div>
              <div>
                <label>Preço Total (R$): {totalPrice} </label>
              </div>
            </div>
          </div>
        </div>

        <div className="area2">
          <h3>Visualizar Compras</h3>
          <table border="2">
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
                    <td>{`${date.getDate()}/${
                      date.getMonth() + 1
                    }/${date.getFullYear()}`}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleEdit(
                            incident._id,
                            incident.brand,
                            incident.quantity,
                            incident.price
                          )
                        }
                      >
                        {" "}
                        Editar
                      </button>
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
      </div>

      {visibility ? (
        <div className="modal">
          <div className="container">
            <h3>Editar Compras</h3>
            <div>
              <label> Marca da Ração:</label>
              <input
                className="input2"
                value={editBrand}
                onChange={(e) => setEditBrand(e.target.value)}
                maxlength="20"
              ></input>
              <br></br>
              <label>Quantidade (kg): </label>
              <input
                className="input2"
                type="number"
                value={editQuantity}
                onChange={(e) => setEditQuantity(e.target.value)}
                min="0"
                max="9999"
              ></input>
              <br></br>
              <label>Preço (R$): </label>
              <input
                className="input2"
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                min="0"
                max="999999"
              ></input>
              <br></br>
              <button className="botao-modal" onClick={() => atualizar(editId)}>
                Atualizar
              </button>
              <button
                className="botao-modal"
                onClick={() => setVisibility(false)}
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
