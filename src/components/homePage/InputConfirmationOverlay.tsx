import Confirmation from '../common/confirmation/Confirmation';
import Button from '../common/button/Button';
import { useLanguage } from '../common/languageContext/LanguageContext';
import { useInput, useInputVerification} from './UserInputContext';

export default function InputConfirmationOverlay (): JSX.Element | null {
    const languageObj = useLanguage();
    const userInputObj = useInput();
    const inputVerification = useInputVerification();

    if (inputVerification && userInputObj && languageObj) {
        const { language } = languageObj;
        const { heartData } = userInputObj;
        const { inputConfirmation, verifyInput } = inputVerification;

        return (
            <form className={`overlayConfirmation wrapper ${inputConfirmation ? '' : 'hidden'}`} onSubmit={event => event.preventDefault()}>
                
                <Confirmation className="confirm--date" label={ language.date } content={ heartData.date.toString() } />
                <Confirmation className="confirm--systolic" label={ language.systolicPressure } content={ heartData.heartData.systolicPressure } unit="mmHg" />
                <Confirmation className="confirm--diastolic" label={ language.diastolicPressure } content={ heartData.heartData.diastolicPressure } unit="mmHg" />
                <Confirmation className="confirm--heartRate" label={ language.heartRate } content={ heartData.heartData.heartRate } unit="bpm" />
                <Confirmation className="confirm--bloodSugarLevel" label={ language.bloodSugarLevel } content={ heartData.heartData.bloodSugar } unit={ heartData.heartData.bloodSugarUnit } />
    
                <div className="buttonContainer">
                    <Button ariaLabel="cancel submission" onClick={() => verifyInput(false)} label={ language.buttonCancel } />
                    <Button ariaLabel="confirm submission" onClick={() => verifyInput(true, heartData.date, {...heartData.heartData})} label={ language.buttonOK } />
                </div>
    
            </form>
        );
    };

    return null;
};