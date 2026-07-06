import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Plus, X, Trash2, UploadCloud, Loader2 } from 'lucide-react';
import db from '../../firebase/firestore';

const HiringSettings = () => {
    const [isActive, setIsActive] = useState(false);
    const [positions, setPositions] = useState([]);
    const [newPosition, setNewPosition] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, "admin", "hiring");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setIsActive(docSnap.data().active || false);
                    setPositions(docSnap.data().positions || []);
                    setBackgroundImage(docSnap.data().backgroundImage || '');
                }
            } catch (err) {
                console.error("Error fetching hiring settings:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            const docRef = doc(db, "admin", "hiring");
            await setDoc(docRef, {
                active: isActive,
                positions: positions,
                backgroundImage: backgroundImage
            });
            setMessage('Settings saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error("Error saving settings:", err);
            setMessage('Error saving settings.');
        } finally {
            setSaving(false);
        }
    };

    const compressImage = (file, maxWidth = 1200) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Compress to JPEG with 0.7 quality
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                };
                img.onerror = (err) => reject(err);
            };
            reader.onerror = (err) => reject(err);
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploadingImage(true);
            const compressedBase64 = await compressImage(file, 1000); // Max 1000px width
            setBackgroundImage(compressedBase64);
            setMessage('Image uploaded successfully! (Save settings to apply)');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error("Error processing image:", error);
            setMessage("Failed to process image");
        } finally {
            setUploadingImage(false);
        }
    };

    const removeImage = () => {
        setBackgroundImage('');
    };

    const addPosition = () => {
        if (newPosition.trim()) {
            setPositions([...positions, newPosition.trim()]);
            setNewPosition('');
        }
    };

    const removePosition = (index) => {
        const updatedPositions = positions.filter((_, i) => i !== index);
        setPositions(updatedPositions);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid #eee' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#4a4a4a' }}>Hiring Ad Settings</h2>

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
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '16px', color: '#333' }}>Active (Show Popup)</span>
                </label>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#4a4a4a', fontSize: '14px', fontWeight: '600' }}>Card Background Image</label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {backgroundImage ? (
                        <div style={{ position: 'relative', width: 'fit-content' }}>
                            <img
                                src={backgroundImage}
                                alt="Hiring Background"
                                style={{
                                    width: '200px',
                                    height: '120px',
                                    objectFit: 'cover',
                                    borderRadius: '12px',
                                    border: '2px solid #e2e8f0'
                                }}
                            />
                            <button
                                onClick={removeImage}
                                type="button"
                                style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-10px',
                                    backgroundColor: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ) : (
                        <label style={{
                            width: '200px',
                            height: '120px',
                            border: '2px dashed #cbd5e1',
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#64748b',
                            gap: '8px',
                            transition: 'all 0.2s ease',
                            backgroundColor: '#f8fafc'
                        }}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.backgroundColor = '#f0fdf4'; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                                disabled={uploadingImage}
                            />
                            {uploadingImage ? (
                                <Loader2 className="animate-spin" size={24} />
                            ) : (
                                <>
                                    <UploadCloud size={24} />
                                    <span style={{ fontSize: '12px', fontWeight: '500' }}>Choose Image</span>
                                </>
                            )}
                        </label>
                    )}
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>Best size: ~500x700px. Image will be compressed.</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#4a4a4a', fontSize: '14px' }}>Positions</label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input
                        type="text"
                        value={newPosition}
                        onChange={(e) => setNewPosition(e.target.value)}
                        placeholder="Enter position (e.g., SEO Executive)"
                        style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                        onKeyPress={(e) => e.key === 'Enter' && addPosition()}
                    />
                    <button
                        onClick={addPosition}
                        type="button"
                        style={{
                            padding: '10px 16px',
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}
                    >
                        <Plus size={16} /> Add
                    </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {positions.map((pos, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 12px',
                            backgroundColor: '#f3f4f6',
                            borderRadius: '20px',
                            fontSize: '14px',
                            color: '#374151'
                        }}>
                            {pos}
                            <button
                                onClick={() => removePosition(index)}
                                type="button"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#ef4444',
                                    cursor: 'pointer',
                                    padding: '2px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    {positions.length === 0 && <span style={{ color: '#9ca3af', fontSize: '14px' }}>No positions added.</span>}
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

export default HiringSettings;
