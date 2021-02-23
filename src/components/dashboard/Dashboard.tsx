import DataTable from './dataTable/DataTable';
import HeartDataPlots from './HeartDataPlots';
import { BloodSugarUnitOptions } from '../input/Input';
import { useLanguage, LanguageType } from '../languageContext/LanguageContext';
import DatasetsProvider from './DatasetsContext';
import DataTableDisplayProvider from './dataTable/DataTableContext';
import './dashboard.css';

export default function Dashboard (): JSX.Element {
    const { language } = useLanguage() as LanguageType;
    
    return (
        <DatasetsProvider>
            <main>
                <div className="bloodSugarUnit">
                    <BloodSugarUnitOptions label={ language.bloodSugarUnit + ':' }></BloodSugarUnitOptions>
                </div>
                <DataTableDisplayProvider>
                    <DataTable />
                </DataTableDisplayProvider>
                <HeartDataPlots />
            </main>
        </DatasetsProvider>
    );
};