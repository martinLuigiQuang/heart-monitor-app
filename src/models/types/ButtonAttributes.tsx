type ButtonAttributes = {
    label: string,
    ariaLabel: string,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean,
    [key: string]: any
};

export default ButtonAttributes;