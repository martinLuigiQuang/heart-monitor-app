/**
 * Set input confirmation state to 'true' to open the overlay confirmation tab
 * User can confirm or cancel submission of data from the confirmation tab
 */
export function getInput(event, setInputConfirmation) {
    event.preventDefault();
    setInputConfirmation(true);
};

/**
 * Upon user's confirmation of data submission, create the MongoDB doc to be pushed to the data collection
 * Set input confirmation state to 'false' to close confirmation tab
 * @param {function} setInputConfirmation The react hook method to set input confirmation state
 */
export function verifyInput(setInputConfirmation) {
    const mongoDBDoc = {
        date: arguments[1],
        systolicPressure: arguments[2],
        diastolicPressure: arguments[3],
        heartRate: arguments[4],
        bloodSugar: arguments[5],
        bloodSugarUnit: arguments[5] !== null ? arguments[6] : null
    };
    console.log(mongoDBDoc);
    setInputConfirmation(false);
};

/**
 * Handle the unit conversion between mmol/L and mg/dL
 * Update the heart data state according to the new value and unit
 * @param {SyntheticBaseEvent} event The react onChange event that is attached to the radio input
 * @param {Array} heartData The react hook state array that contains the heart data
 * @param {function} setHeartData The react hook method to set the heart data state
 */
export function handleUnitConversion(event, heartData, setHeartData) {
    const oldUnit = heartData[5];
    let localData = [...heartData];
    localData[5] = event.target.value;
    setHeartData(localData);
    if (oldUnit === 'mg/dL' && heartData[4]) {
        event.target.parentNode.children[1].value = Math.ceil(event.target.parentNode.children[1].value * 10 / 18) / 10;
        localData[4] = event.target.parentNode.children[1].value;
        setHeartData(localData);
    } else if (oldUnit === 'mmol/L' && heartData[4]) {
        event.target.parentNode.children[1].value = Math.ceil(event.target.parentNode.children[1].value * 18 * 10) / 10;
        localData[4] = event.target.parentNode.children[1].value;
        setHeartData(localData);
    };
};

/**
 * Gather the information about a new data input and update the heart data state array
 * @param {SyntheticBaseEvent} event The react onChange event that is attached to the input fields
 * @param {Array} heartData The react hook state array that contains the heart data
 * @param {function} setHeartData The react hook method to set the heart data state
 * @param {integer} index The indexed position of a particular data to be updated in the heart data array
 */
export function handleInputChange(event, heartData, setHeartData, index) {
    const localData = [...heartData];
    localData[index] = event.target.value;
    setHeartData(localData);
};