interface DeleteEntry {
    deleteEntry: (id: string) => void,
    dateToBeDeleted: string,
    setDateToBeDeleted: React.Dispatch<React.SetStateAction<string>>,
    idToBeDeleted: string,
    setIdToBeDeleted: React.Dispatch<React.SetStateAction<string>>,
    deleteConfirmation: boolean,
    setDeleteConfirmation: React.Dispatch<React.SetStateAction<boolean>>
};

export default DeleteEntry;