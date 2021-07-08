import { useLanguage } from '../../common/languageContext/LanguageContext';
import { useEntryDelete } from '../DatasetsContext';
import Button from '../../common/button/Button';

export default function EntryDeleteConfirmation (): JSX.Element | null {
    const languageObj = useLanguage();
    const deleteEntryObj = useEntryDelete();
   
    if (languageObj && deleteEntryObj) {
        const { language } = languageObj;
        const { deleteConfirmation, setDeleteConfirmation, dateToBeDeleted, setDateToBeDeleted, idToBeDeleted, setIdToBeDeleted, deleteEntry } = deleteEntryObj;

        return (
            <div className={`transparent ${ deleteConfirmation ? '' : 'hidden' }`}>
                <form className={ `overlayConfirmation wrapper ${ deleteConfirmation ? '' : 'hidden' }` } onSubmit={event => event.preventDefault()}>
                    <h3>{ `${ language.deleteConfirmation } ${ dateToBeDeleted } ?` }</h3>
                    <div className="buttonsContainer">
                        <Button 
                            ariaLabel="cancel entry deletion" label={ language.buttonCancel } 
                            onClick={ () => setDeleteConfirmation(false) }
                        />
                        <Button 
                            ariaLabel="proceed with entry deletion" label={ language.buttonOK } 
                            onClick={
                                () => { 
                                    setDeleteConfirmation(false);
                                    setDateToBeDeleted('');
                                    setIdToBeDeleted('');
                                    deleteEntry(idToBeDeleted);
                                }
                            }
                        />
                    </div>
                </form>
            </div>
        );
    };

    return null;
};