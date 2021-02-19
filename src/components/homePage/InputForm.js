import Input, { BloodSugarUnitOptions } from '../input/Input.js';
import Button from '../button/Button.js';
import { useLanguage } from '../languageContext/LanguageContext.js';
import { useInput } from './UserInputContext.js';

export default function InputForm () {
    const language = useLanguage();
    const { heartData, getInput, handleInputChange, handleUnitConversion } = useInput();

    return (
        <form className="dataInput wrapper" onSubmit={ getInput }>

            <Input 
                className="input--date" label={ language.date + ':' } id="date" 
                type="datetime-local"
                onChange={ event => handleInputChange(event, 0) }
            ></Input>

            <Input 
                className="input--systolic" label={ language.systolicPressure + ':' } unit="mmHg" id="systolic" 
                type="number" placeholder="110" min="0" max="180"
                onChange={ event => handleInputChange(event, 1) }
            ></Input>

            <Input 
                className="input--diastolic" label={ language.diastolicPressure + ':' } unit="mmHg" id="diastolic" 
                type="number" placeholder="70" min="0" max="100"
                onChange={ event => handleInputChange(event, 2) }
            ></Input>

            <Input 
                className="input--heartRate" label={ language.heartRate + ':' } unit="bpm" id="heartRate" 
                type="number" placeholder="65" min="0" max="180"
                onChange={ event => handleInputChange(event, 3) }
            ></Input>

            <Input 
                className="input--bloodSugar" label={ language.bloodSugarLevel + ':' } id="bloodSugar" 
                type="number" placeholder={ heartData[5] === 'mmol/L' ? 5.5 : 5.5*18 } min="0" max={ heartData[5] === 'mmol/L' ? 5.5 : 5.5*18 } step="0.1"
                onChange={event => handleInputChange(event, 4)}
                usersDefinedUnit={
                    <BloodSugarUnitOptions
                        bloodSugarUnit={ heartData[5] }
                        onChange={ handleUnitConversion }
                    ></BloodSugarUnitOptions>
                }
            ></Input>

            <Button ariaLabel="submit heart data" label={ language.buttonSubmit }></Button>

        </form>
    );
};