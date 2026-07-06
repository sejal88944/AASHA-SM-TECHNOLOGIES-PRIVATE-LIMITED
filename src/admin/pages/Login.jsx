import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    Shield,
    AlertCircle
} from 'lucide-react';
import db from '../../firebase/firestore';
import { APP_NAME } from '../../utils/constants';
import './Login.css';

const REMEMBER_EMAIL_KEY = 'adminRememberEmail';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY);
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }

        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const docRef = doc(db, 'admin', 'credentials');
            const docSnap = await getDoc(docRef);

            let storedEmail = 'adminsmtechsolution@gmail.com';
            let storedPassword = 'admin123';

            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.email) storedEmail = data.email;
                if (data.password) storedPassword = data.password;
            } else {
                await setDoc(docRef, {
                    email: storedEmail,
                    password: storedPassword
                });
            }

            if (email === storedEmail && password === storedPassword) {
                if (rememberMe) {
                    localStorage.setItem(REMEMBER_EMAIL_KEY, email);
                } else {
                    localStorage.removeItem(REMEMBER_EMAIL_KEY);
                }

                localStorage.setItem('isAdminLoggedIn', 'true');
                navigate('/aashasm-portal');
            } else {
                setError('Invalid email or password. Please check your credentials and try again.');
            }
        } catch (err) {
            console.error('Login Error:', err);
            setError('Unable to connect. Please check your internet connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <main className="admin-login-form-panel">
                <div className="admin-login-card">
                    <img
                        src="/ASM Logo.jpeg"
                        alt={APP_NAME}
                        className="admin-login-card-logo"
                    />

                    <div className="admin-login-header">
                        <div className="admin-login-badge">
                            <Shield size={14} />
                            Secure Login
                        </div>
                        <h2 className="admin-login-title">Welcome back</h2>
                        <p className="admin-login-description">
                            Sign in with your administrator credentials to continue.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} noValidate>
                        {error && (
                            <div className="admin-login-error" role="alert">
                                <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 1 }} />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="admin-login-field">
                            <label className="admin-login-label" htmlFor="admin-email">
                                Email Address
                            </label>
                            <div className="admin-login-input-wrap">
                                <Mail size={18} className="admin-login-input-icon" />
                                <input
                                    id="admin-email"
                                    type="email"
                                    className="admin-login-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="admin-login-field">
                            <label className="admin-login-label" htmlFor="admin-password">
                                Password
                            </label>
                            <div className="admin-login-input-wrap">
                                <Lock size={18} className="admin-login-input-icon" />
                                <input
                                    id="admin-password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="admin-login-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="admin-login-toggle-password"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="admin-login-options">
                            <label className="admin-login-remember">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                Remember email
                            </label>
                        </div>

                        <button type="submit" className="admin-login-submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="admin-login-spinner" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In to Dashboard'
                            )}
                        </button>
                    </form>

                    <div className="admin-login-footer">
                        <Link to="/" className="admin-login-back-link">
                            ← Back to website
                        </Link>
                    </div>
                </div>

                <p className="admin-login-copyright">
                    © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
                </p>
            </main>
        </div>
    );
};

export default Login;
