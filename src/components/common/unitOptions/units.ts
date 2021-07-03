import Units from "../../../models/types/Units";

export function mmoll_to_mgdl(value: string): string {
    return value ? `${(parseFloat(value) * 18).toFixed(0)}` : '';
};

export function mgdl_to_mmoll(value: string): string {
    return value ? `${(parseFloat(value) / 18).toFixed(1)}` : '';
};

const UNITS: Units = {
    'MMOLL': 'mmol/L',
    'MGDL': 'mg/dL'
};

export default UNITS;