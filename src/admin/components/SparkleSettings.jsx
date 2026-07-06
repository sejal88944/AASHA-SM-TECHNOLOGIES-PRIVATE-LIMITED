import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Sparkles, Upload, Music, Trash2 } from 'lucide-react';
import db from '../../firebase/firestore';

const SparkleSettings = () => {
    const [isActive, setIsActive] = useState(false);
    const [isSoundActive, setIsSoundActive] = useState(false);
    const [soundUrl, setSoundUrl] = useState('');
    const [audioFile, setAudioFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, "admin", "general");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setIsActive(docSnap.data().sparkleActive || false);
                    setIsSoundActive(docSnap.data().sparkleSoundActive || false);
                    setSoundUrl(docSnap.data().sparkleSoundUrl || '');
                }
            } catch (err) {
                console.error("Error fetching sparkle settings:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setAudioFile(e.target.files[0]);
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        let newSoundUrl = soundUrl;

        try {
            // Check file size (Firestore limit is 1MB total per doc, keeping audio under 700KB)
            if (audioFile) {
                if (audioFile.size > 700 * 1024) {
                    throw new Error("File too large! Max size for Firestore is 700KB. Use Storage for larger files.");
                }
                newSoundUrl = await convertToBase64(audioFile);
            }

            const docRef = doc(db, "admin", "general");
            await setDoc(docRef, {
                sparkleActive: isActive,
                sparkleSoundActive: isSoundActive,
                sparkleSoundUrl: newSoundUrl
            }, { merge: true });

            setMessage('Sparkle settings saved successfully!');
            setTimeout(() => setMessage(''), 3000);
            setAudioFile(null); // Reset file input
        } catch (err) {
            console.error("Error saving sparkle settings:", err);
            setMessage('Error: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleRemoveAudio = async () => {
        setSoundUrl('');
        setAudioFile(null);
        setMessage('Audio removed. Click Save to apply.');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid #eee' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#4a4a4a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} /> Sparkle Effect Settings
            </h2>

            {message && (
                <div style={{
                    padding: '12px',
                    marginBottom: '20px',
                    backgroundColor: message.includes('Error') ? '#fee2e2' : '#d1fae5',
                    color: message.includes('Error') ? '#991b1b' : '#065f46',
                    borderRadius: '6px'
                }}>
                    {message}
                </div>
            )}

            <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                    Enable this to show a celebration/sparkle effect when users visit the website.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '16px', color: '#333' }}>Active (Show Sparkles on Website Open)</span>
                    </label>

                    <div style={{ marginLeft: '30px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '15px' }}>
                            <input
                                type="checkbox"
                                checked={isSoundActive}
                                onChange={(e) => setIsSoundActive(e.target.checked)}
                                disabled={!isActive}
                                style={{ width: '20px', height: '20px', cursor: isActive ? 'pointer' : 'not-allowed' }}
                            />
                            <span style={{ fontSize: '16px', fontWeight: '500', color: isActive ? '#333' : '#999' }}>Enable Sound Effect</span>
                        </label>

                        {isSoundActive && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={{ fontSize: '14px', color: '#666' }}>
                                    Default sound is a "Magic Pop". You can upload a custom sound (MP3/WAV) here.
                                </div>

                                {soundUrl && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '6px' }}>
                                        <Music size={16} color="#6366f1" />
                                        <span style={{ fontSize: '13px', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
                                            Custom Audio Active
                                        </span>
                                        <button
                                            type="button"
                                            onClick={handleRemoveAudio}
                                            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                            title="Remove Custom Audio"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )}

                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <label style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        padding: '10px',
                                        border: '1px dashed #cbd5e1',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        backgroundColor: 'white',
                                        transition: 'all 0.2s'
                                    }}>
                                        <Upload size={16} color="#64748b" />
                                        <span style={{ fontSize: '14px', color: '#64748b' }}>
                                            {audioFile ? audioFile.name : "Upload Custom Audio"}
                                        </span>
                                        <input
                                            type="file"
                                            accept="audio/*"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={handleSave}
                disabled={saving}
                style={{
                    padding: '12px 24px',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    opacity: saving ? 0.7 : 1
                }}
            >
                {saving ? 'Saving...' : 'Save Settings'}
            </button>
        </div>
    );
};

export default SparkleSettings;
