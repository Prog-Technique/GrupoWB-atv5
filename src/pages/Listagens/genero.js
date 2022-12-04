import '../style.css';
import { useState } from 'react';
import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { toast } from 'react-toastify';
import { FiCalendar } from "react-icons/fi";


export default function Genero() {

  const [opcao, setOpcao] = useState('escolha');
  const [listagem, setListagem] = useState([]);
  const [total, setTotal] = useState();

  async function listaGenero(e) {
    e.preventDefault();
    if (opcao === 'escolha') {
      toast.error('Escolha um gênero')
    } else {
      if (opcao == 'Feminino') {
        firebase.firestore().collection('Clientes')
          .where('genero', '==',  opcao)
          .get()
          .then((snapshot) => {
            let lista = [];
            let total_count = 0;
            snapshot.forEach((doc) => {
              total_count = total_count + 1;
              lista.push({
                id: doc.id,
                nomeCliente: doc.data().nomeCliente,
                genero: doc.data().genero
              });
            });
            setListagem(lista);
            setTotal(total_count);
          })
          .catch(() => {
            toast.error('Ops! Aconteceu algo inesperado.')
          });
      } else {
        if (opcao == 'Masculino') {
          firebase.firestore().collection('Clientes')
            .where('genero', '==',  opcao)
            .get()
            .then((snapshot) => {
              let lista = [];
              let total_count = 0;
              snapshot.forEach((doc) => {
                total_count = total_count + 1;
                lista.push({
                  id: doc.id,
                  nomeCliente: doc.data().nomeCliente,
                  genero: doc.data().genero
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

        <div className="container">
          <form className="form-student">
            <label>Pesquisa por gênero:</label>
            <select value={opcao} onChange={handleChangeSelect} className="selected">
              <option value="escolha">Escolha</option>
              <option value="Feminino">Feminino</option>
              <option value="Masculino">Masculino</option>
            </select>

            <button className='submit' onClick={listaGenero}>Procurar</button>
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