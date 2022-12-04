import '../style.css';
import { useState, useEffect } from 'react';
import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { toast } from 'react-toastify';
import { FiCalendar } from "react-icons/fi";


export default function SPGenero() {

  const [listagem1, setListagem1] = useState([]);
  const [listagem2, setListagem2] = useState([]);
  const [listagem3, setListagem3] = useState([]);
  const [listagem4, setListagem4] = useState([]);
  const [total1, setTotal1] = useState();
  const [total2, setTotal2] = useState();
  const [total3, setTotal3] = useState();
  const [total4, setTotal4] = useState();

  useEffect(() => {
    async function listaGeral1() {
      firebase.firestore().collection('Produtos')
        .orderBy('quanConsuPro', 'desc')
        .get()
        .then((snapshot) => {
          let lista = [];
          let total_count = 0;
          snapshot.forEach((doc) => {
            total_count = total_count + 1;
            lista.push({
              id: doc.id,
              nomeProduto: doc.data().nomeProduto,
              quanConsuPro: doc.data().quanConsuPro
            });
          });
          setListagem1(lista);
          setTotal1(total_count);
        })
        .catch(() => {
          toast.error('Ops! Aconteceu algo inesperado.')
        });
    }

    async function listaGeral2() {
      firebase.firestore().collection('Servicos')
        .orderBy('quanConsuSer', 'desc')
        .get()
        .then((snapshot) => {
          let lista = [];
          let total_count = 0;
          snapshot.forEach((doc) => {
            total_count = total_count + 1;
            lista.push({
              id: doc.id,
              nomeServico: doc.data().nomeServico,
              quanConsuSer: doc.data().quanConsuSer
            });
          });
          setListagem2(lista);
          setTotal2(total_count);
        })
        .catch(() => {
          toast.error('Ops! Aconteceu algo inesperado.')
        });
    }

    async function listaGeral3() {
      firebase.firestore().collection('Produtos')
        .orderBy('valorConsuPro', 'desc')
        .get()
        .then((snapshot) => {
          let lista = [];
          let total_count = 0;
          snapshot.forEach((doc) => {
            total_count = total_count + 1;
            lista.push({
              id: doc.id,
              nomeProduto: doc.data().nomeProduto,
              valorConsuPro: doc.data().valorConsuPro
            });
          });
          setListagem3(lista);
          setTotal3(total_count);
        })
        .catch(() => {
          toast.error('Ops! Aconteceu algo inesperado.')
        });
    }

    async function listaGeral4() {
      firebase.firestore().collection('Servicos')
        .orderBy('valorConsuSer', 'desc')
        .get()
        .then((snapshot) => {
          let lista = [];
          let total_count = 0;
          snapshot.forEach((doc) => {
            total_count = total_count + 1;
            lista.push({
              id: doc.id,
              nomeServico: doc.data().nomeServico,
              valorConsuSer: doc.data().valorConsuSer
            });
          });
          setListagem4(lista);
          setTotal4(total_count);
        })
        .catch(() => {
          toast.error('Ops! Aconteceu algo inesperado.')
        });
    }

    

    listaGeral1();
    listaGeral2();
    listaGeral3();
    listaGeral4();

  }, []);

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Listagem">
          <FiCalendar color="#d48e90" size={25} />
        </Title>

        <p>Serviços ou produtos mais consumidos por gênero</p>

        <i>Total: <strong>{total1}</strong></i>
        <table id="dataTable">
          <thead>
            <tr>
              <th scope="col">Produto</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {listagem1.map((item, index) => {
              return (
                <tr key={index}>
                  <td data-label="Produto">{item.nomeProduto}</td>
                  <td data-label="Quantidade">{item.quanConsuPro}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <i>Total: <strong>{total2}</strong></i>
        <table id="dataTable">
          <thead>
            <tr>
              <th scope="col">Serviço</th>
              <th scope="col">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {listagem2.map((item, index) => {
              return (
                <tr key={index}>
                  <td data-label="Serviço">{item.nomeServico}</td>
                  <td data-label="Quantidade">{item.quanConsuSer}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <i>Total: <strong>{total3}</strong></i>
        <table id="dataTable">
          <thead>
            <tr>
              <th scope="col">Produto</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            {listagem3.map((item, index) => {
              return (
                <tr key={index}>
                  <td data-label="Produto">{item.nomeProduto}</td>
                  <td data-label="Valor">{item.valorConsuPro}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <i>Total: <strong>{total4}</strong></i>
        <table id="dataTable">
          <thead>
            <tr>
              <th scope="col">Serviço</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            {listagem4.map((item, index) => {
              return (
                <tr key={index}>
                  <td data-label="Serviço">{item.nomeServico}</td>
                  <td data-label="Valor">{item.valorConsuSer}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}