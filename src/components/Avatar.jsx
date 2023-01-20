import React from 'react'
import stringToColor from  'string-to-color';
import {Link} from 'react-router-dom';

const Avatar = ({usuario}) => {
    return (
        <div className="Avatar">
            <ImagenAvatar usuario={usuario} />
            <Link to={`/perfil/${usuario.username}`}>
                <h2>{usuario.username}</h2>
            </Link>
        </div>
    )
}

export default Avatar;

export const ImagenAvatar = ({usuario}) => {
    
    const style = {
        backgroundImage: usuario.imagen ? `url(${usuario.imagen})` : null,
        backgroundColor: stringToColor(usuario.username)
    };

    return <div className="Avatar__img" style={style}>
        {
            !usuario.imagen && usuario.username[0]
        }
    </div>

}
