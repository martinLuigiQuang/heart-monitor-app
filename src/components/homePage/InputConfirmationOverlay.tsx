import { InputConfirmation } from '../input/Input';
import Button from '../button/Button';
import { useLanguage, LanguageType } from '../languageContext/LanguageContext';
import { useInput, UserInputType, useInputVerification, InputVerificationType } from './UserInputContext';

export default function InputConfirmationOverlay () {
    const { language } = useLanguage() as LanguageType;
    const { heartData } = useInput() as UserInputType;
    const { inputConfirmation, verifyInput } = useInputVerification() as InputVerificationType;
    
    return (
        <form className={`overlayConfirmation wrapper ${inputConfirmation ? '' : 'hidden'}`} onSubmit={event => event.preventDefault()}>
            
            <InputConfirmation className="confirm--date" label={ language.date } content={ heartData.date.toString() } />
            <InputConfirmation className="confirm--systolic" label={ language.systolicPressure } content={ heartData.heartData.systolicPressure } unit="mmHg" />
            <InputConfirmation className="confirm--diastolic" label={ language.diastolicPressure } content={ heartData.heartData.diastolicPressure } unit="mmHg" />
            <InputConfirmation className="confirm--heartRate" label={ language.heartRate } content={ heartData.heartData.heartRate } unit="bpm" />
            <InputConfirmation className="confirm--bloodSugarLevel" label={ language.bloodSugarLevel } content={ heartData.heartData.bloodSugar } unit={ heartData.heartData.bloodSugarUnit } />

            <div className="buttonContainer">
                <Button ariaLabel="cancel submission" onClick={() => verifyInput(false)} label={ language.buttonCancel } />
                <Button ariaLabel="confirm submission" onClick={() => verifyInput(true, heartData.date, {...heartData.heartData})} label={ language.buttonOK } />
            </div>

        </form>
    );
};