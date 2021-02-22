import './home.css';
import UserInputProvider from './UserInputContext';
import InputForm from './InputForm';
import InputConfirmationOverlay from './InputConfirmationOverlay.js';

export default function Home () {
    return (
        <UserInputProvider>
            <main>
                <InputForm />
                <InputConfirmationOverlay />
            </main>
        </UserInputProvider>
    );
};