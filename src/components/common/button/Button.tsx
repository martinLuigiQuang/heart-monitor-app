import { MouseEventHandler } from 'react';
// import './button.css';

export type ButtonAttributes = {
    label: string, 
    ariaLabel: string, 
    className?: string, 
    onClick?: MouseEventHandler<HTMLButtonElement>, 
    disabled?: boolean
};

export default function Button ({ label, ariaLabel, className, onClick, disabled }: ButtonAttributes): JSX.Element {
    return (
        <button 
            data-testid="button" 
            className={ className } 
            onClick={ onClick }
            aria-label={ ariaLabel }
            disabled={ disabled ? true : false }
        >
            { label }
        </button>
    );
};