/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CSS/styles.css";
import vtv from "./logo-vtv-transparente.png";
const urlApi = import.meta.env.VITE_URL;

export const Login = () => {
  const [nickname, setNickname] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [loading, setLoading] = useState(false); // Estado para el spinner
  const navigate = useNavigate();

  const verificarSesion = () => {
    const sesion = localStorage.getItem("sesion_control");
    if (sesion) {
      const { tipo } = JSON.parse(sesion);
      if (tipo === "master") {
        navigate("/Formulario");
        window.location.reload();
      } else if (tipo === "programacion") {
        navigate("/Registros");
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    verificarSesion();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!nickname || !contrasenia) {
      alert("Por favor, complete todos los campos.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(urlApi + "/usuarios/login", {
        nickname,
        contrasenia,
      });

      const { auth, tipo, usuario } = response.data;

      if (auth) {
        const sesionControl = { nombre_usuario: usuario, tipo };
        localStorage.setItem("sesion_control", JSON.stringify(sesionControl));
        if (tipo === "master") {
          navigate("/Formulario");
        } else if (tipo === "programacion") {
          navigate("/Registros");
        }
        window.location.reload();
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión, por favor intente nuevamente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="main-login">
        <div className="section-login">
          <div id="div-img" className="d-flex justify-content-center">
            <img className="img-logo" src={vtv} alt="" />
          </div>
          <div id="container-form">
            <h4 className="fw-bold text-center mt-4">Iniciar Sesión</h4>
            <form id="form-login" className="p-5 pt-2" onSubmit={handleLogin}>
              <div>
                <label className="fw-bold mb-1">Usuario</label>
                <input
                  className="form form-control"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <label className="fw-bold mb-1">Contraseña</label>
                <input
                  className="form form-control"
                  type="password"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                />
              </div>
              <div className="mt-4 d-flex justify-content-center">
                <button
                  id="btn-login"
                  className="btn btn-success"
                  type="submit"
                  disabled={loading} // Deshabilitar el botón mientras carga
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Acceder"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
