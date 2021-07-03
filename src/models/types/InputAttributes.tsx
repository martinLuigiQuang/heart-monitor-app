type InputAttributes = {
    type: string,
    label: string,
    value?: string,
    className?: string,
    name?: string,
    placeholder?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    checked?: boolean,
    min?: string,
    max?: string,
    step?: string,
    usersDefinedUnit?: JSX.Element,
    unit?: string
    [key: string]: any
};

export default InputAttributes;