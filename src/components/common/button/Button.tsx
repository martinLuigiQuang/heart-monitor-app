import ButtonAttributes from "../../../models/types/ButtonAttributes";
// import './button.css';

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