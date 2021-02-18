import './button.css';

export default function Button ({ label, className, ariaLabel, onClick, disabled }) {
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