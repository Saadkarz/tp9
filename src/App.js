import React from 'react';
import CompteList from './components/CompteList';
import CompteForm from './components/CompteForm';
import './App.css';

function App() {
    return (
        <div className="App">
            <div className="app-header">
                <h1>Gestion des Comptes Bancaires</h1>
                <p>Gérez vos comptes courants et d'épargne en toute simplicité</p>
            </div>
            <div className="modern-container">
                <CompteForm />
                <CompteList />
            </div>
        </div>
    );
}

export default App;