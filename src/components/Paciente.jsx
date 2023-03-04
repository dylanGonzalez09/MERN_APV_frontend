import usePacientes from "../hooks/usePacientes";

const Paciente = (paciente) => {

    const { email, nombre, propietario, fecha, sintomas, _id} = paciente.paciente;

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);

        return new Intl.DateTimeFormat("es-MX", {dateStyle: "long"}).format(nuevaFecha);
    }

    const { setEdicion, eliminarPaciente } = usePacientes();


  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-700 my-2">Mascota: {""}<span className="text-black font-normal normal-case">{nombre}</span></p>

        <p className="font-bold uppercase text-indigo-700 my-2">Propietario: {""}<span className="text-black font-normal normal-case">{propietario}</span></p>

        <p className="font-bold uppercase text-indigo-700 my-2">Email: {""}<span className="text-black font-normal normal-case">{email}</span></p>

        <p className="font-bold uppercase text-indigo-700 my-2">Fecha: {""}<span className="text-black font-normal normal-case">{formatearFecha(fecha)}</span></p>

        <p className="font-bold uppercase text-indigo-700 my-2">Sintomas: {""}<span className="text-black font-normal normal-case">{sintomas}</span></p>

        <div className="flex justify-between my-5">
            <button type="button" className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg" onClick={() => setEdicion(paciente.paciente)}>Editar</button>

            <button type="button" className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg" onClick={() => eliminarPaciente(_id)}>Eliminar</button>
        </div>
    </div>
  )
}

export default Paciente