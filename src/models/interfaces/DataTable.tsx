import Dataset from "../types/Dataset";

interface DataTable {
    numOfEntries: number,
    addDecimalPlace: (value: number) => string,
    handleShowMore: (datasets: Dataset[]) => number
};

export default DataTable;