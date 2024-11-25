import { useEffect, useState } from "react"
import ScannerQr from "./components/ScannerQr"
import { authStore } from "./context/authStore"
import { bienAction } from "./context/action/bienAction"
import { bienStore } from "./context/bienStore"
import { DetalleBienScaneado } from "./components/DetalleBienScaneado"

function App() {
  const auth = authStore(state=>state)
  const bienS=bienStore(state=>state)
  const [id, setId] = useState<string | null>(null)
  useEffect(() => {
    if(id){
      bienAction.get(id)
    }
  }, [id])

  const closeModal=()=>{
    bienS.clear()
    setId(null)
  }
  
  return (
    <div className="p-4 bg-black h-screen overflow-scroll">
      <h1 className="font-bold text-center text-white text-3xl">Scanear QR</h1>
      {id && <h1 className="text-white">Id: {id}</h1>}
     { (!bienS.item && !bienS.loading )&&<ScannerQr onScan={setId} />}
     <p className="text-white">{localStorage.getItem('selectedDeviceId')}</p>
      {bienS.loading && <h1 className="text-white text-center">Cargando...</h1>}
      { (bienS.item && !bienS.loading) &&<DetalleBienScaneado bien={bienS.item} close={closeModal} />}
    </div>
  )
}

export default App
