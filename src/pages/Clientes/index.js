import '../style.css';
import { useState, useEffect } from 'react';
import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { toast } from 'react-toastify';

import ModalDetalhes from '../../components/ModalDetalhes/cliente';
import { FiArchive, FiX, FiSearch, FiArrowRight } from "react-icons/fi";
import { Link } from 'react-router-dom';

export default function Clientes(){
  const [ocorrencia, setOcorrencia] = useState([]);
  const [nomeCliente, setNomeCliente] = useState('');
  const [nomeSocial, setNomeSocial] = useState('');
  const [genero, setGenero] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataCpf, setDataCpf] = useState('');

  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

  const [formValue, setFormValue] = useState([{ rg: "" }])
  const [formValue2, setFormValue2] = useState([{ dataRg: "" }])
  
  const listRef = firebase.firestore().collection('Clientes');

  async function cadastrarCliente(e){
    e.preventDefault();

    if(nomeCliente === ''){
      toast.error('Você deve fornecer o nome do cliente!');
    }else{
      await listRef.add({
        nomeCliente: nomeCliente,
        nomeSocial: nomeSocial,
        genero: genero,
        telefone: telefone,
        cpf: cpf,
        dataCpf: dataCpf,
        rg: formValue,
        dataRg: formValue2
      });
      toast.success('Cliente cadastrado');
    }

    setNomeCliente('');
    setNomeSocial('');
    setGenero('');
    setTelefone('');
    setCpf('');
    setDataCpf('');
    setFormValue('');
    setFormValue2('');
  }

  useEffect(()=> {

    async function loadClientes(){
      await listRef
      .onSnapshot((doc)=>{
        let meusClientes = [];

        doc.forEach((item)=>{
          meusClientes.push({
            id: item.id,
            nomeCliente: item.data().nomeCliente
          })
        });

        setOcorrencia(meusClientes);

      });

    }

    loadClientes();
    
  }, []);

  async function excluirCliente(id){
    await listRef.doc(id)
    .delete()
    .then(()=>{
      toast.error('Cliente excluido!');
    });
  }

  function togglePostModal(item){
    setShowPostModal(!showPostModal);
    setDetail(item);
  }

  function handleChangeSelect(e){
    setGenero(e.target.value);
  }

  let handleChange = (i, e) => {
    let newFormValue = [...formValue];
    newFormValue[i][e.target.name] = e.target.value;
    setFormValue(newFormValue);
  }

  let addFormField = () => {
    setFormValue([...formValue, { rg: "" }])
  }

  let removeFormField = (i) => {
    let newFormValue = [...formValue];
    newFormValue.splice(i, 1);
    setFormValue(newFormValue)
  }

  let handleChange2 = (i, e) => {
    let newFormValue2 = [...formValue2];
    newFormValue2[i][e.target.name] = e.target.value;
    setFormValue2(newFormValue2);
  }

  let addFormField2 = () => {
    setFormValue2([...formValue2, { dataRg: "" }])
  }

  let removeFormField2 = (i) => {
    let newFormValue2 = [...formValue2];
    newFormValue2.splice(i, 1);
    setFormValue2(newFormValue2)
  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Cliente">
          <FiArchive color="#d48e90" size={25}/>
        </Title>

        <div className="container">
          <form className="forms">
            <label>Cadastrar Cliente:</label>
            <input type="text" placeholder="Nome do cliente" value={nomeCliente} onChange={ (e) => setNomeCliente(e.target.value) } />
            <input type="text" placeholder="Nome social" value={nomeSocial} onChange={ (e) => setNomeSocial(e.target.value) } />
            <select value={genero} onChange={handleChangeSelect}>
              <option value="escolha">Gênero</option>
              <option value="Feminino">Feminino</option>
              <option value="Masculino">Masculino</option>
            </select>
            <input type="text" placeholder="Telefone" value={telefone} onChange={ (e) => setTelefone(e.target.value) } />
            <input type="text" placeholder="CPF" value={cpf} onChange={ (e) => setCpf(e.target.value) } />
            <input type="text" placeholder="Data de emissão do CPF" value={dataCpf} onChange={ (e) => setDataCpf(e.target.value) } />
            {formValue.map((e, index) => (
            <>
              <div className='school' key={index}>
                <input placeholder='RG' name='rg' value={e.rg} onChange={e => handleChange(index, e)} />
                {index ?
                  <button type="button" className='del' onClick={() => removeFormField(index)}>Deletar</button>
                  : null}
              </div>
            </>
            ))}
            
            
            {formValue2.map((e, index) => (
            <>
              <div className='school' key={index}>
                <input placeholder='Data de emissão do RG' name='dataRg' value={e.dataRg} onChange={e => handleChange2(index, e)} />
                {index ?
                  <button type="button" className='del' onClick={() => removeFormField2(index)}>Deletar</button>
                  : null}
              </div>
            </>
            ))}
            
            <button className="add" type="button" onClick={() => addFormField()}>Adicionar mais um RG</button>
            <button className="add" type="button" onClick={() => addFormField2()}>Adicionar mais uma data de emissão do RG</button>

            <button className="submit" onClick={cadastrarCliente}>Cadastrar</button>
          </form>
        </div>

        <table>
          <thead>
            <tr>
              <th scope="col">Clientes cadastrados</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {ocorrencia.map((item, index)=>{
              return(
                <tr key={index}>
                  <td data-label="Cliente cadastrado">{item.nomeCliente}</td>
                  <td data-label="#">
                    <button className="action" style={{backgroundColor: '#3583f6'}} onClick={ () => togglePostModal(item) }>
                        <FiSearch color="#fff" size={17}/>
                    </button>

                    <Link className="action" style={{backgroundColor: '#F6a935'}} to={`/clientes/${item.id}`}>
                      <FiArrowRight color="#fff" size={17}/>
                    </Link>

                    <button className="action" style={{backgroundColor: '#f00'}} onClick={ () => excluirCliente(item.id) }>
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