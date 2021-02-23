import './home.css';
import UserInputProvider from './UserInputContext';
import InputForm from './InputForm';
import InputConfirmationOverlay from './InputConfirmationOverlay';

export default function Home (): JSX.Element {
    return (
        <UserInputProvider>
            <main>
                <InputForm />
                <InputConfirmationOverlay />
            </main>
        </UserInputProvider>
    );
};