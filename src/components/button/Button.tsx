import { MouseEventHandler } from 'react';
import './button.css';

export default function Button ({ label, className, ariaLabel, onClick, disabled }: { label: string, className: string, ariaLabel: string, onClick: MouseEventHandler<HTMLButtonElement>, disabled: boolean}) {
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