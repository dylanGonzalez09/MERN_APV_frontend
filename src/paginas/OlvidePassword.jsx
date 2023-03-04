import { Link } from "react-router-dom";
import {useState} from "react";
import Alerta from "../components/alerta";
import clienteAxios from "../config/axios";

const OlvidePassword = () => {

    const [email, setEmail] = useState("");
    const [alerta, setAlerta] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(email === ""){
            setAlerta({
                msg: "El email no puede estar vacio",
                error: true
            });
            return;
        }

        try {
            const {data} = await clienteAxios.post("/veterinarios/olvide-password", {email});

            setAlerta({
                msg: data.msg,
                error: false
            });
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
            <h1 className="text-indigo-600 font-black text-6xl">Recuperar mi {""}
                <span className="text-black">Password</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

            {msg && <Alerta alerta={alerta}/>}

            <form onSubmit={handleSubmit} action="">
                <div className="my-5">
                    <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Email</label>

                    <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email con el que se inició sesión"/>
                </div>

                <input className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto " type="submit" value="Enviar Email" />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-gray-500" to="/">Ya tengo una cuenta. Iniciar Sesión</Link>

                <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes una cuenta? Crear una</Link>
            </nav>
        </div>
    </>
  )
}

export default OlvidePassword;