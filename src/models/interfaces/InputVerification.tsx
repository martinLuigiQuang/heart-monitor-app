import Data from '../types/Data';

interface InputVerification {
    inputConfirmation: boolean,
    verifyInput: (verified: boolean, date?: string, data?: Data) => void
};

export default InputVerification;