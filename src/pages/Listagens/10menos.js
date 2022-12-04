import '../style.css';
import { useState } from 'react';
import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { toast } from 'react-toastify';
import { FiCalendar } from "react-icons/fi";


export default function DezMenos() {

  const [opcao, setOpcao] = useState('escolha');
  const [listagem, setListagem] = useState([]);
  const [total, setTotal] = useState();

  async function lista10menos(e) {
    e.preventDefault();

    if (opcao === 'escolha') {
      toast.error('Escolha uma opção');
    } else {
      if (opcao == 'quantProd') {
        firebase.firestore().collection('Clientes')
          .orderBy('quantProd', 'asc').limit(10)
          .get()
          .then((snapshot) => {
            let lista = [];
            let total_count = 0;
            snapshot.forEach((doc) => {
              total_count = total_count + 1;
              lista.push({
                id: doc.id,
                nomeCliente: doc.data().nomeCliente,
                quantProd: doc.data().quantProd
              });
            });
            setListagem(lista);
            setTotal(total_count);
          })
          .catch(() => {
            toast.error('Ops! Aconteceu algo inesperado.')
          });
      } else {
        if (opcao == 'quantSer') {
          firebase.firestore().collection('Clientes')
          .orderBy('quantSer', 'asc').limit(10)
            .get()
            .then((snapshot) => {
              let lista = [];
              let total_count = 0;
              snapshot.forEach((doc) => {
                total_count = total_count + 1;
                lista.push({
                  id: doc.id,
                  nomeCliente: doc.data().nomeCliente,
                  quantSer: doc.data().quantSer
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

        <p>Menos consumiram produtos ou serviços, em quantidade</p>

        <div className="container">
          <form className="form-student">
            <label>Pesquisa por:</label>
            <select value={opcao} onChange={handleChangeSelect} className="selected">
              <option value="escolha">Escolha</option>
              <option value="quantProd">Produtos</option>
              <option value="quantSer">Serviços</option>
            </select>

            <button className='submit' onClick={lista10menos}>Procurar</button>
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