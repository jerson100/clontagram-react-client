import React, { useState } from 'react'
import Main from '../components/Main';
import Loading from '../components/Loading';
import Avatar from '../components/Avatar';
import Comentar from '../components/Comentar';
import BotonLike from '../components/BotonLike';
// import {Link} from 'react-router-dom';
import {usePostDetalle} from '../hooks/usePostDetalle';
import RecursoNoExiste from '../components/RecursoNoExiste';
import { Link } from 'react-router-dom';
import { comentar } from '../services/posts';
import { toogleLike } from '../services/like';

const PostDetalle = ({mostrarError, match, usuario}) => {
    
    const postId = match.params.id;//el id del param
    
    const {loading, post, setPost, isExistsPost} = usePostDetalle(postId, mostrarError);

    const [enviandoLike, setEnviandoLike] = useState(false);
    
    
    if(loading){

        return (
            <Main center>
                <Loading />
            </Main>
        )

    }

    if(isExistsPost){
        return (
            <RecursoNoExiste 
                mensaje={"El recurso no existe"}
            />
        )
        
    }

    if(post === null){
        return null;
    }

    const onSubmitComentario = async (comentario) => {
        const updatedCommentsPost = await comentar(post, comentario, usuario);
        setPost(updatedCommentsPost);
    };

    const onSubmitLike = async () => {
        if(enviandoLike){
            return;
        }
        try{
            setEnviandoLike(true);
            const updateC = await toogleLike(post);
            setPost(updateC);
        }catch(e){
            mostrarError("Hubo un problema modificando el like. Intentelo nuevamente.");
        }finally{
            setEnviandoLike(false);
        }
    };

    return (
        <Main center>
            <PostCard 
                {...post}
                onSubmitComentario={onSubmitComentario}
                onSubmitLike={onSubmitLike}
            />
        </Main>
    )
}

export default PostDetalle

const PostCard = ({
    comentarios,
    caption,
    url,
    usuario,
    estaLike,
    onSubmitLike,
    onSubmitComentario
}) => {
    return (
        <div className="Post">
            <div className="Post__image-container">
                <img src={url} alt={caption}/>
            </div>
            <div className="Post__side-bar">
                <Avatar usuario={usuario}/>
                <div className="Post__comentarios-y-like">
                    <Comentarios 
                        usuario={usuario}
                        caption={caption}
                        comentarios={comentarios}
                    />
                    <div className="Post__like">
                        <BotonLike
                            onSubmitLike={onSubmitLike}
                            like={estaLike}
                        ></BotonLike>
                    </div>
                    <Comentar 
                        onSubmitComentario={onSubmitComentario}
                    />
                </div>
            </div>
        </div>
    )
};

const Comentarios = ({usuario, caption, comentarios}) => {
    
    return (
        <ul className="Post__comentarios">
            <li className="Post__comentario">
                <Link
                    to={`/perfil/${usuario.username}`}
                    className="Post__autor-comentario"
                >
                    <b>{usuario.username}</b> 
                </Link>{' '}
                {caption}
            </li>
            {
                comentarios.map(comentario=>(
                    <li key={comentario._id} className="Post__comentario">
                        <Link
                            to={`/perfil/${usuario.username}`}
                            className="Post__autor-comentario"
                        >
                         <b>{comentario.usuario.username}</b>  
                        </Link>{' '}
                        {comentario.mensaje} 
                    </li>
                ))
            }
        </ul>
    );

};