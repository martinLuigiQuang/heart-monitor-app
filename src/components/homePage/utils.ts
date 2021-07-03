import UNITS, { mmoll_to_mgdl } from '../common/unitOptions/units';

const currentDate = new Date();

function convertToDoubleDigit(value: number): string {
    return value >= 10 ? '' + value : '0' + value;
};

export function convertUnits(value: string, unit: string): string {
    return unit === UNITS.MMOLL ? value : mmoll_to_mgdl(value);
};

export function autoConvertUnits(value: string, unit: string, handleUnitConversion: (newUnit: string, value: string) => void): void {
    if (parseInt(value) > 15.5 && unit === UNITS.MMOLL) { handleUnitConversion(UNITS.MGDL, value) };
    if (parseInt(value) <= 15.5 && unit === UNITS.MGDL) { handleUnitConversion(UNITS.MMOLL, value) };
};

export default function getCurrentDate(): string {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    return `${year}-${convertToDoubleDigit(month)}-${convertToDoubleDigit(date)}T${convertToDoubleDigit(hours)}:${convertToDoubleDigit(minutes)}`;
};

