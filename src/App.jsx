import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Confirmar from "./paginas/Confirmar";
import Login from "./paginas/login";
import OlvidePassword from "./paginas/OlvidePassword";
import Registrar from "./paginas/Registrar";
import NuevoPassword from "./paginas/NuevoPassword";
import { AuthProvider } from "./context/AuthProvider"; //Hacer disponible los datos
import RutaProtegida from "./layout/RutaProtegida";
import AdministrarPacientes from "./paginas/AdministrarPacientes";
import { PacientesProvider } from "./context/PacientesProvider";
import EditarPerfil from "./paginas/EditarPerfil";
import CambiarPassword from "./paginas/CambiarPassword";

function App() {

  return (
    <BrowserRouter>
    {/* Rodear el context global con nuestra aplicacion */}
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout/>}> {/* Pagina principal */}
              <Route index element={<Login/>}/>
              <Route path="registrar" element={<Registrar/>}/>
              <Route path="olvide-password" element={<OlvidePassword/>}/>
              <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
              <Route path="confirmar/:id" element={<Confirmar/>}/>
            </Route>

            {/* Rutas protegidas */}
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes/>}/>
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App
