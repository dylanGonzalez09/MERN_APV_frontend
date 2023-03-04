import {useContext} from "react";
import PacientesContext from "../context/PacientesProvider";

// Crear un custom hook para extraer los datos
const usePacientes = () => {
    return useContext(PacientesContext);
}

export default usePacientes;