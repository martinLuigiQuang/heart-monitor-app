export function mmoll_to_mgdl(value: string): string {
    return value ? `${Math.ceil(parseFloat(value) * 18 * 10) / 10}` : '';
};

export function mgdl_to_mmoll(value: string): string {
    return value ? `${Math.ceil(parseFloat(value) * 10 / 18) / 10}` : '';
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