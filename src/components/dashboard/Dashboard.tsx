import DataTable from './dataTable/DataTable';
import HeartDataPlots from './HeartDataPlots';
import UnitOptions from '../common/unitOptions/UnitOptions';
import Select from '../common/select/Select';
import { getYearOptions } from '../common/yearOptionContext/YearOptionContext';
import { useLanguage, LanguageType } from '../common/languageContext/LanguageContext';
import { useYearOption, YearOptionType } from '../common/yearOptionContext/YearOptionContext';
import DataTableDisplayProvider from './dataTable/DataTableContext';
import './Dashboard.css';

export default function Dashboard (): JSX.Element {
    const { language } = useLanguage() as LanguageType;
    const { yearOption, setYearOption } = useYearOption() as YearOptionType;

    return (
        <div className="dashboard">
            <Select className="yearSelection" 
                    options={ getYearOptions() } 
                    value={ yearOption }
                    label={ language.yearSelection } 
                    onChange={ event => setYearOption(event.target.value) }
            />
            <div className="bloodSugarUnit">
                <UnitOptions label={ language.bloodSugarUnit + ':' } />
            </div>
            <DataTableDisplayProvider>
                <DataTable />
            </DataTableDisplayProvider>
            <HeartDataPlots />
        </div>
    );
};