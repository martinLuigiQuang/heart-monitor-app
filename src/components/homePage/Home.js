import './home.css';
import UserInputProvider from './UserInputContext.js';
import InputForm from './InputForm.js';
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