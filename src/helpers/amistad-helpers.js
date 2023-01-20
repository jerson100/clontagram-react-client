import Axios from "axios";

export default async function toggleSiguiendo(usuario) {
  let usuarioActualizado;

  if (usuario.siguiendo) {
    await Axios.delete(
      process.env.REACT_APP_URL_BACKEND +
        `/api/amistades/${usuario._id}/eliminar`
    );
    usuarioActualizado = {
      ...usuario,
      numSeguidores: usuario.numSeguidores - 1,
      siguiendo: false,
    };
  } else {
    await Axios.post(
      process.env.REACT_APP_URL_BACKEND + `/api/amistades/${usuario._id}/seguir`
    );
    usuarioActualizado = {
      ...usuario,
      numSeguidores: usuario.numSeguidores + 1,
      siguiendo: true,
    };
  }

  return usuarioActualizado;
}
