import React, { useState } from "react";
import Main from "../../components/Main";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Upload = ({ mostrarError }) => {
  const [imagenUrl, setImagenUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [enviandoPost, setEnviandoPost] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (enviandoPost) {
      return;
    }

    if (subiendoImagen) {
      mostrarError("No se ah terminado de subir la imagen");
    }

    if (!imagenUrl) {
      mostrarError("Seleccione una imagen");
    }

    setEnviandoPost(true);

    try {
      const response = await Axios.post(
        process.env.REACT_APP_URL_BACKEND + "/api/posts",
        {
          url: imagenUrl,
          caption: caption,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log(response);
      history.push("/");
    } catch (error) {
      setEnviandoPost(false);
      // console.log(error);
      mostrarError(error.response.data);
    }
  };

  const handleImagenSeleccionada = async ({ target }) => {
    try {
      setSubiendoImagen(true);

      const { files } = target;

      const file = files[0]; //first file

      const response = await Axios.post(
        process.env.REACT_APP_URL_BACKEND + "/api/posts/upload",
        file,
        {
          headers: {
            "Content-type": file.type,
          },
        }
      );

      setImagenUrl(response.data.url);

      // console.log(files);
      // console.log(response);
    } catch (error) {
      mostrarError(error.response.data);
    } finally {
      setSubiendoImagen(false);
    }
  };

  return (
    <Main center>
      <div className="Upload">
        <form onSubmit={handleSubmit}>
          <div className="Upload__image-section">
            <SeccionSubirImagen
              imagenUrl={imagenUrl}
              subiendoImagen={subiendoImagen}
              handleImagenSeleccionada={handleImagenSeleccionada}
            />
          </div>
          <textarea
            name="caption"
            className="Upload__caption"
            required
            maxLength="180"
            placeholder="Caption de tu post."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button
            className={`Upload__submit ${enviandoPost && "btn--disabled"}`}
            type="submit"
          >
            Post
          </button>
        </form>
      </div>
    </Main>
  );
};

export default Upload;

const SeccionSubirImagen = ({
  subiendoImagen,
  imagenUrl,
  handleImagenSeleccionada,
}) => {
  if (subiendoImagen) {
    return <Loading />;
  } else if (imagenUrl) {
    return <img src={imagenUrl} alt="" />;
  } else {
    return (
      <label className="Upload__image-label">
        <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
        <span>Publica una foto</span>
        <input
          type="file"
          className="hidden"
          name="imagen"
          onChange={handleImagenSeleccionada}
        />
      </label>
    );
  }
};
