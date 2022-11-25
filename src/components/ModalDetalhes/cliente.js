import './modal.css';

import { FiArrowLeft } from 'react-icons/fi';

export default function ModalDetalhes({conteudo, close}){
    return(
        <div className="modal">
            <div className="container">
                <button className="close" onClick={ close }>
                    <FiArrowLeft color="#000" size={25}/>
                </button>

                <div>
                    <h2>Dados do cliente</h2>

                    <div className="row">
                        <span>
                            Nome: <a>{conteudo.nomeCliente}</a>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Nome social: <a>{conteudo.nomeSocial}</a>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Gênero: <a>{conteudo.genero}</a>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Telefone: <a>{conteudo.telefone}</a>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            CPF: <a>{conteudo.cpf}</a>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Data de emissão do CPF: <a>{conteudo.dataCpf}</a>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            RG: <a>{conteudo.rg}</a>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Data de emissão do RG: <a>{conteudo.dataRg}</a>
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}