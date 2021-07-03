import { Fragment } from 'react';
import { useBloodSugarUnit } from '../../dashboard/DatasetsContext';
import BloodSugarUnit from '../../../models/interfaces/BloodSugarUnit';
import UNITS from './units';
import Units from '../../../models/types/Units';
import UnitOptions from '../../../models/interfaces/UnitOptions';

export default function UnitOptions ({ label, inputBloodSugarUnit, onChange }: UnitOptions): JSX.Element {
    const { bloodSugarUnit, handleUnitConversion } = useBloodSugarUnit() as BloodSugarUnit;
    return (
        <Fragment>
            { label ? <p>{ label }</p> : null }
            <Fragment>
                {
                    Object.keys(UNITS).map(key => {
                        const unit: string = UNITS[key as keyof Units];
                        return (
                            <Fragment key={unit}>
                                <input  type="radio" name="bloodSugarUnit" value={key} id={key} 
                                        checked={inputBloodSugarUnit ? inputBloodSugarUnit === unit : bloodSugarUnit === unit} 
                                        onChange={ onChange ? onChange : () => handleUnitConversion(key as keyof Units) }/>
                                <label htmlFor={key}>{unit}</label>
                            </Fragment>
                        );
                    })
                }
            </Fragment>
        </Fragment>
    );
};