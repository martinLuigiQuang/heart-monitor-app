import DataTable from './dataTable/DataTable';
import HeartDataPlots from './HeartDataPlots';
import UnitOptions from '../common/unitOptions/UnitOptions';
import { useLanguage, LanguageType } from '../common/languageContext/LanguageContext';
import DatasetsProvider from './DatasetsContext';
import DataTableDisplayProvider from './dataTable/DataTableContext';
import './Dashboard.css';

export default function Dashboard (): JSX.Element {
    const { language } = useLanguage() as LanguageType;
    
    return (
        <DatasetsProvider>
            <div className="dashboard">
                <div className="bloodSugarUnit">
                    <UnitOptions label={ language.bloodSugarUnit + ':' } />
                </div>
                <DataTableDisplayProvider>
                    <DataTable />
                </DataTableDisplayProvider>
                <HeartDataPlots />
            </div>
        </DatasetsProvider>
    );
};