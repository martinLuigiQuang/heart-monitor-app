import './Input.css';
import InputAttributes from '../../../models/types/InputAttributes';

export default function Input (props: InputAttributes): JSX.Element {
    const { className, label, type, name, placeholder, value, onChange, 
            unit, checked, min, max, step, usersDefinedUnit } = props;
    return (
        <div key={ className } className={ className }>
            <label htmlFor={ className }>{ label }</label>
            <input 
                type={ type }
                id={ className }
                name={ name ? name : className }
                placeholder={ placeholder }
                value={ value }
                onChange={ onChange }
                checked={ checked }
                min={ min }
                max={ max }
                step={ step }
            />
            { usersDefinedUnit ? usersDefinedUnit : <p>{ unit }</p>}
        </div>
    );
};

