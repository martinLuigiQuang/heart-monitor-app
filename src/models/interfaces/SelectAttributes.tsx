interface SelectAttributes {
    className: string,
    options: string[],
    value: string,
    label?: string,
    onChange?: React.ChangeEventHandler<HTMLSelectElement>
};

export default SelectAttributes;