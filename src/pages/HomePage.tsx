import React, { useEffect, useState } from 'react';
import { bienStore } from '../context/bienStore';
import { bienAction } from '../context/action/bienAction';
import ScannerQr from '../components/ScannerQr';
import { DetalleBienScaneado } from '../components/DetalleBienScaneado';
import { authStore } from '../context/authStore';
import { useNavigate } from 'react-router-dom';
import Button from '../components/form/Button';
import { authAction } from '../context/action/authAction';

const HomePage: React.FC = () => {
  const isAuth = authStore((state) => state.isAuth);
    const bienS=bienStore(state=>state)
    const [id, setId] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
      if(!isAuth) navigate('/login')
    }, [isAuth])
    
    useEffect(() => {
      if(id){
        bienAction.get(id)
      }
    }, [id])
    useEffect(() => {
      if(bienS.error === 'jwt expired'){ 
        alert("Token invalido");
        logout();
      }
    }, [bienS])
  
    const closeModal=()=>{
      bienS.clear()
      setId(null)
    }
    const logout = () => authAction.logout()
    
    return (
      <div className="p-4 bg-black h-screen overflow-scroll ">
        <div className='flex justify-between px-6 mb-8'>
         <h1 className="font-bold text-center text-white text-3xl">Scanear QR</h1>
        <Button  className='bg-red-600' onClick={()=>logout()} text="Cerrar Sesión" />
        </div>  
       { (!bienS.item && !bienS.loading )&&<ScannerQr onScan={setId} />} 
        {bienS.loading && <h1 className="text-white text-center">Cargando...</h1>}
        { (bienS.item && !bienS.loading) &&<DetalleBienScaneado bien={bienS.item} close={closeModal} />}

        <pre className='text-white'>
          {
            // JSON.stringify({bienS}, null, 2)
          }
          </pre>

      </div>
    )
  }

export default HomePage;