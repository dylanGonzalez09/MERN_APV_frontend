import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import Alerta from "../components/alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {

  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const {token} = useParams();
  

  useEffect( () => { //Se ejecuta cuando el componente carga
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);

        setAlerta({
          msg: "Coloca tu nuevo password",
          error: false
        });

        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true
        });
      }
    }

    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([password, confirmarPassword].includes("")){
      setAlerta({
        msg: "Los campos no pueden estar vacíos",
        error: true
      });
      return;
    }

    if(password !== confirmarPassword){
      setAlerta({
        msg: "Los passwords no coinciden",
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

    //Restablecer y almacenar el nuevo password
    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const {data} = await clienteAxios.post(url, {password});

      setPasswordModificado(true);

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
        <h1 className="text-indigo-600 font-black text-6xl">Restablece tu Password y no Pierdas el Acceso a tus {""}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {msg && <Alerta alerta={alerta}/>}

        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>

                    <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" placeholder="Escribe tu nuevo password" value={password} onChange={e => setPassword(e.target.value)}/>

                    <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Confirmar Nuevo Password</label>

                    <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" placeholder="Confirma tu nuevo password" value={confirmarPassword} onChange={e => setConfirmarPassword(e.target.value)}/>
                </div>

                <input className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto " type="submit" value="Restablecer Password" />
            </form>

            {passwordModificado && 
              <nav className="mt-10 lg:flex lg:justify-between">
                  <Link className="block text-center my-5 text-gray-500" to="/">Iniciar Sesión</Link>
              </nav>
            }
          </>
        )}
        </div>
    </>

  )
}

export default NuevoPassword;