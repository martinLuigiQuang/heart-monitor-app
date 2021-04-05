export function mmoll_to_mgdl(value: string): string {
    return value ? `${(parseFloat(value) * 18).toFixed(0)}` : '';
};

export function mgdl_to_mmoll(value: string): string {
    return value ? `${(parseFloat(value) / 18).toFixed(1)}` : '';
};

export type UnitsType = {
    'MMOLL': string,
    'MGDL': string
};

const UNITS: UnitsType = {
    'MMOLL': 'mmol/L',
    'MGDL': 'mg/dL'
};

export default UNITS;