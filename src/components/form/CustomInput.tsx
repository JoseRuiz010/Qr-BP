import React, { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string; // Hacemos explícito que `name` es obligatorio
    type: string; // Permitimos cualquier valor que soporte el atributo `type`
}

const CustomInput: React.FC<CustomInputProps> = ({
    name,
    type,
    value,
    onChange,
    className,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <input
                name={name}
                type={type === 'password' && showPassword ? 'text' : type}
                value={value}
                onChange={onChange}
                className={`input my-2 border-[1px] rounded-md px-3 py-2 min-w-[300px] ${className}`}
                {...rest} // Pasamos el resto de las props al input
            />
            {type === 'password' && (
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-7 top-1/2 transform -translate-y-1/2"
                >
                    {showPassword ? <IoEyeOutline size={25} /> : <IoEyeOffOutline size={25} />}
                </button>
            )}
        </div>
    );
};

export default CustomInput;
