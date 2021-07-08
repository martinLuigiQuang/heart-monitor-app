import ConfirmationProps from '../../../models/types/Confirmation';

export default function Confirmation ({ className, label, content, unit }: ConfirmationProps): JSX.Element {
    return (
        <div className={ className }>
            <p>{ label }</p>
            <p>{ content ? content : 0 }</p>
            { unit ? <p>{ unit }</p> : null }
        </div>
    );
};