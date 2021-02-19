import DataTable from './dataTable/DataTable.js';
import HeartDataPlots from './HeartDataPlots.js';
import { BloodSugarUnitOptions } from '../input/Input.js';
import { useLanguage } from '../languageContext/LanguageContext.js';
import DatasetsProvider from './DatasetsContext.js';
import DataTableDisplayProvider from './dataTable/DataTableContext.js';
import './dashboard.css';

export default function Dashboard () {
    const language = useLanguage();
    
    return (
        <main>
            <DatasetsProvider>
                <div className="bloodSugarUnit">
                    <BloodSugarUnitOptions label={ language.bloodSugarUnit + ':' }></BloodSugarUnitOptions>
                </div>
                <DataTableDisplayProvider>
                    <DataTable />
                </DataTableDisplayProvider>
                <HeartDataPlots />
            </DatasetsProvider>
        </main>
    );
};