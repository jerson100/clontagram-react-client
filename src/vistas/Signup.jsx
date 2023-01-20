import React, {useState} from 'react';

// import Axios from 'axios';

import Main from '../components/Main';
import imagenSignup from '../imagenes/signup.png';
import { Link } from 'react-router-dom';

const Signup = ({signup, mostrarError}) => {

    const [usuario, setusuario] = useState({
        email: '',
        username: '',
        password:'',
        bio: '',
        nombre: ''
    });

    const handleInputChange = (e) => {

        setusuario({
            ...usuario,
            [e.target.name] : e.target.value
        })

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            signup(usuario);
        }catch(e){
            mostrarError(e.response.data);
        }
    }

    return (
        <Main center={true}>
            <div className="Signup">
                <img src={imagenSignup} alt="Logo" className="Signup__img"/>
                <div className="FormContainer">
                    <h1 className="Form__titulo">Clontagram</h1>
                    <p className="FormContainer__info">
                        Regístrate para que veas el Clon de Instagram
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input type="email"
                            name="email"
                            placeholder="Email" 
                            className="Form__field" 
                            required
                            onChange={handleInputChange}
                            value={usuario.email}
                        />
                        <input type="text"
                            name="nombre"
                            placeholder="Nombre y apellido" 
                            className="Form__field" 
                            required
                            minLength="3"
                            maxLength="100"
                            onChange={handleInputChange}
                            value={usuario.nombre}
                        />
                        <input type="text"
                            name="username"
                            placeholder="Username" 
                            className="Form__field" 
                            required
                            minLength="3"
                            maxLength="30"
                            onChange={handleInputChange}
                            value={usuario.username}
                        />
                        <input type="text"
                            name="bio"
                            placeholder="Cuentanos de ti..." 
                            className="Form__field" 
                            required
                            maxLength="150"
                            onChange={handleInputChange}
                            value={usuario.bio}
                        />
                        <input type="password"
                            name="password"
                            placeholder="Password" 
                            className="Form__field" 
                            required
                            onChange={handleInputChange}
                            value={usuario.password}
                        />
                        <button 
                            className="Form__submit"
                            type="submit"
                        >Signup</button>
                        <p className="FormContainer__info">
                            Ya tienes cuenta? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </Main>
    )
}

export default Signup
