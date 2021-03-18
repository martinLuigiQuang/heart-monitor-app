import { useLanguage, LanguageType } from '../../common/languageContext/LanguageContext';
import { useEntryDelete, DeleteEntryType } from '../DatasetsContext';
import Button from '../../common/button/Button';

export default function EntryDeleteConfirmation () {
    const { language } = useLanguage() as LanguageType;
    const { deleteConfirmation, setDeleteConfirmation, dateToBeDeleted, setDateToBeDeleted, idToBeDeleted, setIdToBeDeleted, deleteEntry } = useEntryDelete() as DeleteEntryType;
   
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
                        onClick={() => { 
                            setDeleteConfirmation(false);
                            setDateToBeDeleted('');
                            setIdToBeDeleted('');
                            deleteEntry(idToBeDeleted);
                        }}
                    />
                </div>
            </form>
        </div>
    );
};