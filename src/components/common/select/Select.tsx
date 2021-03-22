import './Select.css';

export type SelectAttributes = {
    className: string,
    options: string[],
    value: string,
    label?: string,
    onChange?: React.ChangeEventHandler<HTMLSelectElement>
};

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