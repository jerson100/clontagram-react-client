import Axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Main from "../components/Main";
import { ImagenAvatar } from "../components/Avatar";
import { Link } from "react-router-dom";
import Grid from "../components/Grid";

const Explore = ({ mostrarError }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const getPostAndUser = async () => {
      setloading(true);

      try {
        const [posts, usuarios] = await Promise.all([
          Axios.get("/api/posts/explore").then(({ data }) => data),
          Axios.get("/api/usuarios/explore").then(({ data }) => data),
        ]);
        setPosts(posts);
        setUsuarios(usuarios);
      } catch (e) {
        mostrarError(
          "Hubo un problema cargando explore. Por favor refresca la página."
        );
        console.log(e);
      } finally {
        setloading(false);
      }
    };
    getPostAndUser();
  }, [mostrarError]);

  if (loading) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }

  return (
    <Main center>
      <div className="Explore__section">
        <h2 className="Explore__title">Descubrir usuarios</h2>
        <div className="Explore__usuarios-container">
          {usuarios.map((usuario) => {
            return (
              <div className="Explore__usuario" key={usuario._id}>
                <ImagenAvatar usuario={usuario} />
                <p>{usuario.username}</p>
                <Link to={`/perfil/${usuario.username}`}>Ver perfil</Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="Explore__section">
        <h2 className="Explore__title">Explorar</h2>
        <Grid posts={posts} />
      </div>
    </Main>
  );
};

export default Explore;
