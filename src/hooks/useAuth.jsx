import {useContext} from "react"; //Hace disponible los valores del provider
import AuthContext from "../context/AuthProvider"; //Este es el provider

// Crear un custom hook para extraer los datos
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;