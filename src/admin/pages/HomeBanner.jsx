import React, { useState, useEffect } from 'react';
import db from '../../firebase/firestore';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Trash2, Plus, Loader, Edit2, Save, X } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';

const HomeBanner = () => {
    const [banners, setBanners] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [welcomeText, setWelcomeText] = useState('Welcome to AASHA-SM TECHNOLOGIES');
    const [welcomeTextColor, setWelcomeTextColor] = useState('#ffffff');
    const [heading, setHeading] = useState('Elevate Your Brand With');
    const [headingColor, setHeadingColor] = useState('#ffffff');
    const [highlightText, setHighlightText] = useState('Digital Excellence');
    const [highlightTextColor, setHighlightTextColor] = useState('#22c55e');
    const [description, setDescription] = useState('Your partner in digital transformation. We blend creativity with technology to build websites, applications, and marketing strategies that drive real results.');
    const [descriptionColor, setDescriptionColor] = useState('#e5e7eb');
    const [button1Text, setButton1Text] = useState('Get Started');
    const [button1Color, setButton1Color] = useState('#ffffff');
    const [button1BgColor, setButton1BgColor] = useState('#22c55e');
    const [button1Link, setButton1Link] = useState('/contact');
    const [button2Text, setButton2Text] = useState('Explore Services');
    const [button2Color, setButton2Color] = useState('#ffffff');
    const [button2BgColor, setButton2BgColor] = useState('rgba(255,255,255,0.1)');
    const [button2Link, setButton2Link] = useState('/services');
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [showAddForm, setShowAddForm] = useState(false);

    const fetchBanners = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "homeBanners"));
            const fetchedBanners = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBanners(fetchedBanners);
        } catch (error) {
            console.error("Error fetching banners: ", error);
            alert("Error fetching banners");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleAdd = async () => {
        if (!imageUrl.trim()) return alert("Please enter an image URL");

        if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://') && !imageUrl.startsWith('/')) {
            return alert("Please enter a valid URL starting with http:// or https://");
        }

        setAdding(true);
        try {
            await addDoc(collection(db, "homeBanners"), {
                imageUrl: imageUrl.trim(),
                welcomeText,
                welcomeTextColor,
                heading,
                headingColor,
                highlightText,
                highlightTextColor,
                description,
                descriptionColor,
                button1Text,
                button1Color,
                button1BgColor,
                button1Link,
                button2Text,
                button2Color,
                button2BgColor,
                button2Link,
                createdAt: new Date()
            });

            setImageUrl('');
            setWelcomeText('Welcome to AASHA-SM TECHNOLOGIES');
            setWelcomeTextColor('#ffffff');
            setHeading('Elevate Your Brand With');
            setHeadingColor('#ffffff');
            setHighlightText('Digital Excellence');
            setHighlightTextColor('#22c55e');
            setDescription('Your partner in digital transformation. We blend creativity with technology to build websites, applications, and marketing strategies that drive real results.');
            setDescriptionColor('#e5e7eb');
            setButton1Text('Get Started');
            setButton1Color('#ffffff');
            setButton1BgColor('#22c55e');
            setButton1Link('/contact');
            setButton2Text('Explore Services');
            setButton2Color('#ffffff');
            setButton2BgColor('rgba(255,255,255,0.1)');
            setButton2Link('/services');

            fetchBanners();
            alert("Banner added successfully!");
            setShowAddForm(false); // Close form after adding
        } catch (error) {
            console.error("Error adding banner: ", error);
            alert("Error adding banner: " + error.message);
        }
        setAdding(false);
    };

    const handleUpdate = async (id) => {
        try {
            const banner = banners.find(b => b.id === id);
            await updateDoc(doc(db, "homeBanners", id), {
                welcomeText: banner.welcomeText,
                welcomeTextColor: banner.welcomeTextColor,
                heading: banner.heading,
                headingColor: banner.headingColor,
                highlightText: banner.highlightText,
                highlightTextColor: banner.highlightTextColor,
                description: banner.description,
                descriptionColor: banner.descriptionColor,
                button1Text: banner.button1Text,
                button1Color: banner.button1Color,
                button1BgColor: banner.button1BgColor,
                button1Link: banner.button1Link,
                button2Text: banner.button2Text,
                button2Color: banner.button2Color,
                button2BgColor: banner.button2BgColor,
                button2Link: banner.button2Link
            });
            setEditingId(null);
            alert("Banner updated successfully!");
        } catch (error) {
            console.error("Error updating banner: ", error);
            alert("Error updating banner");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this banner?")) return;
        try {
            await deleteDoc(doc(db, "homeBanners", id));
            setBanners(banners.filter(b => b.id !== id));
        } catch (error) {
            console.error("Error deleting banner: ", error);
            alert("Error deleting banner");
        }
    };

    const updateBannerField = (id, field, value) => {
        setBanners(banners.map(b => b.id === id ? { ...b, [field]: value } : b));
    };

    const ColorPicker = ({ label, value, onChange }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '12px', color: '#6b7280', whiteSpace: 'nowrap' }}>{label}:</label>
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ width: '50px', height: '40px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}
            />
        </div>
    );

    const themeGreen = '#22c55e';

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Manage Home Banners</h1>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    style={{
                        background: showAddForm ? '#ef4444' : themeGreen,
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: '600',
                        fontSize: '14px',
                        transition: 'background 0.3s'
                    }}
                >
                    {showAddForm ? <X size={18} /> : <Plus size={18} />}
                    {showAddForm ? 'Cancel' : 'Add New Banner'}
                </button>
            </div>

            {showAddForm && (
                <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '40px', animation: 'fadeIn 0.3s ease-in-out' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#374151' }}>Create New Banner</h3>


                    <div style={{ display: 'grid', gap: '20px' }}>
                        {/* Image URL */}
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Banner Image/Video URL</label>
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://example.com/image.jpg or video.mp4"
                                style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: '#f9fafb', outline: 'none' }}
                            />
                        </div>

                        {/* Welcome Text */}
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Welcome Text</label>
                            <RichTextEditor
                                value={welcomeText}
                                onChange={setWelcomeText}
                                placeholder="Enter welcome text..."
                            />
                        </div>

                        {/* Heading & Highlight */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Main Heading</label>
                                <RichTextEditor
                                    value={heading}
                                    onChange={setHeading}
                                    placeholder="Enter main heading..."
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Highlight Text</label>
                                <RichTextEditor
                                    value={highlightText}
                                    onChange={setHighlightText}
                                    placeholder="Enter highlight text..."
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Description</label>
                            <RichTextEditor
                                value={description}
                                onChange={setDescription}
                                placeholder="Enter description..."
                            />
                        </div>

                        {/* Buttons */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Button 1</label>
                                <RichTextEditor
                                    value={button1Text}
                                    onChange={setButton1Text}
                                    placeholder="Button 1 text..."
                                />
                                <input
                                    type="text"
                                    value={button1Link}
                                    onChange={(e) => setButton1Link(e.target.value)}
                                    placeholder="Link (e.g., /contact)"
                                    style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', marginTop: '10px', marginBottom: '10px' }}
                                />
                                <input
                                    type="text"
                                    value={button1Link}
                                    onChange={(e) => setButton1Link(e.target.value)}
                                    placeholder="Link (e.g., /contact)"
                                    style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', marginBottom: '10px' }}
                                />
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <ColorPicker label="Text" value={button1Color} onChange={setButton1Color} />
                                    <ColorPicker label="Background" value={button1BgColor} onChange={setButton1BgColor} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Button 2</label>
                                <RichTextEditor
                                    value={button2Text}
                                    onChange={setButton2Text}
                                    placeholder="Button 2 text..."
                                />
                                <input
                                    type="text"
                                    value={button2Link}
                                    onChange={(e) => setButton2Link(e.target.value)}
                                    placeholder="Link (e.g., /services)"
                                    style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', marginTop: '10px', marginBottom: '10px' }}
                                />
                                <input
                                    type="text"
                                    value={button2Link}
                                    onChange={(e) => setButton2Link(e.target.value)}
                                    placeholder="Link (e.g., /services)"
                                    style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', marginBottom: '10px' }}
                                />
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <ColorPicker label="Text" value={button2Color} onChange={setButton2Color} />
                                    <ColorPicker label="Background" value={button2BgColor} onChange={setButton2BgColor} />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleAdd}
                            disabled={adding}
                            style={{
                                background: themeGreen,
                                color: 'white',
                                padding: '14px 28px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: adding ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                fontWeight: '600',
                                fontSize: '16px',
                                opacity: adding ? 0.7 : 1,
                                width: 'fit-content',
                                marginTop: '10px'
                            }}
                        >
                            {adding ? <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Plus size={20} />}
                            {adding ? 'Adding...' : 'Add Banner'}
                        </button>
                    </div>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            )}

            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#374151' }}>Existing Banners ({banners.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {banners.map(banner => (
                    <div key={banner.id} style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px' }}>
                            <div style={{ height: '200px', backgroundColor: '#f3f4f6' }}>
                                <img src={banner.imageUrl} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>

                            <div style={{ padding: '20px' }}>
                                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }} dangerouslySetInnerHTML={{ __html: banner.welcomeText }} />
                                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    <span style={{ color: '#1f2937' }} dangerouslySetInnerHTML={{ __html: banner.heading }} />
                                    <span style={{ color: banner.highlightTextColor || themeGreen }} dangerouslySetInnerHTML={{ __html: banner.highlightText }} />
                                </h3>
                                <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '12px', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: banner.description }} />
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                    <span style={{ padding: '6px 12px', background: banner.button1BgColor || themeGreen, color: banner.button1Color || '#fff', borderRadius: '6px', fontSize: '12px' }}>{banner.button1Text}</span>
                                    <span style={{ padding: '6px 12px', background: '#e5e7eb', color: '#1f2937', borderRadius: '6px', fontSize: '12px' }}>{banner.button2Text}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => handleDelete(banner.id)} style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {loading && <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Loading banners...</div>}
            {!loading && banners.length === 0 && (
                <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', border: '2px dashed #e5e7eb', borderRadius: '12px' }}>
                    No banners found. Add your first banner above.
                </div>
            )}
        </div>
    );
};

export default HomeBanner;
