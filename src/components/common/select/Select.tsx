import './Select.css';
import SelectAttributes from '../../../models/interfaces/SelectAttributes';

export default function Select ({className, options, value, label, onChange}: SelectAttributes): JSX.Element {
    return (
        <div className={ className }>
            { label ? <label htmlFor={ className }>{ label }</label> : null }
            <select name={ className } id={ className } value={ value } onChange={ onChange }>
                {
                    options.map(option => {
                        return <option key={ option } value={ option }>{ option }</option>
                    })
                }
            </select>
        </div>
    );
};