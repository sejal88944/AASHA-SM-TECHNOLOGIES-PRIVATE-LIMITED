import React, { useState, useEffect } from 'react';
import db from '../../firebase/firestore';
import { collection, getDocs, setDoc, doc, query, orderBy, deleteDoc } from 'firebase/firestore';
import { RefreshCw, Star, Trash2, ExternalLink, ShieldCheck, AlertCircle, Save, Settings } from 'lucide-react';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [apiKey, setApiKey] = useState(localStorage.getItem('google_maps_api_key') || '');
    const [showApiKeyInput, setShowApiKeyInput] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const placeId = 'ChIJ0Tw7XskjwTsR8KOWSZWtUHM';

    useEffect(() => {
        fetchReviewsFromFirestore();
    }, []);

    const fetchReviewsFromFirestore = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'google_reviews'), orderBy('timestamp', 'desc'));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setReviews(data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setMessage({ type: 'error', text: 'Failed to load reviews from Firestore.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSync = async () => {
        if (!apiKey) {
            setShowApiKeyInput(true);
            setMessage({ type: 'warning', text: 'Please enter a Google Maps API Key to sync with Google.' });
            return;
        }

        setSyncing(true);
        setMessage({ type: 'info', text: 'Syncing reviews with Google Maps...' });

        try {
            // Using Google Places API via a proxy or direct fetch if key is valid
            // Note: In a real production app, this should go through a backend to protect the API key
            const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

            // For the sake of this implementation, we try to fetch. 
            // If CORS is an issue, we'd need a proxy.
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'OK' && data.result?.reviews) {
                const fetchedReviews = data.result.reviews;

                // Save each review to Firestore
                const batchPromises = fetchedReviews.map(review => {
                    const reviewId = `google_${review.time}_${review.author_name.replace(/\s+/g, '_')}`;
                    return setDoc(doc(db, 'google_reviews', reviewId), {
                        name: review.author_name,
                        rating: review.rating,
                        text: review.text,
                        img: review.profile_photo_url,
                        date: review.relative_time_description,
                        timestamp: review.time,
                        source: 'google'
                    });
                });

                await Promise.all(batchPromises);
                setMessage({ type: 'success', text: `Successfully synced ${fetchedReviews.length} reviews from Google!` });
                fetchReviewsFromFirestore();
            } else {
                throw new Error(data.error_message || 'No reviews found or invalid API key.');
            }
        } catch (error) {
            console.error("Sync error:", error);
            setMessage({ type: 'error', text: `Sync failed: ${error.message}. Make sure the API key is valid and has Places API enabled.` });
        } finally {
            setSyncing(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this review from your website?')) return;

        try {
            await deleteDoc(doc(db, 'google_reviews', id));
            setReviews(reviews.filter(r => r.id !== id));
            setMessage({ type: 'success', text: 'Review removed successfully.' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to delete review.' });
        }
    };

    const saveApiKey = () => {
        localStorage.setItem('google_maps_api_key', apiKey);
        setShowApiKeyInput(false);
        setMessage({ type: 'success', text: 'API Key saved locally.' });
    };

    return (
        <div style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#1a1a1a', marginBottom: '8px' }}>Google Reviews</h1>
                    <p style={{ color: '#666', fontSize: '15px' }}>Manage and sync your GMB reviews for the homepage.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                        style={{
                            padding: '10px 20px',
                            background: '#f8f9fa',
                            border: '1px solid #e1e4e8',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '600',
                            color: '#555'
                        }}
                    >
                        <Settings size={18} />
                        API Config
                    </button>
                    <button
                        onClick={handleSync}
                        disabled={syncing}
                        style={{
                            padding: '10px 24px',
                            background: 'var(--accent)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '700',
                            boxShadow: '0 4px 12px rgba(242, 101, 34, 0.3)',
                            opacity: syncing ? 0.7 : 1
                        }}
                    >
                        <RefreshCw size={18} className={syncing ? 'animate-spin' : ''} />
                        {syncing ? 'Syncing...' : 'Sync with Google'}
                    </button>
                </div>
            </div>

            {message.text && (
                <div style={{
                    padding: '16px',
                    borderRadius: '12px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: message.type === 'error' ? '#fef2f2' : message.type === 'warning' ? '#fffbeb' : '#f0fdf4',
                    color: message.type === 'error' ? '#991b1b' : message.type === 'warning' ? '#92400e' : '#166534',
                    border: `1px solid ${message.type === 'error' ? '#f87171' : message.type === 'warning' ? '#fbbf24' : '#86efac'}`
                }}>
                    {message.type === 'error' ? <AlertCircle size={20} /> : <ShieldCheck size={20} />}
                    <span style={{ fontWeight: '500' }}>{message.text}</span>
                </div>
            )}

            {showApiKeyInput && (
                <div style={{
                    padding: '24px',
                    background: '#f8f9fa',
                    borderRadius: '16px',
                    border: '1px solid #e1e4e8',
                    marginBottom: '30px'
                }}>
                    <h3 style={{ marginBottom: '12px', fontWeight: '700' }}>Google Maps API Key</h3>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                        To sync reviews automatically, you need a Google Cloud API key with the <b>Places API</b> enabled.
                    </p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <input
                            type="password"
                            placeholder="Enter your Google Maps API Key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border: '1px solid #ddd'
                            }}
                        />
                        <button
                            onClick={saveApiKey}
                            style={{
                                padding: '12px 24px',
                                background: '#1a1a1a',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            <Save size={18} style={{ marginRight: '8px' }} />
                            Save Key
                        </button>
                    </div>
                </div>
            )}

            <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f8f9fa' }}>
                        <tr>
                            <th style={{ padding: '16px 24px', color: '#666', fontWeight: '600', fontSize: '14px' }}>Author</th>
                            <th style={{ padding: '16px 24px', color: '#666', fontWeight: '600', fontSize: '14px' }}>Rating</th>
                            <th style={{ padding: '16px 24px', color: '#666', fontWeight: '600', fontSize: '14px' }}>Comment</th>
                            <th style={{ padding: '16px 24px', color: '#666', fontWeight: '600', fontSize: '14px' }}>Date</th>
                            <th style={{ padding: '16px 24px', color: '#666', fontWeight: '600', fontSize: '14px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" style={{ padding: '60px', textAlign: 'center', color: '#999' }}>Loading reviews...</td>
                            </tr>
                        ) : reviews.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ padding: '60px', textAlign: 'center', color: '#999' }}>No reviews synced yet. Click "Sync with Google" to load reviews.</td>
                            </tr>
                        ) : (
                            reviews.map((review) => (
                                <tr key={review.id} style={{ borderTop: '1px solid #f0f0f0' }}>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <img
                                                src={review.img}
                                                alt=""
                                                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', background: '#eee' }}
                                                referrerPolicy="no-referrer"
                                            />
                                            <span style={{ fontWeight: '700', color: '#1a1a1a' }}>{review.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', gap: '4px', color: '#fbbf24' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} fill={i < review.rating ? '#fbbf24' : 'none'} color={i < review.rating ? '#fbbf24' : '#ddd'} />
                                            ))}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px', maxWidth: '400px' }}>
                                        <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.5', margin: 0 }}>
                                            {review.text.length > 100 ? `${review.text.substring(0, 100)}...` : review.text}
                                        </p>
                                    </td>
                                    <td style={{ padding: '16px 24px', color: '#666', fontSize: '14px' }}>{review.date}</td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                            <button
                                                onClick={() => handleDelete(review.id)}
                                                style={{ padding: '8px', color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer' }}
                                                title="Delete from website"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <a
                                                href={googleReviewsLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{ padding: '8px', color: 'var(--accent)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                                                title="View on Google"
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Reviews;
