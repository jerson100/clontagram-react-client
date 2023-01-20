import Axios from "axios";
// const URL = "localhost:3000/api";

export const getPost = async (fechaUltimoPost = null) => {
  // const config = {
  //     headers:  {
  //         'Content-type': 'application/json'
  //     }
  // };
  const query = fechaUltimoPost ? `?fecha=${fechaUltimoPost}` : "";
  const response = await Axios.get(
    process.env.REACT_APP_URL_BACKEND + `/api/posts/feed${query}`
  );

  return response.data;
};

export const getDetallePost = async (idPost) => {
  const detalle = await Axios.get(
    process.env.REACT_APP_URL_BACKEND + `/api/posts/${idPost}`,
    {}
  );

  return detalle.data;
};

export const comentar = async (post, mensaje, usuario) => {
  const url =
    process.env.REACT_APP_URL_BACKEND + `/api/posts/${post._id}/comentarios`;

  const { data: nuevoComentario } = await Axios.post(url, { mensaje });

  nuevoComentario.usuario = usuario;

  const postConComentarioActualizado = {
    ...post,
    comentarios: [...post.comentarios, nuevoComentario],
    numComentarios: post.numComentarios + 1,
  };

  return postConComentarioActualizado;
};
