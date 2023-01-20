import React, { useState } from 'react';
import Avatar from './Avatar';
import BotonLike from './BotonLike';
import { Link } from 'react-router-dom';
import Comentar from './Comentar';
import { toogleLike } from '../services/like';
import { comentar } from '../services/posts';

const Post = ({post, actualizarPost, mostrarError, usuario}) => {
    
    const {
        numLikes,
        numComentarios,
        comentarios,
        _id,
        caption,
        url,
        usuario:usuarioPost,
        estaLike
    } = post;

    const [enviandolike, setenviandolike] = useState(false);
    

    const onSubmitComentario = async (comentario) => {
        
        const updatedCommentsPost = await comentar(post, comentario, usuario);
        console.log(updatedCommentsPost);
        
        actualizarPost(post, updatedCommentsPost);

    };

    const onSubmitLike = async () => {

        if(enviandolike){
            return;
        }

        try{
            
            setenviandolike(true);

            const updatedPost = await toogleLike(post);   

            actualizarPost(post, updatedPost);

        }catch(e){
            mostrarError('Hubo un problema modificando el like. Intenta de nuevo.');
            console.log(e);
        } finally{

            setenviandolike(false);

        }

    };

    return (
        <div className="Post-Componente">
            <Avatar usuario={usuarioPost}/>
            <img src={url} alt={caption} className="Post-Componente__img"/>
            <div className="Post-Componente__acciones">
                <div className="Post-Componente__like-container">
                    <BotonLike 
                        onSubmitLike={onSubmitLike} 
                        like={estaLike} 
                    />
                </div>
                <p>Likedo por {numLikes} personas</p>
                <ul>
                    <li>
                        <Link to={`/perfil/${usuarioPost.username}`}>
                            <b>{usuarioPost.username}</b>
                        </Link>{' '}    
                        {caption}
                    </li>
                    <VerTodosLosComentarios 
                        _id={_id} 
                        numComentarios={numComentarios}
                    />
                    <Comentarios 
                        comentarios={comentarios}
                    />
                </ul>
            </div>
            <Comentar 
                onSubmitComentario={onSubmitComentario}
            />
        </div>
    )
}

export default Post;

const VerTodosLosComentarios = ({_id, numComentarios}) => {

    if(numComentarios < 4){
        return null;
    }

    return <li className="text-grey-dark">
        <Link to={`/posts/${_id}`}>
            Ver los {numComentarios} comentarios
        </Link>
    </li>

};

const Comentarios = ({comentarios}) => {

    if(comentarios.length  === 0){
        return null;
    }

    if(comentarios.length > 3){

        const comments = comentarios.filter((c,i)=>i < 3);

        return comments.map((c) => (
            <li key={c._id}>
                <Link to={`/perfil/${c.usuario.username}`}>
                    <b>{c.usuario.username}</b>
                </Link>{" "}
                {
                    c.mensaje
                }
            </li>
        ));

    }

    return comentarios.map((c) => (
        <li key={c._id}>
            <Link to={`/perfil/${c.usuario.username}`}>
                <b>{c.usuario.username}</b>
            </Link>{" "}
            {
                c.mensaje
            }
        </li>
    ));

};

