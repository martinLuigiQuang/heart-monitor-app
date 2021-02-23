import React, { Fragment } from 'react';
import { useBloodSugarUnit } from '../dashboard/DatasetsContext';
import './input.css';

type InputAttributes = {
    type: string,
    id: string,
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
}

export default function Input ({ className, label, type, name, id, placeholder, value, onChange, unit, checked, min, max, step, usersDefinedUnit }: InputAttributes): JSX.Element {
    return (
        <div className={ className }>
            <label htmlFor={ id }>{ label }</label>
            <input 
                type={ type }
                id={ id }
                name={ name ? name : id }
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

export function InputConfirmation ({ className, label, content, unit }: { className: string, label: string, content: string, unit?: string }): JSX.Element {
    return (
        <div className={ className }>
            <p>{ label }</p>
            <p>{ content }</p>
            { unit ? <p>{ unit }</p> : null }
        </div>
    );
};

export function BloodSugarUnitOptions ({ label, bloodSugarUnit, onChange }: { label?: string, bloodSugarUnit?: string, onChange?: React.ChangeEventHandler }): JSX.Element {
    const bloodSugarUnitContext = useBloodSugarUnit();
    const { unit, handleUnitConversion }: { unit: string, handleUnitConversion: (event: React.SyntheticEvent) => string } | { unit: string, handleUnitConversion: undefined } = bloodSugarUnitContext ? bloodSugarUnitContext : { unit: '', handleUnitConversion: undefined }
    return (
        <Fragment>
            { label ? <p>{ label }</p> : null }
            <input  type="radio" name="bloodSugarUnit" value="mmol/L" id="mmol" 
                    checked={bloodSugarUnit ? bloodSugarUnit === 'mmol/L' : unit === 'mmol/L'} onChange={ onChange ? onChange : handleUnitConversion }/>
            <label htmlFor="mmol">mmol/L</label>
            <input  type="radio" name="bloodSugarUnit" value="mg/dL" id="mg" 
                    checked={bloodSugarUnit ? bloodSugarUnit === 'mg/dL' : unit === 'mg/dL'} onChange={ onChange ? onChange : handleUnitConversion }/>
            <label htmlFor="mg">mg/dL</label>
        </Fragment>
    );
};

