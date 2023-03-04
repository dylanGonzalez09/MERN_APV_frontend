import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/alerta";
import clienteAxios from "../config/axios";


const Registrar = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");

    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([nombre, email, password, confirmarPassword].includes("")){
            setAlerta({
                msg: "Hay campos vacios",
                error: true
            });
            
            return;
        }

        if(password !== confirmarPassword){
            setAlerta({
                msg: "Los passwords no son iguales",
                error: true
            });
            
            return;
        }

        if(password.length < 8){
            setAlerta({
                msg: "El password es muy corto, minimo 8 caracteres",
                error: true
            });

            return;
        }

        setAlerta({});
        
        // Crear usuario en la API
        try {
            const url = `/veterinarios`;
            await clienteAxios.post(url, { nombre, email, password });

            setAlerta({
                msg: "Creado correctamente, revisa tu email",
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
            <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra tus <span className="text-black">Pacientes</span></h1>            
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

            {/* Si hay mensaje de alerta se muestra el componente, mientras no*/}
            {msg && <Alerta alerta={alerta}/>}
            

            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                    <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={nombre} onChange={e => setNombre(e.target.value)} ype="text" placeholder="Tu Nombre"/>
                </div>
                <div className="my-5">
                    <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={email} onChange={e => setEmail(e.target.value)} ype="email" placeholder="Tu Email"/>
                </div>
                <div className="my-5">
                    <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                    <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Tu Password"/>
                </div>
                <div className="my-5">
                    <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Confirmar Password</label>
                    <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={confirmarPassword} onChange={e => setConfirmarPassword(e.target.value)} type="password" placeholder="Tu Password Nuevamente"/>
                </div>

                <input className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" type="submit" value="Crear Cuenta" />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-gray-500" to="/">Ya tengo una cuenta. Iniciar Sesión</Link>
            </nav>
        </div>
        
    </>
  )
}

export default Registrar;