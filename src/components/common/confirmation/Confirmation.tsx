export type ConfirmationType = {
    className: string,
    label: string,
    content: string,
    unit?: string
};

export default function Confirmation ({ className, label, content, unit }: ConfirmationType): JSX.Element {
    return (
        <div className={ className }>
            <p>{ label }</p>
            <p>{ content ? content : 0 }</p>
            { unit ? <p>{ unit }</p> : null }
        </div>
    );
};