import '../style.css';
import { useState } from 'react';
import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { toast } from 'react-toastify';
import { FiCalendar } from "react-icons/fi";


export default function CincoValor() {

  const [opcao, setOpcao] = useState('valorTotal');
  const [listagem, setListagem] = useState([]);
  const [total, setTotal] = useState();

  async function lista5valor(e) {
    e.preventDefault();

    if (opcao === 'valorTotal') {
      firebase.firestore().collection('Clientes')
          .orderBy('valorTotal', 'desc').limit(5)
          .get()
          .then((snapshot) => {
            let lista = [];
            let total_count = 0;
            snapshot.forEach((doc) => {
              total_count = total_count + 1;
              lista.push({
                id: doc.id,
                nomeCliente: doc.data().nomeCliente,
                valorTotal: doc.data().valorTotal
              });
            });
            setListagem(lista);
            setTotal(total_count);
          })
          .catch(() => {
            toast.error('Ops! Aconteceu algo inesperado.')
          });
    } else {
      if (opcao == 'valorGastoPro') {
        firebase.firestore().collection('Clientes')
          .orderBy(opcao, 'desc').limit(5)
          .get()
          .then((snapshot) => {
            let lista = [];
            let total_count = 0;
            snapshot.forEach((doc) => {
              total_count = total_count + 1;
              lista.push({
                id: doc.id,
                nomeCliente: doc.data().nomeCliente,
                valorGastoPro: doc.data().valorGastoPro
              });
            });
            setListagem(lista);
            setTotal(total_count);
          })
          .catch(() => {
            toast.error('Ops! Aconteceu algo inesperado.')
          });
      } else {
        if (opcao == 'valorGastoSer') {
          firebase.firestore().collection('Clientes')
            .orderBy(opcao, 'desc').limit(5)
            .get()
            .then((snapshot) => {
              let lista = [];
              let total_count = 0;
              snapshot.forEach((doc) => {
                total_count = total_count + 1;
                lista.push({
                  id: doc.id,
                  nomeCliente: doc.data().nomeCliente,
                  valorGastoSer: doc.data().valorGastoSer
                });
              });
              setListagem(lista);
              setTotal(total_count);
            })
            .catch(() => {
              toast.error('Ops! Aconteceu algo inesperado.')
            });
        }
      }
    }
    
  }

  function handleChangeSelect(e) {
    setOpcao(e.target.value);
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Listagem">
          <FiCalendar color="#d48e90" size={25} />
        </Title>

        <p>Mais consumiram em valor</p>

        <div className="container">
          <form className="form-student">
            <label>Pesquisa por:</label>
            <select value={opcao} onChange={handleChangeSelect} className="selected">
              <option value="valorTotal">Todos</option>
              <option value="valorGastoPro">Produtos</option>
              <option value="valorGastoSer">Serviços</option>
            </select>

            <button className='submit' onClick={lista5valor}>Procurar</button>
          </form>
        </div>


        <i>Total: <strong>{total}</strong></i>
        <table id="dataTable">
          <thead>
            <tr>
              <th scope="col">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {listagem.map((item, index) => {
              return (
                <tr key={index}>
                  <td data-label="Resultado">{item.nomeCliente}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}