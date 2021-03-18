import React, { Fragment } from 'react';
import { useBloodSugarUnit, BloodSugarUnitType } from '../../dashboard/DatasetsContext';
import UNITS, { UnitsType } from './units';

export type UnitOptionType = {
    label?: string,
    inputBloodSugarUnit?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
};

export default function UnitOptions ({ label, inputBloodSugarUnit, onChange }: UnitOptionType): JSX.Element {
    const { bloodSugarUnit, handleUnitConversion } = useBloodSugarUnit() as BloodSugarUnitType;
    return (
        <Fragment>
            { label ? <p>{ label }</p> : null }
            <Fragment>
                {
                    Object.keys(UNITS).map(key => {
                        const unit: string = UNITS[key as keyof UnitsType];
                        return (
                            <Fragment key={unit}>
                                <input  type="radio" name="bloodSugarUnit" value={key} id={key} 
                                        checked={inputBloodSugarUnit ? inputBloodSugarUnit === unit : bloodSugarUnit === unit} 
                                        onChange={ onChange ? onChange : () => handleUnitConversion(key as keyof UnitsType) }/>
                                <label htmlFor={key}>{unit}</label>
                            </Fragment>
                        );
                    })
                }
            </Fragment>
        </Fragment>
    );
};