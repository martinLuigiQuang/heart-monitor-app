const currentDate = new Date();

function convertToDoubleDigit(value: number): string {
    return value >= 10 ? '' + value : '0' + value;
};

export default function getCurrentDate(): string {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    return `${year}-${convertToDoubleDigit(month)}-${convertToDoubleDigit(date)}T${convertToDoubleDigit(hours)}:${convertToDoubleDigit(minutes)}`;
}

