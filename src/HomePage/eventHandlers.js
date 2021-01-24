export function getInput(event, setInputConfirmation) {
    event.preventDefault();
    setInputConfirmation(true);
};

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

export function handleUnitConversion(event, heartData, setHeartData) {
    const oldUnit = heartData[5];
    let localData = [...heartData];
    localData[5] = event.target.value;
    setHeartData(localData);
    if (oldUnit === 'mg/dL' && heartData[4]) {
        event.target.parentNode.children[1].value /= 18;
        localData[4] = event.target.parentNode.children[1].value;
        setHeartData(localData);
    } else if (oldUnit === 'mmol/L' && heartData[4]) {
        event.target.parentNode.children[1].value *= 18;
        localData[4] = event.target.parentNode.children[1].value;
        setHeartData(localData);
    };
};

export function handleInputChange(event, heartData, setHeartData, index) {
    const localData = [...heartData];
    localData[index] = event.target.value;
    setHeartData(localData);
};