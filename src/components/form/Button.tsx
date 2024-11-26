import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string; // Texto a mostrar en el botón
}

const Button: React.FC<ButtonProps> = ({ text, type = 'button', disabled = false, onClick, className, ...props }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${disabled ? 'bg-gray-400' : 'bg-black'} text-white font-bold px-3 py-2 rounded-md ${className || ''}`}
            {...props}
        >
            {text}
        </button>
    );
};

export default Button;
