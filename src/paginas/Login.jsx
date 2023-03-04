import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/alerta";
import clienteAxios from "../config/axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({});

    const {setAuth} = useAuth();

    const navigate = useNavigate(); //Redireccionar el usuario

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Validar
        if([email, password].includes("")){
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            });
            return;
        }

        if(password.length < 8){
            setAlerta({
                msg: "El password debe tener mínimo 8 caracteres",
                error: true
            });
            return;
        }

        //Autenticar usuario
        try {
            const {data} = await clienteAxios.post("/veterinarios/login", {email, password});

            //Almacenar JWT en localStorage
            localStorage.setItem("token", data.token);
            setAuth(data);
            navigate("/admin");

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const {msg} = alerta;

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesión y Administra tus <span className="text-black">Pacientes</span></h1>            
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {msg && <Alerta alerta={alerta}/>}

            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email de Registro"/>
                </div>
                <div className="my-5">
                    <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                    <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Tu Password"/>
                </div>

                <input className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto " type="submit" value="Iniciar Sesión" />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes una cuenta? Crear una</Link>

                <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvidé mi Password</Link>
            </nav>
        </div>
    </>
  )
}

export default Login;
