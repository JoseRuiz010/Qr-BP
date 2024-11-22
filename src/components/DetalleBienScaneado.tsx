import React from 'react'

interface Oficina {
  numeroOficina: string;
  descripcion: string;
  piso: string;
}

interface Bien {
  id: string;
  descripcion: string;
  nroSerie?: string;
  orden?: string;
  oficina: Oficina;
  numeroOficina: string;
}

interface DetalleBienScaneadoProps {
  bien: Bien;
  close?: () => void;
}
export const DetalleBienScaneado:React.FC<DetalleBienScaneadoProps> = ({ bien: { id, descripcion, nroSerie, orden,oficina },close=()=>console.log('closeeeee') }) => {
  return (
        <div className="bg-white">
          <div className="flex flex-col gap-5 border rounded-lg px-4 py-5">
          <h1 className="text-center font-bold text-2xl">Detalle Bien</h1>
          <h3 className=" "><b>Id: </b>{id}</h3>
          <h3 className=" "><b>Bien: </b>{descripcion}</h3>
          <p><b>N° Orden: </b> {orden || ': - '}</p>
          <p><b>N° Serie: </b> {nroSerie || ': - '}</p>
          <p><b>Oficina N°: </b> {oficina.numeroOficina || ': - '}</p>
          <p><b>Oficina: </b> {oficina?.descripcion + ': - '}</p> 
           <p><b>Piso de la  oficina: </b> {oficina?.piso}</p>
        </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={close} className="btn">Close</button>
            </form>
          </div>
        </div>
  )
}
 
