import Axios from "axios";

export const toogleLike = async (post) => {
  const { estaLike, _id, numLikes } = post;

  const url = process.env.REACT_APP_URL_BACKEND + `/api/posts/${_id}/likes`;

  let postConLikeActualizado;

  if (estaLike) {
    await Axios.delete(url, {});

    postConLikeActualizado = {
      ...post,
      estaLike: false,
      numLikes: numLikes - 1,
    };
  } else {
    await Axios.post(url, {});

    postConLikeActualizado = {
      ...post,
      estaLike: true,
      numLikes: numLikes + 1,
    };
  }

  return postConLikeActualizado;
};
