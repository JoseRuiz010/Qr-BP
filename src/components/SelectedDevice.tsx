import React, { useEffect, useState } from 'react';

interface SelectedDeviceProps {
    deviceName?: string | null;
    onSelect: (deviceName: string) => void;
}

const SelectedDevice: React.FC<SelectedDeviceProps> = ({  onSelect = (data: string | null) => { console.log(data) } }) => {
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectIdDevices, setSelectIdDevices] = useState<string | null>(null);

    useEffect(() => {
        setDevices([]);
        if (!navigator.mediaDevices?.enumerateDevices) {
            console.log("enumerateDevices() not supported.");
        } else {
            navigator.mediaDevices
                .enumerateDevices()
                .then((devices) => {
                    devices.forEach((device, index) => {
                        if (device.kind === 'videoinput') {
                            setDevices((prev) => [...prev, device]);
                            const idSaved = localStorage.getItem('deviceId');
                            if (idSaved) setSelectIdDevices(idSaved);
                            if (!idSaved && index === 0) setSelectIdDevices(device.deviceId);
                        }
                    });
                })
                .catch((err) => {
                    console.error(`${err.name}: ${err.message}`);
                });
        }
    }, [])

    useEffect(() => {
        if (selectIdDevices !== null) {
            onSelect(selectIdDevices);
        }
    }, [selectIdDevices])

    const saveIdDevice = (value: string) => {
        setSelectIdDevices(value);
        localStorage.setItem('deviceId', value);
    }



    return (

        <select className='bg-white text-black' onChange={(e) => saveIdDevice(e.target.value)} value={selectIdDevices || []}>
            {
                devices.length > 0 && devices.map((device, index) => (
                    <option onClick={() => setSelectIdDevices(device.label)} key={device.deviceId + index} value={device.deviceId}>{device.label}</option>
                ))
            }
        </select>

    );
};

export default SelectedDevice;