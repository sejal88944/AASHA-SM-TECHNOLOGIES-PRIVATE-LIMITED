import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from '../../firebase/firestore';
import HiringSettings from '../components/HiringSettings';

import SparkleSettings from '../components/SparkleSettings';

const Settings = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const docRef = doc(db, "admin", "credentials");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setEmail(docSnap.data().email);
                    setPassword(docSnap.data().password);
                }
            } catch (err) {
                console.error("Error fetching credentials:", err);
                setError("Failed to load current credentials.");
            }
        };
        fetchCredentials();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const docRef = doc(db, "admin", "credentials");
            await updateDoc(docRef, {
                email: email,
                password: password
            });
            setMessage('Credentials updated successfully!');
        } catch (err) {
            console.error("Error updating credentials:", err);
            setError('Failed to update credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '24px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', color: '#1a1a1a' }}>Admin Settings</h1>

            <div style={{ maxWidth: '500px' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#4a4a4a' }}>Update Login Credentials</h2>

                {message && (
                    <div style={{ padding: '12px', marginBottom: '20px', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '6px' }}>
                        {message}
                    </div>
                )}

                {error && (
                    <div style={{ padding: '12px', marginBottom: '20px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleUpdate}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#4a4a4a', fontSize: '14px' }}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#4a4a4a', fontSize: '14px' }}>New Password</label>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px' }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '16px',
                            fontWeight: '500',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Updating...' : 'Update Credentials'}
                    </button>
                </form>
            </div>

            <HiringSettings />
            <SparkleSettings />
        </div>
    );
};

export default Settings;
