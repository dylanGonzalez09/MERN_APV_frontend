import {createContext, useState, useEffect} from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

export const PacientesProvider = ({children}) => { //De donde vienen los datos

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const {auth} = useAuth();

    useEffect(() => {
        // Llamar API para traer resultados
        
        const obtenerPacientes = async () => {
            try {

                const token = localStorage.getItem("token");
                if(!token) return;
    
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios("/pacientes", config);

                setPacientes(data.pacientes);

            } catch (error) {
                console.log(error);
            }
        }

        obtenerPacientes();
    }, [auth]);

    const guardarPaciente = async (paciente) => {
    
        const token = localStorage.getItem("token");
        
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);

                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }else{
            try {
        
                const {data} = await clienteAxios.post("/pacientes", paciente, config);
        
                // Crea un nuevo objeto sin los 3 primeros parametros
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data;
        
                setPacientes([pacienteAlmacenado, ...pacientes]);
        
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }

    }

    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }

    const eliminarPaciente = async (id) => {
        const confirmar = confirm("¿Seguro que deseas eliminar esté paciente?");

        if(confirmar){
            try {
                const token = localStorage.getItem("token");
        
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config);

                const pacientesEliminado = pacientes.filter(pacientesState =>  pacientesState._id !== id);

                setPacientes(pacientesEliminado);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }


    return(
        <PacientesContext.Provider value={{
            pacientes,
            guardarPaciente,
            setEdicion,
            paciente,
            eliminarPaciente
        }}>
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext;