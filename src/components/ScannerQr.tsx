import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode,  CameraDevice, Html5QrcodeResult } from 'html5-qrcode';
import {   Html5QrcodeCameraScanConfig } from 'html5-qrcode/esm/html5-qrcode';
import { extractIdFromUrl } from '../utils/extractId';

interface ScannerQrProps {
    onScan: (idBien: string) => void;
}

const ScannerQr: React.FC<ScannerQrProps> = ({onScan}) => {
    const [result, setResult] = useState<string | null>(null);
    const [devices, setDevices] = useState<CameraDevice[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);

    const configScanner: Html5QrcodeCameraScanConfig = {
        qrbox: { width: 250, height: 250 },
        fps: 10,
    };

    const onScanSuccess = (decodedText: string, decodedResult: Html5QrcodeResult) => {
        if (decodedText) {
            const idBien = extractIdFromUrl(decodedText);
            setResult(idBien);
        }
        console.log(`Code matched = ${decodedText}`, decodedResult);
    };

    const onScanFailure = (error: any) => {
        // console.warn(`Code scan error = ${error}`);
    };

    const initializeScanner = async (deviceId: string) => {
        try {
            if (scannerRef.current) {
                console.log("Scanner ya está en uso, deteniendo...");
                await scannerRef.current.stop(); // Detiene el scanner si ya está en uso
                console.log("Deteniendo scanner...", scannerRef); 
            } else {
                console.log("Inicializando scanner...");
                scannerRef.current = new Html5Qrcode("reader"); // Inicializa si no existe
            } 
            console.log("Iniciando scanner...",scannerRef);
            await scannerRef.current.start(
                { deviceId: { exact: deviceId } },
                configScanner,
                onScanSuccess,
                onScanFailure
            );
        } catch (error) {
            console.error("Error al iniciar el scanner :", error);
        }
    }; 
 
    useEffect(() => {
        // Obtener cámaras disponibles
        Html5Qrcode.getCameras()
            .then((cameras) => { 
                setDevices(cameras);
                if (cameras.length > 0) {
                    if(localStorage.getItem('selectedDeviceId')) {
                        setSelectedDeviceId(localStorage.getItem('selectedDeviceId')); // Seleccionar la primera cámara por defecto
                    } else {
                        setSelectedDeviceId(cameras[0].id); // Seleccionar la primera cámara por defecto
                    }
                }
            })
            .catch((err) => console.error("Error al obtener cámaras: ", err));
    }, []);

    useEffect(() => {
        if (selectedDeviceId) {
            initializeScanner(selectedDeviceId); 
        }
    }, [selectedDeviceId]);

    useEffect(() => {
        if(result) {
            onScan(result);
        }
    }, [result]);
    

    const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDeviceId(event.target.value); // Cambia la cámara seleccionada
        localStorage.setItem('selectedDeviceId', event.target.value);
    };

    return (
        <div className='text-white'>
            <div className='mx-2 flex flex-col mb-8'>
            <p className='font-semibold'>Cambiar Camara</p>
             <select className='px-3 py-2 rounded-md bg-white border' onChange={handleDeviceChange} value={selectedDeviceId || ''}>
                {devices.map((device) => (
                    <option key={device.id} value={device.id}>
                        {device.label || `Cámara ${device.id}`}
                    </option>
                ))}
            </select>
                </div>
                <button className='' onClick={ async()=>{
                    await scannerRef?.current?.stop()
                    scannerRef.current=null
                    }}>Close</button>
                <button className='' onClick={ async()=>await initializeScanner(localStorage.getItem('selectedDeviceId'))}>Iniciar</button>
            <div id="reader" className='mt-10  border-4 border-dashed' style={{ width: "300px", margin: 'auto' }}></div>
        </div>
    );
};

export default ScannerQr;
