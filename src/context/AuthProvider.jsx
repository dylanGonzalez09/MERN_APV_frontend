import {useState, useEffect, createContext} from "react";
import clienteAxios from "../config/axios";

// Crearemos un context que permitirá acceder al state de forma global en diferentes lugares de la aplicacion

const AuthContext = createContext(); //Referencia a como se llamara el context de el provider

const AuthProvider = ({children}) => { //Prop reservado para sus hijos
    //Definir el state que estará globalmente
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const autenticarUsuario = async () => {
            // Leer el token
            const token = localStorage.getItem("token");

            if(!token){
                setCargando(false);
                return;
            }

            const config = { //Datos del HEADER
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }

            try {
                // Hacer peticion a la URL
                const {data} = await clienteAxios("/veterinarios/perfil", config);
                
                setAuth(data.perfil);
            } catch (error) {
                setAuth({});
            }

            setCargando(false);
        }

        autenticarUsuario();
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        setAuth({});
    }
    
    const actualizarPerfil = async datos => {
        const token = localStorage.getItem("token");

        if(!token){
            setCargando(false);
            return;
        }

        const config = { //Datos del HEADER
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            const {data} = await clienteAxios.put(url, datos, config);
            
            return {
                msg: "Almacenado Correctamente"
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }

    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem("token");

        if(!token){
            setCargando(false);
            return;
        }

        const config = { //Datos del HEADER
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/actualizar-password`;

            const {data} = await clienteAxios.put(url, datos, config);

            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            // Objeto a disposicion para acceder en los distintos componentes
            auth,
            setAuth,
            cargando,
            cerrarSesion,
            actualizarPerfil,
            guardarPassword
        }} >
            {children}            
        </AuthContext.Provider >
    )
}

export {
    AuthProvider
}

export default AuthContext;