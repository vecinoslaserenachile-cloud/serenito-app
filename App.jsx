import React from 'react';
import { Secretario } from './modules/Secretaria';
import { Protocolo } from './modules/Protocolo';
import { Tecnico } from './modules/Tecnico';
import { Prensa } from './modules/Prensa';
import './styles/tailwind.css';

const App = () => {
    return (
        <div className="app-container">
            <header className="header">
                <h1 className="text-4xl font-bold text-center">S.E.R.E.N.I.T.O. System</h1>
            </header>
            <main className="main">
                <Secretario />
                <Protocolo />
                <Tecnico />
                <Prensa />
            </main>
            <footer className="footer text-center">
                <p className="text-sm">© 2026 S.E.R.E.N.I.T.O. System</p>
            </footer>
        </div>
    );
};

export default App;
