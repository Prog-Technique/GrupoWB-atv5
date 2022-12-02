import { useState, useEffect } from 'react';
import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { toast } from 'react-toastify';

import { FiArchive, FiX, FiEdit3 } from "react-icons/fi";

import { Link } from 'react-router-dom';

export default function Servicos(){
  const [ocorrencia, setOcorrencia] = useState([]);
  const [nomeServico, setNomeServico] = useState('');
  const [precoServico, setPrecoServico] = useState('');

  const [total, setTotal] = useState();

  const listRef = firebase.firestore().collection('Servicos');

  async function cadastrarServico(e){
    e.preventDefault();

    if(nomeServico === ''){
      toast.error('Você deve fornecer o nome do serviço!');
    }else{
      await listRef.add({
        nomeServico: nomeServico,
        precoServico: precoServico
      });
      toast.success('Serviço cadastrado!');
    }

    setNomeServico('');
    setPrecoServico('');
  }

  useEffect(()=> {

    async function loadServicos(){
      await listRef
      .onSnapshot((doc)=>{
        let meusServicos = [];
        let total_count = 0;

        doc.forEach((item)=>{
          total_count = total_count + 1;
          meusServicos.push({
            id: item.id,
            nomeServico: item.data().nomeServico,
            precoServico: item.data().precoServico
          })
        });
        setOcorrencia(meusServicos);
        setTotal(total_count);

      });

    }

    loadServicos();
    
  }, []);

  async function excluirServico(id){
    await listRef.doc(id)
    .delete()
    .then(()=>{
      toast.error('Serviço excluido!');
    });
  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Serviço">
          <FiArchive color="#d48e90" size={25}/>
        </Title>

        <div className="container">
          <form className="forms">
            <label>Cadastrar Serviço:</label>
            <input type="text" placeholder="Nome do serviço" value={nomeServico} onChange={ (e) => setNomeServico(e.target.value) } />
            <input type="text" placeholder="Preço do serviço" value={precoServico} onChange={ (e) => setPrecoServico(e.target.value) } />
            <button className='submit' onClick={cadastrarServico}>Cadastrar</button>
          </form>
        </div>

        <i>Total: <strong>{total}</strong></i>

        <table>
          <thead>
            <tr>
              <th scope="col">Serviços cadastrados</th>
              <th scope="col">Preço</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {ocorrencia.map((item, index)=>{
              return(
                <tr key={index}>
                  <td data-label="Serviço cadastrado">{item.nomeServico}</td>
                  <td data-label="Preço">{item.precoServico}</td>
                  <td data-label="#">
                    
                    <Link className="action" style={{backgroundColor: '#F6a935'}} to={`/servicos/${item.id}`}>
                      <FiEdit3 color="#fff" size={17}/>
                    </Link>

                    <button className="action" style={{backgroundColor: '#f00'}} onClick={ () => excluirServico(item.id) }>
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