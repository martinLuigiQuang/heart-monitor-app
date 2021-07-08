import DataTable from './dataTable/DataTable';
import HeartDataPlots from './HeartDataPlots';
import UnitOptions from '../common/unitOptions/UnitOptions';
import Select from '../common/select/Select';
import { getYearOptions } from '../common/yearOptionContext/YearOptionContext';
import { useLanguage } from '../common/languageContext/LanguageContext';
import { useYearOption } from '../common/yearOptionContext/YearOptionContext';
import DataTableProvider from './dataTable/DataTableContext';
import './Dashboard.css';

export default function Dashboard (): JSX.Element | null {
    const languageObj = useLanguage();
    const yearOptionObj = useYearOption();

    if ( languageObj && yearOptionObj ) {
        const { language } = languageObj;
        const { yearOption, setYearOption } = yearOptionObj;
        return (
            <div className="dashboard">
                <Select 
                    className="yearSelection" 
                    options={ getYearOptions() } 
                    value={ yearOption }
                    label={ language.yearSelection } 
                    onChange={ event => setYearOption(event.target.value) }
                />
                <div className="bloodSugarUnit">
                    <UnitOptions label={ language.bloodSugarUnit + ':' } />
                </div>
                <DataTableProvider>
                    <DataTable />
                </DataTableProvider>
                <HeartDataPlots />
            </div>
        );
    };

    return null;
};