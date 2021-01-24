import { Fragment, useState } from 'react';
import { getInput, verifyInput, handleUnitConversion, handleInputChange } from './eventHandlers.js';

function Home() {
    const [inputConfirmation, setInputConfirmation] = useState(false);
    const [heartData, setHeartData] = useState([new Date(), 0, 0, 0, null, 'mmol/L']);

    return (
        <Fragment>
            <form className="dataInput wrapper" onSubmit={(event) => getInput(event, setInputConfirmation)}>
                <div className="input--date">
                    <label htmlFor="date">Date:</label>
                    <input  type="datetime-local" name="date" id="date" onChange={(event) => handleInputChange(event, heartData, setHeartData, 0)}/>
                </div>
                <div className="input--systolic">
                    <label htmlFor="systolic">Systolic Pressure:</label>
                    <input type="number" name="systolic" id="systolic" placeholder="110" onChange={(event) => handleInputChange(event, heartData, setHeartData, 1)}/>
                    <p>mmHg</p>
                </div>
                <div className="input--diastolic">
                    <label htmlFor="diastolic">Diastolic Pressure:</label>
                    <input type="number" name="diastolic" id="diastolic" placeholder="70" onChange={(event) => handleInputChange(event, heartData, setHeartData, 2)}/>
                    <p>mmHg</p>
                </div>
                <div className="input--heartRate">
                    <label htmlFor="heartRate">Heart Rate:</label>
                    <input type="number" name="heartRate" id="heartRate" placeholder="65" onChange={(event) => handleInputChange(event, heartData, setHeartData, 3)}/>
                    <p>bpm</p>
                </div>
                <div className="input--bloodSugar">
                    <label htmlFor="bloodSugar">Blood Sugar Level:</label>
                    <input type="number" name="bloodSugar" id="bloodSugar" placeholder={heartData[5] === 'mmol/L' ? 5.5 : 5.5*18} onChange={(event) => handleInputChange(event, heartData, setHeartData, 4)}/>
                    <input type="radio" name="bloodSugarUnit" value="mmol/L" id="mmol" checked={heartData[5] === 'mmol/L'} 
                           onChange={(event) => handleUnitConversion(event, heartData, setHeartData)}/>
                    <label htmlFor="mmol">mmol/L</label>
                    <input type="radio" name="bloodSugarUnit" value="mg/dL" id="mg" checked={heartData[5] === 'mg/dL'} 
                           onChange={(event) => handleUnitConversion(event, heartData, setHeartData)}/>
                    <label htmlFor="mg">mg/dL</label>
                </div>
                <button>Submit</button>
            </form>
            <form className={`overlayConfirmation ${inputConfirmation ? '' : 'hidden'}`} onSubmit={(event) => event.preventDefault()}>
                <div className="confirm--date">
                    <p>Date:</p>
                    <p>{heartData[0].toString()}</p>
                </div>
                <div className="confirm--systolic">
                    <p>Systolic Pressure:</p>
                    <p>{heartData[1]}</p>
                    <p>mmHg</p>
                </div>
                <div className="confirm--diastolic">
                    <p>Diastolic Pressure:</p>
                    <p>{heartData[2]}</p>
                    <p>mmHg</p>
                </div>
                <div className="confirm--heartRate">
                    <p>Heart Rate:</p>
                    <p>{heartData[3]}</p>
                    <p>bpm</p>
                </div>
                <div className="confirm--bloodSugar">
                    <p>Blood Sugar Level:</p>
                    <p>{heartData[4]}</p>
                    <p>{heartData[5]}</p>
                </div>
                <button onClick={() => verifyInput(setInputConfirmation, ...heartData)}>OK</button>
                <button onClick={() => setInputConfirmation(false)}>Cancel</button>
            </form>
        </Fragment>
    );
};

export default Home;