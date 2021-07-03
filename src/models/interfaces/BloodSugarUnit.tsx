import Units from "../types/Units";

interface BloodSugarUnit {
    bloodSugarUnit: string,
    handleUnitConversion: (value: keyof Units) => void
};

export default BloodSugarUnit;