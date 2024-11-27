import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, CameraDevice } from 'html5-qrcode';
import { Html5QrcodeCameraScanConfig } from 'html5-qrcode/esm/html5-qrcode';
import { extractIdFromUrl } from '../utils/extractId';

interface ScannerQrProps {
    onScan: (idBien: string) => void;
}

const ScannerQr: React.FC<ScannerQrProps> = ({ onScan }) => {
    const [devices, setDevices] = useState<CameraDevice[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);

    const configScanner: Html5QrcodeCameraScanConfig = {
        qrbox: { width: 250, height: 250 },
        fps: 10,
    };

    const initializeScanner = async (deviceId: string) => {
        if (!scannerRef.current) {
            scannerRef.current = new Html5Qrcode('reader');
        }

        try {
            // Detener el escáner solo si está ejecutándose
            if (scannerRef.current.isScanning) {
                await scannerRef.current.stop();
            }
            await scannerRef.current.start(
                { deviceId: { exact: deviceId } },
                configScanner,
                (decodedText: string) => {
                    const idBien = extractIdFromUrl(decodedText);
                    if (idBien) {
                        onScan(idBien);
                    }
                },
                (error: any) => {
                    console.warn(`Scan error: ${error}`);
                }
            );
            console.log('Scanner iniciado con éxito.');
        } catch (error) {
            console.error('Error al iniciar el scanner:', error);
        }
    };

    const stopScanner = async () => {
        if (scannerRef.current && scannerRef.current.isScanning) {
            try {
                await scannerRef.current.stop();
                scannerRef.current.clear();
                console.log('Scanner detenido.');
            } catch (error) {
                console.error('Error al detener el scanner:', error);
            }
        }
    };

    const fetchDevices = async () => {
        try {
            const cameras = await Html5Qrcode.getCameras();
            if (cameras.length === 0) {
                console.warn('No se encontraron cámaras disponibles.');
                return;
            }

            setDevices(cameras);
            const defaultDevice = localStorage.getItem('selectedDeviceId') || cameras[0]?.id;
            setSelectedDeviceId(defaultDevice);
            console.log('Cámaras disponibles:', cameras);
        } catch (error) {
            console.error('Error al obtener cámaras:', error);
        }
    };

    useEffect(() => {
        fetchDevices();

        return () => {
            stopScanner(); // Detener el escáner al desmontar
        };
    }, []);

    useEffect(() => {
        if (selectedDeviceId) {
            initializeScanner(selectedDeviceId);
        }
    }, [selectedDeviceId]);

    const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newDeviceId = event.target.value;
        setSelectedDeviceId(newDeviceId);
        localStorage.setItem('selectedDeviceId', newDeviceId);
    };
    
    return (
        <div className="text-white">
            <div className="mx-2 flex flex-col mb-8">
                <p className="font-semibold text-xl">Cambiar Cámara</p>
                <select
                    className="px-3 py-2 rounded-md bg-white border"
                    onChange={handleDeviceChange}
                    value={selectedDeviceId || ''}
                >
                    {devices.map((device) => (
                        <option key={device.id} value={device.id}>
                            {device.label || `Cámara ${device.id}`}
                        </option>
                    ))}
                </select>
            </div>
            <div id="reader" className="mt-10 border-4 border-dashed" style={{ width: '300px', margin: 'auto' }} />
        </div>
    );
};

export default ScannerQr;
