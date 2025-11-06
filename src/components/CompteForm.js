import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm({ onCompteAdded }) {
    const [compte, setCompte] = useState({ solde: '', dateCreation: '', type: 'COURANT' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        setCompte({ ...compte, [e.target.name]: e.target.value });
        setMessage({ text: '', type: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!compte.solde || !compte.dateCreation || !compte.type) {
            setMessage({ text: 'Veuillez remplir tous les champs', type: 'error' });
            return;
        }

        setIsSubmitting(true);
        setMessage({ text: '', type: '' });

        const compteData = {
            solde: parseFloat(compte.solde),
            dateCreation: compte.dateCreation,
            type: compte.type
        };

        axios.post(`${API_BASE_URL}/comptes`, compteData)
            .then(response => {
                setMessage({ text: 'Compte ajouté avec succès!', type: 'success' });
                setCompte({ solde: '', dateCreation: '', type: 'COURANT' });
                setTimeout(() => {
                    setMessage({ text: '', type: '' });
                    if (onCompteAdded) {
                        onCompteAdded();
                    }
                }, 2000);
            })
            .catch(error => {
                console.error('Erreur détaillée:', error.response || error);
                const errorMsg = error.response?.data?.message ||
                                error.message ||
                                'Erreur lors de l\'ajout du compte. Vérifiez que le serveur est démarré.';
                setMessage({ text: errorMsg, type: 'error' });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="modern-card">
            <div className="card-header">
                <h2>
                    <span className="card-icon">+</span>
                    Ajouter un Compte
                </h2>
            </div>
            <form onSubmit={handleSubmit} className="modern-form">
                <div className="form-group">
                    <label htmlFor="solde">Solde Initial</label>
                    <input
                        type="number"
                        id="solde"
                        name="solde"
                        className="form-control"
                        onChange={handleChange}
                        value={compte.solde}
                        placeholder="Entrez le solde initial"
                        step="0.01"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateCreation">Date de Création</label>
                    <input
                        type="date"
                        id="dateCreation"
                        name="dateCreation"
                        className="form-control"
                        onChange={handleChange}
                        value={compte.dateCreation}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type de Compte</label>
                    <select
                        id="type"
                        name="type"
                        className="form-select"
                        onChange={handleChange}
                        value={compte.type}
                        required
                    >
                        <option value="COURANT">Courant</option>
                        <option value="EPARGNE">Épargne</option>
                    </select>
                </div>

                {message.text && (
                    <div style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '12px',
                        background: message.type === 'success' ?
                            'linear-gradient(135deg, #d1fae5, #a7f3d0)' :
                            'linear-gradient(135deg, #fee2e2, #fecaca)',
                        color: message.type === 'success' ? '#065f46' : '#991b1b',
                        fontWeight: '600',
                        textAlign: 'center',
                        border: `2px solid ${message.type === 'success' ? '#10b981' : '#ef4444'}`,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}>
                        {message.text}
                    </div>
                )}

                <button
                    type="submit"
                    className="modern-btn modern-btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'En cours...' : 'Ajouter le Compte'}
                </button>
            </form>
        </div>
    );
}

export default CompteForm;