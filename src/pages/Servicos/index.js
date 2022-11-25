import { useState, useEffect } from 'react';
import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { toast } from 'react-toastify';

import ModalDetalhes from '../../components/ModalDetalhes/servico';

import { FiArchive, FiX, FiSearch, FiArrowRight } from "react-icons/fi";

import { Link } from 'react-router-dom';

export default function Servicos(){
  const [ocorrencia, setOcorrencia] = useState([]);
  const [nomeServico, setNomeServico] = useState('');
  const [precoServico, setPrecoServico] = useState('');

  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();
  
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

        doc.forEach((item)=>{
          meusServicos.push({
            id: item.id,
            nomeServico: item.data().nomeServico,
            precoServico: item.data().precoServico
          })
        });

        setOcorrencia(meusServicos);

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

  function togglePostModal(item){
    setShowPostModal(!showPostModal);
    setDetail(item);
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

        <table>
          <thead>
            <tr>
              <th scope="col">Serviços cadastrados</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {ocorrencia.map((item, index)=>{
              return(
                <tr key={index}>
                  <td data-label="Serviço cadastrado">{item.nomeServico}</td>
                  <td data-label="#">
                    <button className="action" style={{backgroundColor: '#3583f6'}} onClick={ () => togglePostModal(item) }>
                        <FiSearch color="#fff" size={17}/>
                    </button>

                    <Link className="action" style={{backgroundColor: '#F6a935'}} to={`/servicos/${item.id}`}>
                      <FiArrowRight color="#fff" size={17}/>
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

      {showPostModal && (
        <ModalDetalhes
          conteudo={detail}
          close={togglePostModal}
        />
      )}

    </div>
  )
}