import { useState, useEffect } from 'react';
import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { toast } from 'react-toastify';

import { FiArchive, FiPlus } from "react-icons/fi";

export default function Servicos(){
  const [ocorrencia, setOcorrencia] = useState([]);
  
  const listRef = firebase.firestore().collection('Servicos');

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

  async function adicionarProduto(e){
    
    toast.success('Produto adicionado');
  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name=" Adicionar Serviço">
          <FiArchive color="#d48e90" size={25}/>
        </Title>

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
                    
                    <button className="action" style={{backgroundColor: '#32CD32'}} onClick={ () => adicionarProduto(item.id) }>
                        <FiPlus color="#fff" size={17}/>
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