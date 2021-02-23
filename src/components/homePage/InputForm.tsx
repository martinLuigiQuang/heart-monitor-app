import Input, { BloodSugarUnitOptions } from '../input/Input';
import Button from '../button/Button';
import { useLanguage, LanguageType } from '../languageContext/LanguageContext';
import { useInput, UserInputType } from './UserInputContext';

export default function InputForm () {
    const { language } = useLanguage() as LanguageType;
    const { heartData, getInput, handleInputChange, handleUnitConversion } = useInput() as UserInputType ;

    return (
        <form className="dataInput wrapper" onSubmit={ getInput }>

            <Input 
                className="input--date" label={ language.date + ':' } id="date" 
                type="datetime-local"
                onChange={ event => handleInputChange(event) }
            />

            <Input 
                className="input--systolic" label={ language.systolicPressure + ':' } unit="mmHg" id="systolic" 
                type="number" placeholder="110" min="0" max="180"
                onChange={ event => handleInputChange(event, 'systolicPressure') }
            />

            <Input 
                className="input--diastolic" label={ language.diastolicPressure + ':' } unit="mmHg" id="diastolic" 
                type="number" placeholder="70" min="0" max="100"
                onChange={ event => handleInputChange(event, 'diastolicPressure') }
            />

            <Input 
                className="input--heartRate" label={ language.heartRate + ':' } unit="bpm" id="heartRate" 
                type="number" placeholder="65" min="0" max="180"
                onChange={ event => handleInputChange(event, 'heartRate') }
           />

            <Input 
                className="input--bloodSugar" label={ language.bloodSugarLevel + ':' } id="bloodSugar" 
                type="number" placeholder={ heartData.heartData.bloodSugarUnit === 'mmol/L' ? `5.5` : `${5.5*18}` } 
                min="0" max={ `${heartData.heartData.bloodSugarUnit === 'mmol/L' ? 15.5 : 15.5*18}` } step="0.1"
                onChange={event => handleInputChange(event, 'bloodSugar')}
                usersDefinedUnit={ 
                    <BloodSugarUnitOptions
                        bloodSugarUnit={ heartData.heartData.bloodSugarUnit }
                        onChange={ handleUnitConversion }
                    ></BloodSugarUnitOptions>
                }
            />

            <Button ariaLabel="submit heart data" label={ language.buttonSubmit } />

        </form>
    );
};