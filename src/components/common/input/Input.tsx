import './Input.css';

export type InputAttributes = {
    type: string,
    label: string,
    value?: string,
    className?: string,
    name?: string,
    placeholder?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    checked?: boolean,
    min?: string,
    max?: string,
    step?: string,
    usersDefinedUnit?: JSX.Element,
    unit?: string
    [key: string]: any
}

export default function Input ({ className, label, type, name, placeholder, value, onChange, unit, checked, min, max, step, usersDefinedUnit }: InputAttributes): JSX.Element {
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

