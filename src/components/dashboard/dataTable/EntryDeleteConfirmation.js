import { useLanguage } from '../../languageContext/LanguageContext.js';
import { useEntryDelete } from '../DatasetsContext.js';
import Button from '../../button/Button.js';

export default function EntryDeleteConfirmation () {
    const language = useLanguage();
    const { deleteConfirmation, setDeleteConfirmation, entryToBeDeleted, setEntryToBeDeleted, idToBeDeleted, setIdToBeDeleted, deleteEntry } = useEntryDelete();
    const dateNode = [...entryToBeDeleted.target.parentNode.parentNode.parentNode.children[0].children].filter(node => node.offsetTop === entryToBeDeleted.target.offsetTop)[0];
    const datetime = `${dateNode.firstChild.innerText} ${language.timeAt} ${dateNode.lastChild.innerText}`;
    return (
        <div className={`transparent ${ deleteConfirmation ? '' : 'hidden' }`}>
            <form className={ `overlayConfirmation wrapper ${ deleteConfirmation ? '' : 'hidden' }` } onSubmit={event => event.preventDefault()}>
                <h3>{ `${ language.deleteConfirmation } ${ datetime } ?` }</h3>
                <div className="buttonsContainer">
                    <Button label={ language.buttonCancel } onClick={() => setDeleteConfirmation(false) }></Button>
                    <Button label={ language.buttonOK } onClick={() => { 
                        setDeleteConfirmation(false);
                        setEntryToBeDeleted(null);
                        setIdToBeDeleted(null);
                        deleteEntry(idToBeDeleted);
                    }}></Button>
                </div>
            </form>
        </div>
    );
};