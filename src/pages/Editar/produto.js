import { useState, useEffect } from 'react';
import firebase from '../../services/firebaseConnection';
import { useHistory, useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { toast } from 'react-toastify';

import { FiEdit } from 'react-icons/fi';

export default function Produto(){
  const { id } = useParams();
  const history = useHistory();

  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [idProduto, setIdProduto] = useState(false);

  useEffect(()=> {
    async function loadProdutos(){
      await firebase.firestore().collection('Produtos')
      .get()
      .then((snapshot)=>{
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nomeProduto: doc.data().nomeProduto,
            precoProduto: doc.data().precoProduto
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

    loadProdutos();
  }, [id]);

  async function loadId(lista){
    await firebase.firestore().collection('Produtos').doc(id)
    .get()
    .then((snapshot) => {
      setNomeProduto(snapshot.data().nomeProduto);
      setPrecoProduto(snapshot.data().precoProduto);
      setIdProduto(true);
    })
    .catch((err)=>{
      console.log('ERRO NO ID PASSADO: ', err);
      setIdProduto(false);
    })
  }

  async function handleRegister(e){
    e.preventDefault();

    if(idProduto){
      await firebase.firestore().collection('Produtos')
      .doc(id)
      .update({
        nomeProduto: nomeProduto,
        precoProduto: precoProduto
      })
      .then(()=>{
        toast.success('Produto editado com sucesso!');
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
          <FiEdit color="#ecafb1" size={25}/>
        </Title>

        <div className="container">

          <form className="forms" onSubmit={handleRegister} >
            
            <label>Produto</label>
            <input
              type="text"
              value={nomeProduto}
              onChange={ (e) => setNomeProduto(e.target.value) }
            />

            <input
              type="text"
              value={precoProduto}
              onChange={ (e) => setPrecoProduto(e.target.value) }
            />

            <button type="submit" className="buttons" >Salvar</button>

          </form>
          
        </div>

      </div>
    </div>
  )
}