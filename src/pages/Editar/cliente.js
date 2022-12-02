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

  const [nomeCliente, setNomeCliente] = useState('');
  const [nomeSocial, setNomeSocial] = useState('');
  const [genero, setGenero] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataCpf, setDataCpf] = useState('');
  const [formValue, setFormValue] = useState([{ rg: "" }])
  const [formValue2, setFormValue2] = useState([{ dataRg: "" }])
  const [idCliente, setIdCliente] = useState(false);

  useEffect(()=> {
    async function loadClientes(){
      await firebase.firestore().collection('Clientes')
      .get()
      .then((snapshot)=>{
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nomeCliente: doc.data().nomeCliente,
            nomeSocial: doc.data().nomeSocial,
            genero: doc.data().genero,
            telefone: doc.data().telefone,
            cpf: doc.data().cpf,
            dataCpf: doc.data().dataCpf,
            rg: doc.data().formValue,
            dataRg: doc.data().formValue2
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

    loadClientes();
  }, [id]);

  async function loadId(lista){
    await firebase.firestore().collection('Clientes').doc(id)
    .get()
    .then((snapshot) => {
      setNomeCliente(snapshot.data().nomeCliente);
      setNomeSocial(snapshot.data().nomeSocial);
      setGenero(snapshot.data().genero);
      setTelefone(snapshot.data().telefone);
      setCpf(snapshot.data().cpf);
      setDataCpf(snapshot.data().dataCpf);
      setFormValue(snapshot.data().rg);
      setFormValue2(snapshot.data().dataRg);
      setIdCliente(true);
    })
    .catch((err)=>{
      console.log('ERRO NO ID PASSADO: ', err);
      setIdCliente(false);
    })
  }

  async function handleRegister(e){
    e.preventDefault();

    if(idCliente){
      await firebase.firestore().collection('Clientes')
      .doc(id)
      .update({
        nomeCliente: nomeCliente,
        nomeSocial: nomeSocial,
        genero: genero,
        telefone: telefone,
        cpf: cpf,
        dataCpf: dataCpf,
        rg: formValue,
        dataRg: formValue2
      })
      .then(()=>{
        toast.success('Cliente editado com sucesso!');
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
            
            <label>Cliente</label>
            <input
              type="text"
              value={nomeCliente}
              onChange={ (e) => setNomeCliente(e.target.value) }
            />

            <input
              type="text"
              value={nomeSocial}
              onChange={ (e) => setNomeSocial(e.target.value) }
            />

            <input
              type="text"
              value={genero}
              onChange={ (e) => setGenero(e.target.value) }
            />

            <input
              type="text"
              value={telefone}
              onChange={ (e) => setTelefone(e.target.value) }
            />

            <input
              type="text"
              value={cpf}
              onChange={ (e) => setCpf(e.target.value) }
            />

            <input
              type="text"
              value={dataCpf}
              onChange={ (e) => setDataCpf(e.target.value) }
            />

            <input
              type="text"
              value={formValue}
              onChange={ (e) => setFormValue(e.target.value) }
            />

            <input
              type="text"
              value={formValue2}
              onChange={ (e) => setFormValue2(e.target.value) }
            />

            <button type="submit" className="buttons" >Salvar</button>

          </form>
          
        </div>

      </div>
    </div>
  )
}