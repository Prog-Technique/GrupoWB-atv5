import './profile.css';
import { useState, useContext} from 'react';
import firebase from '../../services/firebaseConnection';

import { AuthContext } from '../../contexts/auth';

import Header from '../../components/Header';
import Title from '../../components/Title';
import logo from '../../assets/logo.png';

import { MdAccountCircle } from "react-icons/md";

export default function Profile(){
    
    const { user, signOut } = useContext(AuthContext);

    const [email] = useState(user && user.email);

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Minha Conta">
                <MdAccountCircle color="#ecafb1" size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile">
                        <label className="label-logo">
                            <img src={logo} alt="Univap logo" width="250"/>
                        </label>

                        <label>Email</label>
                        <input type="text" value={email} disabled={true} />
                    </form>
                </div>

                <div className="container">
                    <button className="logout-btn" onClick={ () => signOut()}>
                        Sair
                    </button>
                </div>

            </div>
        </div>
    )
}