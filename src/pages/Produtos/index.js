import { useState, useEffect } from 'react';
import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { toast } from 'react-toastify';

import { FiArchive, FiX, FiEdit3 } from "react-icons/fi";

import { Link } from 'react-router-dom';

export default function Produtos(){
  const [ocorrencia, setOcorrencia] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  
  const [total, setTotal] = useState();

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
        let total_count = 0;

        doc.forEach((item)=>{
          total_count = total_count + 1;
          meusProdutos.push({
            id: item.id,
            nomeProduto: item.data().nomeProduto,
            precoProduto: item.data().precoProduto
          })
        });
        setOcorrencia(meusProdutos);
        setTotal(total_count);

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

        <i>Total: <strong>{total}</strong></i>

        <table>
          <thead>
            <tr>
              <th scope="col">Produtos cadastrados</th>
              <th scope="col">Preço</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {ocorrencia.map((item, index)=>{
              return(
                <tr key={index}>
                  <td data-label="Produto cadastrado">{item.nomeProduto}</td>
                  <td data-label="Preço">{item.precoProduto}</td>
                  <td data-label="#">
                    
                    <Link className="action" style={{backgroundColor: '#F6a935'}} to={`/produtos/${item.id}`}>
                      <FiEdit3 color="#fff" size={17}/>
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
    </div>
  )
}