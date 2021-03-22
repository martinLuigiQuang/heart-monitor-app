import Input from '../common/input/Input';
import UnitOptions from '../common/unitOptions/UnitOptions';
import Button from '../common/button/Button';
import { useLanguage, LanguageType } from '../common/languageContext/LanguageContext';
import { useInput, UserInputType } from './UserInputContext';
import { UnitsType } from '../common/unitOptions/units';
import { convertUnits } from './utils';

export default function InputForm () {
    const { language } = useLanguage() as LanguageType;
    const { heartData, getInput, handleInputChange, handleUnitConversion } = useInput() as UserInputType ;
    return (
        <form className="dataInput wrapper" onSubmit={ getInput }>

            <Input
                className="input--date" label={ language.date + ':' }
                type="datetime-local" 
                value={ heartData.date }
                onChange={ event => handleInputChange(event.target.value) }
            />

            <Input 
                className="input--systolic" label={ language.systolicPressure + ':' } unit="mmHg"
                type="number" placeholder="110" min="0" max="180" 
                value={ heartData.heartData.systolicPressure }
                onChange={ event => handleInputChange(event.target.value, 'systolicPressure') }
            />

            <Input 
                className="input--diastolic" label={ language.diastolicPressure + ':' } unit="mmHg" 
                type="number" placeholder="70" min="0" max="100" 
                value={ heartData.heartData.diastolicPressure }
                onChange={ event => handleInputChange(event.target.value, 'diastolicPressure') }
            />

            <Input 
                className="input--heartRate" label={ language.heartRate + ':' } unit="bpm" 
                type="number" placeholder="65" min="0" max="180" 
                value={ heartData.heartData.heartRate }
                onChange={ event => handleInputChange(event.target.value, 'heartRate') }
           />

            <Input 
                className="input--bloodSugar" label={ language.bloodSugarLevel + ':' } 
                type="number" placeholder={ convertUnits('5.5', heartData.heartData.bloodSugarUnit) } 
                min="0" max={ convertUnits('15.5', heartData.heartData.bloodSugarUnit) } step="0.1"
                value={ heartData.heartData.bloodSugar }
                onChange={event => handleInputChange(event.target.value, 'bloodSugar')}
                usersDefinedUnit={ 
                    <UnitOptions
                        inputBloodSugarUnit={ heartData.heartData.bloodSugarUnit }
                        onChange={ event => handleUnitConversion(event.target.value as keyof UnitsType, heartData.heartData.bloodSugar) }
                    ></UnitOptions>
                }
            />

            <Button ariaLabel="submit heart data" label={ language.buttonSubmit } />

        </form>
    );
};