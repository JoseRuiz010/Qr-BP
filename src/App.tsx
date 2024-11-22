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
  
  return (
    <div className="p-4 bg-black h-screen overflow-scroll">
      <pre className="text-white">
        {/* {
          JSON.stringify({id,bienS}, null, 3)
        } */}
      </pre>
      <h1 className="font-bold text-center text-white text-3xl">Scanear QR</h1>
      {id && <h1>Id: {id}</h1>}
      { bienS.item && <DetalleBienScaneado bien={bienS.item} close={()=>bienS.clear()}/>}
      <ScannerQr onScan={setId} />

    </div>
  )
}

export default App
