import React, { Fragment } from 'react';
import { useBloodSugarUnit } from '../../dashboard/DatasetsContext';
import UNITS, { UnitsType } from './units';

export type UnitOptionType = {
    label?: string,
    inputBloodSugarUnit?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
};

export default function UnitOptions ({ label, inputBloodSugarUnit, onChange }: UnitOptionType): JSX.Element {
    const bloodSugarUnitContext = useBloodSugarUnit();
    const { bloodSugarUnit, handleUnitConversion } = bloodSugarUnitContext ? bloodSugarUnitContext : { bloodSugarUnit: '', handleUnitConversion: undefined };
    return (
        <Fragment>
            { label ? <p>{ label }</p> : null }
            <Fragment>
                {
                    Object.keys(UNITS).map((key): JSX.Element => {
                        const unit: string = UNITS[key as keyof UnitsType];
                        return (
                            <Fragment key={unit}>
                                <input  type="radio" name="bloodSugarUnit" value={key} id={key} 
                                        checked={inputBloodSugarUnit ? inputBloodSugarUnit === unit : bloodSugarUnit === unit} 
                                        onChange={ onChange ? onChange : handleUnitConversion }/>
                                <label htmlFor={key}>{unit}</label>
                            </Fragment>
                        );
                    })
                }
            </Fragment>
        </Fragment>
    );
};