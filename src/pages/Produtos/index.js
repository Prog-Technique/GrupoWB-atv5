import { useState, useEffect } from 'react';
import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { toast } from 'react-toastify';

import ModalDetalhes from '../../components/ModalDetalhes/produto';

import { FiArchive, FiX, FiSearch, FiArrowRight } from "react-icons/fi";

import { Link } from 'react-router-dom';

export default function Produtos(){
  const [ocorrencia, setOcorrencia] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');

  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();
  
  const listRef = firebase.firestore().collection('Produtos');

  async function cadastrarProduto(e){
    e.preventDefault();

    if(nomeProduto === ''){
      toast.error('Você deve fornecer o nome do produto!');
    }else{
      await listRef.add({
        nomeProduto: nomeProduto,
        precoProduto: precoProduto
      });
      toast.success('Produto cadastrado!');
    }

    setNomeProduto('');
    setPrecoProduto('');
  }

  useEffect(()=> {

    async function loadProdutos(){
      await listRef
      .onSnapshot((doc)=>{
        let meusProdutos = [];

        doc.forEach((item)=>{
          meusProdutos.push({
            id: item.id,
            nomeProduto: item.data().nomeProduto,
            precoProduto: item.data().precoProduto
          })
        });

        setOcorrencia(meusProdutos);

      });

    }

    loadProdutos();
    
  }, []);

  async function excluirProduto(id){
    await listRef.doc(id)
    .delete()
    .then(()=>{
      toast.error('Produto excluido!');
    });
  }

  function togglePostModal(item){
    setShowPostModal(!showPostModal);
    setDetail(item);
  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Produto">
          <FiArchive color="#d48e90" size={25}/>
        </Title>

        <div className="container">
          <form className="forms">
            <label>Cadastrar Produto:</label>
            <input type="text" placeholder="Nome do produto" value={nomeProduto} onChange={ (e) => setNomeProduto(e.target.value) } />
            <input type="text" placeholder="Preço do produto" value={precoProduto} onChange={ (e) => setPrecoProduto(e.target.value) } />
            <button className='submit' onClick={cadastrarProduto}>Cadastrar</button>
          </form>
        </div>

        <table>
          <thead>
            <tr>
              <th scope="col">Produtos cadastrados</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {ocorrencia.map((item, index)=>{
              return(
                <tr key={index}>
                  <td data-label="Produto cadastrado">{item.nomeProduto}</td>
                  <td data-label="#">
                    <button className="action" style={{backgroundColor: '#3583f6'}} onClick={ () => togglePostModal(item) }>
                        <FiSearch color="#fff" size={17}/>
                    </button>

                    <Link className="action" style={{backgroundColor: '#F6a935'}} to={`/produtos/${item.id}`}>
                      <FiArrowRight color="#fff" size={17}/>
                    </Link>

                    <button className="action" style={{backgroundColor: '#f00'}} onClick={ () => excluirProduto(item.id) }>
                        <FiX color="#fff" size={17}/>
                    </button>
                    
                  </td>
                </tr>
              )
            })}            
          </tbody>
        </table>
        
      </div>

      {showPostModal && (
        <ModalDetalhes
          conteudo={detail}
          close={togglePostModal}
        />
      )}

    </div>
  )
}