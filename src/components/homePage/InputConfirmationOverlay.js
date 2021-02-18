import { InputConfirmation } from '../input/Input.js';
import Button from '../button/Button.js';
import { useLanguage } from '../languageContext/LanguageContext.js';
import { useInput, useOverlay, useInputVerification } from './UserInputContext.js';

export default function InputConfirmationOverlay () {
    const language = useLanguage();
    const heartData = useInput();
    const [ date, systolicPressure, diastolicPressure, heartRate, bloodSugar, bloodSugarUnit ] = heartData;
    const inputConfirmation = useOverlay();
    const verifyInput = useInputVerification();
    return (
        <form className={`overlayConfirmation wrapper ${inputConfirmation ? '' : 'hidden'}`} onSubmit={event => event.preventDefault()}>
            
            <InputConfirmation className="confirm--date" label={ language.date } content={ date.toString() }></InputConfirmation>
            <InputConfirmation className="confirm--systolic" label={ language.systolicPressure } content={ systolicPressure } unit="mmHg"></InputConfirmation>
            <InputConfirmation className="confirm--diastolic" label={ language.diastolicPressure } content={ diastolicPressure } unit="mmHg"></InputConfirmation>
            <InputConfirmation className="confirm--heartRate" label={ language.heartRate } content={ heartRate } unit="bpm"></InputConfirmation>
            <InputConfirmation className="confirm--bloodSugarLevel" label={ language.bloodSugarLevel } content={ bloodSugar } unit={ bloodSugarUnit }></InputConfirmation>

            <div className="buttonContainer">
                <Button ariaLabel="cancel submission" onClick={() => verifyInput(false)} label={ language.buttonCancel }></Button>
                <Button ariaLabel="confirm submission" onClick={() => verifyInput(true, ...heartData)} label={ language.buttonOK }></Button>
            </div>

        </form>
    );
};