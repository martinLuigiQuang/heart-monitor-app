import { useLanguage } from '../../languageContext/LanguageContext';
import { useEntryDelete } from '../DatasetsContext';
import Button from '../../button/Button';

export default function EntryDeleteConfirmation () {
    const { language } = useLanguage();
    const { deleteConfirmation, setState_deleteConfirmation, dateToBeDeleted, setState_dateToBeDeleted, idToBeDeleted, setState_idToBeDeleted, deleteEntry } = useEntryDelete();
   
    return (
        <div className={`transparent ${ deleteConfirmation ? '' : 'hidden' }`}>
            <form className={ `overlayConfirmation wrapper ${ deleteConfirmation ? '' : 'hidden' }` } onSubmit={event => event.preventDefault()}>
                <h3>{ `${ language.deleteConfirmation } ${ dateToBeDeleted } ?` }</h3>
                <div className="buttonsContainer">
                    <Button label={ language.buttonCancel } onClick={() => setState_deleteConfirmation(false) }></Button>
                    <Button label={ language.buttonOK } onClick={() => { 
                        setState_deleteConfirmation(false);
                        setState_dateToBeDeleted('');
                        setState_idToBeDeleted('');
                        deleteEntry(idToBeDeleted);
                    }}></Button>
                </div>
            </form>
        </div>
    );
};