import './header.css';
import logo from '../../assets/logo.png';

import { Link } from 'react-router-dom';
import { MdPeopleOutline, MdAccountCircle } from "react-icons/md";
import { FiHome, FiArchive, FiClipboard } from "react-icons/fi";

export default function Header(){

    return(
        <div className="sidebar">
            <div>
                <img src={logo} alt="WB logo"/>
            </div>

            <Link to="/dashboard">
                <FiHome color="#fff" size={25}/>
                Início
            </Link>

            <Link to="/clientes">
                <MdPeopleOutline color="#fff" size={25}/>
                Cliente
            </Link>

            <Link to="/produtos">
                <FiArchive color="#fff" size={25}/>
                Produtos
            </Link>

            <Link to="/servicos">
                <FiClipboard color="#fff" size={25}/>
                Serviços
            </Link>

            <Link to="/profile">
                <MdAccountCircle color="#fff" size={25}/>
                Conta
            </Link>
        </div>
    )
}