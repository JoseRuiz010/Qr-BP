import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode,  CameraDevice, Html5QrcodeResult } from 'html5-qrcode';
import {   Html5QrcodeCameraScanConfig } from 'html5-qrcode/esm/html5-qrcode';
import { extractIdFromUrl } from '../utils/extractId';

const ScannerQr: React.FC = () => {
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
        console.warn(`Code scan error = ${error}`);
    };

    const initializeScanner = async (deviceId: string) => {
        try {
            if (scannerRef.current) {
                await scannerRef.current.stop(); // Detiene el scanner si ya está en uso
            } else {
                scannerRef.current = new Html5Qrcode("reader"); // Inicializa si no existe
            }

            await scannerRef.current.start(
                { deviceId: { exact: deviceId } },
                configScanner,
                onScanSuccess,
                onScanFailure
            );
        } catch (error) {
            console.error("Error al iniciar el scanner:", error);
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

        return () => {
            // Detener el scanner al desmontar el componente
            if (scannerRef.current) {
                scannerRef.current.stop().catch(console.error);
            }
        };
    }, []);

    useEffect(() => {
        if (selectedDeviceId) {
            initializeScanner(selectedDeviceId);
        }
    }, [selectedDeviceId]);

    const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDeviceId(event.target.value); // Cambia la cámara seleccionada
        localStorage.setItem('selectedDeviceId', event.target.value);
    };

    return (
        <div>
            <h1>QR Code Scanner</h1>
            <h2>Seleccionar Cámara</h2>
            <button onClick={() => initializeScanner(selectedDeviceId || '')}>Iniciar Scanner</button>
            <select onChange={handleDeviceChange} value={selectedDeviceId || ''}>
                {devices.map((device) => (
                    <option key={device.id} value={device.id}>
                        {device.label || `Cámara ${device.id}`}
                    </option>
                ))}
            </select>
            <pre>
                {JSON.stringify({ result }, null, 2)}
            </pre>
            <div id="reader" style={{ width: "300px", margin: 'auto' }}></div>
        </div>
    );
};

export default ScannerQr;
