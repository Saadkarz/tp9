import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteList() {
    const [comptes, setComptes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchComptes();
    }, []);

    const fetchComptes = () => {
        setLoading(true);
        axios.get(`${API_BASE_URL}/comptes`)
            .then(response => {
                setComptes(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'MAD'
        }).format(amount || 0);
    };

    return (
        <div className="modern-card">
            <div className="card-header">
                <h2>
                    <span className="card-icon">≡</span>
                    Liste des Comptes
                </h2>
            </div>

            {loading ? (
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            ) : comptes.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">∅</div>
                    <p><strong>Aucun compte disponible</strong></p>
                    <p style={{ fontSize: '0.95rem', opacity: 0.7, marginTop: '0.5rem' }}>
                        Ajoutez votre premier compte en utilisant le formulaire ci-dessus
                    </p>
                </div>
            ) : (
                <div className="modern-table-container">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Solde</th>
                                <th>Date de Création</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comptes.map(compte => (
                                <tr key={compte.id}>
                                    <td><strong>#{compte.id}</strong></td>
                                    <td><strong style={{ color: '#10b981' }}>{formatCurrency(compte.solde)}</strong></td>
                                    <td>{formatDate(compte.dateCreation)}</td>
                                    <td>
                                        <span className={`badge badge-${compte.type.toLowerCase()}`}>
                                            {compte.type === 'COURANT' ? 'Courant' : 'Épargne'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {comptes.length > 0 && (
                <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
                    borderRadius: '12px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    border: '2px solid #e5e7eb'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
                            Total des Comptes
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#8b5cf6' }}>
                            {comptes.length}
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
                            Solde Total
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#10b981' }}>
                            {formatCurrency(comptes.reduce((sum, compte) => sum + (compte.solde || 0), 0))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CompteList;