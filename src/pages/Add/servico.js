import { useState, useEffect } from 'react';
import firebase from '../../services/firebaseConnection';

import { useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { toast } from 'react-toastify';
import { FiClipboard, FiPlus } from "react-icons/fi";

import '../style.css';

export default function Servicos() {
  const { id } = useParams();

  const id2 = id;
  const [ocorrencia, setOcorrencia] = useState([]);
  const [ocorrencia2, setOcorrencia2] = useState([]);
  const [nomeServico, setNomeServico] = useState("");
  const [precoServico, setPrecoServico] = useState("");
  const [totalItems, setTotalItems] = useState("");

  // const [total, setTotal] = useState();

  const listRef = firebase.firestore().collection('Servicos');
  const listRef2 = firebase.firestore().collection('Clientes').where('cpf', '==', id);

  // const totalParse = parseInt(totalItems)

  useEffect(() => {

    async function loadServicos() {
      await listRef
        .onSnapshot((doc) => {
          let meusServicos = [];

          doc.forEach((item) => {
            meusServicos.push({
              id: item.id,
              nomeServico: item.data().nomeServico,
              precoServico: item.data().precoServico
            });

          });

          setOcorrencia(meusServicos);

        });

    }

    async function loadServicos2() {
      await listRef2
        .onSnapshot((doc) => {
          let meusServicos2 = [];
          let total_count = 0;

          doc.forEach((item) => {
            total_count = total_count + 1;
            meusServicos2.push({
              id: item.id,
              servico: item.data().servico,
              precoServ: item.data().precoServ
              // quantProd: item.data().quantProd
            });

          });

          setOcorrencia2(meusServicos2);
          // setTotal(total_count);

        });

    }

    loadServicos();
    loadServicos2();

  }, []);



  async function adicionarServico(id) {

    await firebase.firestore().collection('Clientes').doc(id2).update({
      servico: firebase.firestore.FieldValue.arrayUnion(nomeServico),
      precoServ: firebase.firestore.FieldValue.arrayUnion(precoServico),
      // quantProd: totalParse + 1
    });

    // await firebase.firestore().collection('Clientes').doc(id2).get()
    // .then((snapshot) => {
    //   setTotalItems(snapshot.data().quantProd);
    // });

    await firebase.firestore().collection('Servicos').doc(id).get()
      .then((snapshot) => {
        setNomeServico(snapshot.data().nomeServico);
        setPrecoServico(snapshot.data().precoServico);
      });

    toast.success('Serviço adicionado, para aparecer clique de novo!');
  }

  // var servicos = 0
  // console.log(ocorrencia2.length);
  // if (ocorrencia2.length > 0) {
  //   var coisas = ocorrencia2[0]
  //   servicos = coisas.servico
  // }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Adicionar Serviço">
          <FiClipboard color="#d48e90" size={25} />
        </Title>

        <p>Adicionados ao Cliente</p>

        <table>
          <thead>
            <tr>
              <th scope="col">Serviço</th>
            </tr>
          </thead>
          <tbody>
          {ocorrencia2.map((item, index) => {
              return (
                <tr key={index}>
                  <td data-label="Serviço cadastrado">{item.servico}</td>
                </tr>
              )
            })}

            {/* <tr>
            {servicos!== 0 && servicos.map((item) => {
              return (
                
                  <td className='vertical'  data-label="Serviço">{item}</td>
                
              )
            })}
            </tr> */}
          </tbody>
        </table>
        {/* <i>Total: <strong>{total}</strong></i> */}

        <p>Serviços Cadastrados</p>

        <table>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Preço</th>
              <th scope="col">Adicionar</th>
            </tr>
          </thead>
          <tbody>
            {ocorrencia.map((item, index) => {
              return (
                <tr key={index}>
                  <td data-label="Serviço cadastrado">{item.nomeServico}</td>
                  <td data-label="Preço">{item.precoServico}</td>
                  <td data-label="Adicionar">

                    <button className="action" style={{ backgroundColor: '#32CD32' }} onClick={() => adicionarServico(item.id)}>
                      <FiPlus color="#fff" size={17} />
                    </button>

                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    </div>
  )
}