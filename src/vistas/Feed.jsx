import React from "react";
// import Axios from 'axios';
import Main from "../components/Main";
import Loading from "../components/Loading";
import { usePost } from "../hooks/usePost";
import Post from "../components/Post";
import { getPost } from "../services/posts";

const Feed = ({ mostrarError, usuario }) => {
  const {
    posts,
    setPosts,
    loading,
    cargandoMasPost,
    setCargandoMasPost,
    todosLosPostCargados,
  } = usePost({ mostrarError });

  if (loading) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }

  const actualizarPost = (postActual, postActualizado) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post === postActual) {
          return postActualizado;
        }
        return post;
      })
    );
  };

  const cargarMasPost = async () => {
    if (cargandoMasPost) {
      return;
    }

    try {
      setCargandoMasPost(true);
      const fechaUltimoPost = posts[posts.length - 1].fecha_creado;
      const nuevosPosts = await getPost(fechaUltimoPost);
      setPosts((oldPosts) => [...oldPosts, ...nuevosPosts]);
    } catch (e) {
      console.log(e);
      mostrarError("Ocurrió un error al cargar más posts");
    } finally {
      setCargandoMasPost(false);
    }
  };

  // if(true){
  //     return (
  //         <Main center>
  //             <NosiguesANadie />
  //         </Main>
  //     )
  // }
  // console.log(posts);

  return (
    <Main>
      <div className="Feed">
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            actualizarPost={actualizarPost}
            mostrarError={mostrarError}
            usuario={usuario}
          />
        ))}
      </div>
      <CargarMasPosts
        onClick={cargarMasPost}
        todosLosPostCargados={todosLosPostCargados}
      />
    </Main>
  );
};

export default Feed;

// const NosiguesANadie = () => {

//     return (
//         <div className="NoSiguesANadie">
//             <p className="NoSiguesANadie__mensaje">
//                 Tu feed no tiene fotos porque no sigues a nadie o no han publicado fotos.
//             </p>
//             <div className="text-center">
//                 <Link to="/explore" className="NoSiguesANadie__boton">
//                     Explora Clontagram
//                 </Link>
//             </div>
//         </div>
//     )

// };

const CargarMasPosts = ({ onClick, todosLosPostCargados }) => {
  if (todosLosPostCargados) {
    return <div className="Feed__no-hay-mas-posts">No hay más posts</div>;
  }

  return (
    <button className="Feed__cargar-mas" onClick={onClick}>
      Ver más
    </button>
  );
};
