import axios from "axios";

const clienteAxios = axios.create({
    // Crear una variable de URL base con axios
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api` 
});

export default clienteAxios;