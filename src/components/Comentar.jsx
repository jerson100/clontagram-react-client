import React, { useState } from 'react'

const Comentar = ({onSubmitComentario, mostrarError}) => {
    
    const [mensaje, setMensaje] = useState('');
    const [enviandoComentario, setEnviandoComentario] =  useState(false);

    const onSubmit = async (e) => {

        e.preventDefault();

        if(enviandoComentario){
            return;
        }

        try{
            setEnviandoComentario(true);
            await onSubmitComentario(mensaje);
        }catch(e){
            mostrarError("No se pudo realizar el comentario...")
            console.log(e);
        }finally{
            setEnviandoComentario(false);
        }

    };

    return (
        <form className="Post__comentario-form-container" onSubmit={onSubmit}>
            <input 
                type="text"
                placeholder="Deja un comentario"
                required
                maxLength="180"
                value={mensaje}
                onChange={e=>setMensaje(e.target.value)}
            />
            <button type="submit">Post</button>
        </form>
    )
}

export default Comentar
