import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { useEffect, useState } from 'react';
import SelectedDevice from './SelectedDevice';
import { extractIdFromUrl } from '../utils/extractId';

interface Props {
    onScan: (result: string) => void
}

const QrReaderComponent: React.FC<Props> = ({onScan}) => {
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectIdDevices, setSelectIdDevices] = useState<string | null>(null);
    const [results, setresults] = useState<string | null>(null)
    useEffect(() => {
        setDevices([]);
        if (!navigator.mediaDevices?.enumerateDevices) {
            console.log("enumerateDevices() not supported.");
        } else {
            // List cameras and microphones.
            navigator.mediaDevices
                .enumerateDevices()
                .then((devices) => {
                    devices.forEach((device) => {
                        // console.log(`${device.label} id = ${device.deviceId}`);
                        if(device.kind === 'videoinput' ) {
                            // console.log('back camera found')
                            setDevices((prev) => [...prev, device]);
                            setSelectIdDevices(device.deviceId);
                        }
                    });
                })
                .catch((err) => {
                    console.error(`${err.name}: ${err.message}`);
                });
        }
    },[])
    const resultScan = (result: IDetectedBarcode[]) => {
        const idBien= extractIdFromUrl(result[0].rawValue)
        if(idBien) {
            setresults(idBien)
            onScan(idBien) 
        }
    }


    return (
        <div className='text-white'>
            {
                devices.length === 0 && <h1>No se encontraron camaras</h1>
            }
            <SelectedDevice onSelect={setSelectIdDevices} deviceName={selectIdDevices}/>
            <Scanner
             onScan={resultScan} 
             allowMultiple={true}
             constraints={
                {
                    deviceId: { exact: selectIdDevices || localStorage.getItem('selectedDeviceId') || undefined }
                }
             }       
                />
        </div>
    );
};

export default QrReaderComponent;