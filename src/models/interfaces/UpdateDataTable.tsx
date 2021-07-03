import Data from "../types/Data";

interface UpdateDataTable {
    updateEntry: (id: string, date: string, data: Data) => void,
    updatedId: string,
    setUpdatedId: React.Dispatch<React.SetStateAction<string>>
};

export default UpdateDataTable;