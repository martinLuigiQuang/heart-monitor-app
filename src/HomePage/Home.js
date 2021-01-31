import { useState } from 'react';
import { getInput, verifyInput, handleUnitConversion, handleInputChange } from './eventHandlers.js';

function Home(props) {
    const language = props.language;
    const [inputConfirmation, setInputConfirmation] = useState(false);
    const [heartData, setHeartData] = useState([new Date().toDateString(), 0, 0, 0, null, 'mmol/L']);
    const [date, systolicPressure, diastolicPressure, heartRate, bloodSugar, bloodSugarUnit] = heartData;

    function renderMainForm() {
        return (
            <form className="dataInput wrapper" onSubmit={(event) => getInput(event, setInputConfirmation)}>

                <div className="input--date">
                    <label htmlFor="date">{language.formDate}:</label>
                    <input type="datetime-local" name="date" id="date" onChange={(event) => handleInputChange(event, heartData, setHeartData, 0)}/>
                </div>

                <div className="input--systolic">
                    <label htmlFor="systolic">{language.formSystolic}:</label>
                    <input type="number" name="systolic" id="systolic" placeholder="110" onChange={(event) => handleInputChange(event, heartData, setHeartData, 1)}/>
                    <p>mmHg</p>
                </div>

                <div className="input--diastolic">
                    <label htmlFor="diastolic">{language.formDiastolic}:</label>
                    <input type="number" name="diastolic" id="diastolic" placeholder="70" onChange={(event) => handleInputChange(event, heartData, setHeartData, 2)}/>
                    <p>mmHg</p>
                </div>

                <div className="input--heartRate">
                    <label htmlFor="heartRate">{language.formHeartRate}:</label>
                    <input type="number" name="heartRate" id="heartRate" placeholder="65" onChange={(event) => handleInputChange(event, heartData, setHeartData, 3)}/>
                    <p>bpm</p>
                </div>

                <div className="input--bloodSugar">
                    <label htmlFor="bloodSugar">{language.formBloodSugarLevel}:</label>
                    <input type="number" step="0.1" name="bloodSugar" id="bloodSugar" placeholder={bloodSugarUnit === 'mmol/L' ? 5.5 : 5.5*18} onChange={(event) => handleInputChange(event, heartData, setHeartData, 4)}/>
                    <input type="radio" name="bloodSugarUnit" value="mmol/L" id="mmol" checked={bloodSugarUnit === 'mmol/L'} 
                            onChange={(event) => handleUnitConversion(event, heartData, setHeartData)}/>
                    <label htmlFor="mmol">mmol/L</label>
                    <input type="radio" name="bloodSugarUnit" value="mg/dL" id="mg" checked={bloodSugarUnit === 'mg/dL'} 
                            onChange={(event) => handleUnitConversion(event, heartData, setHeartData)}/>
                    <label htmlFor="mg">mg/dL</label>
                </div>

                <button aria-label="submit heart data">{language.buttonSubmit}</button>

            </form>
        );
    };

    function renderOverlayConfirmation() {
        return (
            <form className={`overlayConfirmation wrapper ${inputConfirmation ? '' : 'hidden'}`} onSubmit={(event) => event.preventDefault()}>
                
                <div className="confirm--date">
                    <p>{language.formDate}:</p>
                    <p>{date.toString()}</p>
                </div>

                <div className="confirm--systolic">
                    <p>{language.formSystolic}:</p>
                    <p>{systolicPressure}</p>
                    <p>mmHg</p>
                </div>

                <div className="confirm--diastolic">
                    <p>{language.formDiastolic}:</p>
                    <p>{diastolicPressure}</p>
                    <p>mmHg</p>
                </div>

                <div className="confirm--heartRate">
                    <p>{language.formHeartRate}:</p>
                    <p>{heartRate}</p>
                    <p>bpm</p>
                </div>

                <div className="confirm--bloodSugar">
                    <p>{language.formBloodSugarLevel}:</p>
                    <p>{bloodSugar}</p>
                    <p>{bloodSugar ? bloodSugarUnit : null}</p>
                </div>

                <div className="buttonContainer">
                    <button aria-label="cancel submission" onClick={() => setInputConfirmation(false)}>{language.buttonCancel}</button>
                    <button aria-label="confirm submission" onClick={() => verifyInput(setInputConfirmation, ...heartData)}>{language.buttonOK}</button>
                </div>

            </form>
        );
    };
    
    return (
        <main>
            { renderMainForm() }
            { renderOverlayConfirmation() }
        </main>
    );
};

export default Home;