import Data from '../types/Data';
import HeartData from '../types/HeartData';

interface UserInput {
    heartData: HeartData,
    getInput: (event: React.SyntheticEvent) => void,
    handleInputChange: (value: string, key?: keyof Data) => void,
    handleUnitConversion: (newUnit: string, value: string) => void
};

export default UserInput;