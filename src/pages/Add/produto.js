import { useState, useEffect } from 'react';
import firebase from '../../services/firebaseConnection';

import { useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { toast } from 'react-toastify';
import { FiArchive, FiPlus } from "react-icons/fi";

import '../style.css';

export default function Produtos() {
  const { id } = useParams();

  const id2 = id;
  const [ocorrencia, setOcorrencia] = useState([]);
  const [ocorrencia2, setOcorrencia2] = useState([]);
  const [nomeProduto, setNomeProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");
  const [totalItems, setTotalItems] = useState("");

  // const [total, setTotal] = useState();

  const listRef = firebase.firestore().collection('Produtos');
  const listRef2 = firebase.firestore().collection('Clientes').where('cpf', '==', id);

  // const totalParse = parseInt(totalItems)

  useEffect(() => {

    async function loadProdutos() {
      await listRef
        .onSnapshot((doc) => {
          let meusProdutos = [];

          doc.forEach((item) => {
            meusProdutos.push({
              id: item.id,
              nomeProduto: item.data().nomeProduto,
              precoProduto: item.data().precoProduto
            });

          });

          setOcorrencia(meusProdutos);

        });

    }

    async function loadProdutos2() {
      await listRef2
        .onSnapshot((doc) => {
          let meusProdutos2 = [];
          let total_count = 0;

          doc.forEach((item) => {
            total_count = total_count + 1;
            meusProdutos2.push({
              id: item.id,
              produto: item.data().produto,
              precoProd: item.data().precoProd
              // quantProd: item.data().quantProd
            });

          });

          setOcorrencia2(meusProdutos2);
          // setTotal(total_count);

        });

    }

    loadProdutos();
    loadProdutos2();

  }, []);



  async function adicionarProduto(id) {

    await firebase.firestore().collection('Clientes').doc(id2).update({
      produto: firebase.firestore.FieldValue.arrayUnion(nomeProduto),
      precoProd: firebase.firestore.FieldValue.arrayUnion(precoProduto),
      // quantProd: totalParse + 1
    });

    // await firebase.firestore().collection('Clientes').doc(id2).get()
    // .then((snapshot) => {
    //   setTotalItems(snapshot.data().quantProd);
    // });

    await firebase.firestore().collection('Produtos').doc(id).get()
      .then((snapshot) => {
        setNomeProduto(snapshot.data().nomeProduto);
        setPrecoProduto(snapshot.data().precoProduto);
      });

    toast.success('Produto adicionado, para aparecer clique de novo!');
  }

  // var produtos = 0
  // console.log(ocorrencia2.length);
  // if (ocorrencia2.length > 0) {
  //   var coisas = ocorrencia2[0]
  //   produtos = coisas.produto
  // }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Adicionar Produto">
          <FiArchive color="#d48e90" size={25} />
        </Title>

        <p>Adicionados ao Cliente</p>

        <table>
          <thead>
            <tr>
              <th scope="col">Produto</th>
            </tr>
          </thead>
          <tbody>
          {ocorrencia2.map((item, index) => {
              return (
                <tr key={index}>
                  <td data-label="Produto cadastrado">{item.produto}</td>
                </tr>
              )
            })}

            {/* <tr>
            {produtos!== 0 && produtos.map((item) => {
              return (
                
                  <td className='vertical'  data-label="Produto">{item}</td>
                
              )
            })}
            </tr> */}
          </tbody>
        </table>
        {/* <i>Total: <strong>{total}</strong></i> */}

        <p>Produtos Cadastrados</p>

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
                  <td data-label="Produto cadastrado">{item.nomeProduto}</td>
                  <td data-label="Preço">{item.precoProduto}</td>
                  <td data-label="Adicionar">

                    <button className="action" style={{ backgroundColor: '#32CD32' }} onClick={() => adicionarProduto(item.id)}>
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