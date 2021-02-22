import DataTable from './dataTable/DataTable.js';
import HeartDataPlots from './HeartDataPlots.js';
import { BloodSugarUnitOptions } from '../input/Input';
import { useLanguage } from '../languageContext/LanguageContext';
import DatasetsProvider from './DatasetsContext';
import DataTableDisplayProvider from './dataTable/DataTableContext';
import './dashboard.css';

export default function Dashboard () {
    const { language } = useLanguage();
    
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