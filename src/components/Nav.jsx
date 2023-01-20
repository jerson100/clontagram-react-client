import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons' ;
import { faCompass, faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const Nav = ({usuario}) => {
    return (
        <nav className="Nav">
            <ul className="Nav__links">
                <li>
                    <Link to="/" className="Nav__link">
                        Clontagram
                    </Link>
                </li>
                {
                    usuario && <LoginRoutes usuario={usuario}/>
                }
            </ul>
        </nav>
    )
}

export default Nav;


const LoginRoutes = ({usuario}) => {
    return (
        <>
            <li className="Nav__link-push">
                <Link to="/upload" className="Nav__link">
                    <FontAwesomeIcon icon={faCameraRetro}></FontAwesomeIcon>
                </Link>
            </li>
            <li className="Nav__link-margin-left">
                <Link className="Nav__link" to="/explore">
                <FontAwesomeIcon icon={faCompass} />
                </Link>
            </li>
            <li className="Nav__link-margin-left">
                <Link className="Nav__link" to={`/perfil/${usuario.username}`}>
                <FontAwesomeIcon icon={faUser} />
                </Link>
            </li>
        </>
    )
};