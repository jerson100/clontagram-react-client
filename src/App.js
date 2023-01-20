import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
// import Singup from './vistas/Signup';
import Login from "./vistas/Login";
import Axios from "axios";
import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors,
} from "./helpers/auth-helpers";
import Loading from "./components/Loading";
import Main from "./components/Main";
import PostDetalle from "./vistas/PostDetalle";

import Signup from "./vistas/Signup";
import Upload from "./vistas/Upload/Upload";
// import Error404 from './vistas/Error404';
import Error from "./components/Error";
import Feed from "./vistas/Feed";
import Explore from "./vistas/Explore";
import Perfil from "./vistas/Perfil";

initAxiosInterceptors();

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setcargandoUsuario] = useState(true);
  const [error, setError] = useState(null);

  const mostrarError = useCallback((mensaje) => {
    // mostrarErrorC(mensaje);
    if (mensaje && mensaje.message) {
      setError(mensaje.message);
    } else {
      setError(mensaje);
    }
  }, []);

  useEffect(() => {
    const cargarUsuario = async () => {
      if (!getToken()) {
        setcargandoUsuario(false);
        return;
      }
      try {
        const { data: usuario } = await Axios.get(
          process.env.REACT_APP_URL_BACKEND + "/api/usuarios/whoami"
        );
        setUsuario(usuario);
        setcargandoUsuario(false);
      } catch (e) {
        console.log(e);
        mostrarError("Usuario y/o contraseña incorrecto");
      }
    };

    cargarUsuario();
  }, [mostrarError]);

  const login = async (email, password) => {
    const { data } = await Axios.post(
      process.env.REACT_APP_URL_BACKEND + "/api/usuarios/login",
      {
        email,
        password,
      }
    );

    setUsuario(data.usuario);
    setToken(data.token);
    console.log(data);
  };

  const signup = async (usuario) => {
    const { data } = await Axios.post(
      process.env.REACT_APP_URL_BACKEND + "/api/usuarios/signup",
      usuario
    );

    setUsuario(data.usuario);
    setToken(data.token);
  };

  // const logout = () => {
  //     setUsuario(null);
  //     deleteToken();
  // };

  //   const mostrarErrorC = (mensaje) => {
  //     if (mensaje && mensaje.message) {
  //       setError(mensaje.message);
  //     } else {
  //       setError(mensaje);
  //     }
  //   };

  const esconderError = useCallback(() => {
    setError(null);
  }, []);

  if (cargandoUsuario) {
    return (
      <>
        {/* <Nav /> */}
        <Main center={true}>
          <Loading />
        </Main>
      </>
    );
  }

  function logout() {
    setUsuario(null);
    deleteToken();
  }

  return (
    <>
      <Router>
        <Nav usuario={usuario} />
        <Error mensaje={error} esconderError={esconderError} />
        {usuario ? (
          <LoginRoutes
            mostrarError={mostrarError}
            usuario={usuario}
            logout={logout}
          />
        ) : (
          <LogoutRoutes
            login={login}
            signup={signup}
            mostrarError={mostrarError}
          />
        )}
      </Router>
    </>
  );
}

/*
    Para rutas authenticadas
*/
const LoginRoutes = ({ mostrarError, usuario, logout }) => {
  return (
    <Switch>
      <Route
        path="/upload"
        render={(props) => <Upload {...props} mostrarError={mostrarError} />}
      />
      <Route
        path="/posts/:id"
        render={(props) => (
          <PostDetalle
            {...props}
            mostrarError={mostrarError}
            usuario={usuario}
          />
        )}
      />
      <Route
        path="/perfil/:username"
        render={(props) => (
          <Perfil
            {...props}
            mostrarError={mostrarError}
            usuario={usuario}
            logout={logout}
          />
        )}
      />
      <Route
        path="/explore"
        render={(props) => <Explore {...props} mostrarError={mostrarError} />}
      />
      <Route
        path="/"
        render={(props) => (
          <Feed {...props} mostrarError={mostrarError} usuario={usuario} />
        )}
      />
      {/* <Route 
                path="/"
                component={Error404}
            /> */}
    </Switch>
  );
};

/*
    Cuando usar component
    y cuando usar render
    Component: Lo usamos cuando queremos mostrar un componente para una ruta, 
    pero a esta no le podemos pasar los props
    render: Cumple la misma función que el component pero además nos permite pasar los props al componente a renderizar para tal url
    {...props} son las props que inyecta react-router
*/
const LogoutRoutes = ({ login, signup, mostrarError }) => {
  return (
    <Switch>
      <Route
        path="/login"
        render={(props) => (
          <Login {...props} login={login} mostrarError={mostrarError} />
        )}
      />
      <Route
        render={(props) => (
          <Signup {...props} signup={signup} mostrarError={mostrarError} />
        )}
        default
      />
    </Switch>
  );
};
