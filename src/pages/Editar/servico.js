import { useState, useEffect } from 'react';
import firebase from '../../services/firebaseConnection';
import { useHistory, useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { toast } from 'react-toastify';

import { FiHome } from 'react-icons/fi';

export default function Servico(){
  const { id } = useParams();
  const history = useHistory();

  const [nomeServico, setNomeServico] = useState('');
  const [precoServico, setPrecoServico] = useState('');
  const [idServico, setIdServico] = useState(false);

  useEffect(()=> {
    async function loadServicos(){
      await firebase.firestore().collection('Servicos')
      .get()
      .then((snapshot)=>{
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nomeServico: doc.data().nomeServico,
            precoServico: doc.data().precoServico
          })
        })

        if(id){
          loadId(lista);
        }

      })
      .catch((error)=>{
        console.log('DEU ALGUM ERRO!', error);
      })

    }

    loadServicos();
  }, [id]);

  async function loadId(lista){
    await firebase.firestore().collection('Servicos').doc(id)
    .get()
    .then((snapshot) => {
      setNomeServico(snapshot.data().nomeServico);
      setPrecoServico(snapshot.data().precoServico);
      setIdServico(true);
    })
    .catch((err)=>{
      console.log('ERRO NO ID PASSADO: ', err);
      setIdServico(false);
    })
  }

  async function handleRegister(e){
    e.preventDefault();

    if(idServico){
      await firebase.firestore().collection('Servicos')
      .doc(id)
      .update({
        nomeServico: nomeServico,
        precoServico: precoServico
      })
      .then(()=>{
        toast.success('Serviço editado com sucesso!');
        history.push('/dashboard');
      })
      .catch((err)=>{
        toast.error('Ops erro ao registrar, tente mais tarde.');
      })

      return;
    }

  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Editar">
          <FiHome color="#ecafb1" size={25}/>
        </Title>

        <div className="container">

          <form className="forms" onSubmit={handleRegister} >
            
            <label>Serviço</label>
            <input
              type="text"
              value={nomeServico}
              onChange={ (e) => setNomeServico(e.target.value) }
            />

            <input
              type="text"
              value={precoServico}
              onChange={ (e) => setPrecoServico(e.target.value) }
            />

            <button type="submit" className="buttons" >Salvar</button>

          </form>
          
        </div>

      </div>
    </div>
  )
}