import { InputConfirmation } from '../input/Input.js';
import Button from '../button/Button.js';
import { useLanguage } from '../languageContext/LanguageContext.js';
import { useInput, useInputVerification } from './UserInputContext.js';

export default function InputConfirmationOverlay () {
    const language = useLanguage();
    const { inputConfirmation, verifyInput } = useInputVerification();
    const { heartData } = useInput();
    const [ date, systolicPressure, diastolicPressure, heartRate, bloodSugar, bloodSugarUnit ] = heartData;
    return (
        <form className={`overlayConfirmation wrapper ${inputConfirmation ? '' : 'hidden'}`} onSubmit={event => event.preventDefault()}>
            
            <InputConfirmation className="confirm--date" label={ language.date } content={ date.toString() } />
            <InputConfirmation className="confirm--systolic" label={ language.systolicPressure } content={ systolicPressure } unit="mmHg" />
            <InputConfirmation className="confirm--diastolic" label={ language.diastolicPressure } content={ diastolicPressure } unit="mmHg" />
            <InputConfirmation className="confirm--heartRate" label={ language.heartRate } content={ heartRate } unit="bpm" />
            <InputConfirmation className="confirm--bloodSugarLevel" label={ language.bloodSugarLevel } content={ bloodSugar } unit={ bloodSugarUnit } />

            <div className="buttonContainer">
                <Button ariaLabel="cancel submission" onClick={() => verifyInput(false)} label={ language.buttonCancel } />
                <Button ariaLabel="confirm submission" onClick={() => verifyInput(true, ...heartData)} label={ language.buttonOK } />
            </div>

        </form>
    );
};