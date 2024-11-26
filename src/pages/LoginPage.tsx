import React, { useEffect, useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { authStore } from '../context/authStore';
import { authAction } from '../context/action/authAction';
import CustomInput from '../components/form/CustomInput';
import Button from '../components/form/Button';
import { useNavigate } from 'react-router-dom';
 

export const LoginPage: React.FC = () => {
    const isAuth = authStore((state) => state.isAuth);
 
    const navigate = useNavigate()

    useEffect(() => {
      if(isAuth) navigate('/')        
    }, [isAuth])
    


    // Estado para credenciales
    const [credentials, setCredentials] = useState<{ username: string; password: string }>({
        username: 'admin',
        password: '1234',
    });

    // Estado global usando authStore
    const loading = authStore((state) => state.loading);
    const error = authStore((state) => state.error);

    // Manejo del cambio en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    // Lógica para iniciar sesión
    const login = async () => {
        if(!credentials.username  || !credentials.password) return;
        await authAction.login(credentials);
    };

    // Validación del formulario
    const isFormValid = (): boolean => {
        return credentials.username.trim() !== '' && credentials.password.trim() !== '';
    };

    return (
        <div className="flex items-center h-screen w-full bg-gray-200">
         
         <pre>
  
         </pre>
            <div className="bg-white max-w-[350px] rounded-md mx-auto px-4 py-14">
                {/* Muestra el error, si existe */}
                {error && (
                    <div className="flex items-center gap-4 border-2 rounded-md py-3 border-red-400 text-red-400 text-center p-2 mb-4">
                        <MdErrorOutline size={25} />
                        {error}
                    </div>
                )}
                <h1 className="font-bold text-center text-2xl">Bienvenido a Bienes Patrimoniales</h1>
                <p className="text-center font-light text-sm my-4">
                    Ingresa tus credenciales para acceder al sistema
                </p>
                <div className="flex flex-col gap-3 w-min mx-auto">
                    {/* Inputs personalizados */}
                    <CustomInput
                        value={credentials.username}
                        name="username"
                        type="text"
                        placeholder="Usuario"
                        onChange={handleChange}
                    />
                    <CustomInput
                        value={credentials.password}
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                    />
                    {/* Botón con loading y validación */}
                    <Button
                        onClick={() => login()}
                        disabled={loading || !isFormValid()}
                        text={loading ? 'Cargando...' : 'Ingresar'}
                        type="submit"
                    />
                </div>
            </div>
        </div>
    );
};
