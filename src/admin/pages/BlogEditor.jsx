import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, addDoc, updateDoc, collection } from 'firebase/firestore';
import db from '../../firebase/firestore';
import RichTextEditor from '../components/RichTextEditor';
import Loader from '../components/Loader';
import { ArrowLeft, Save, Image as ImageIcon, Link2, Layout, Settings, FileText, User as UserIcon, Tag as TagIcon, List, UploadCloud, Loader2 } from 'lucide-react';

const BlogEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id && id !== 'new';

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditMode);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        category: '',
        imageUrl: '',
        content: '',
        author: 'AASHA-SM Team',
        readTime: '5 min',
        tags: '',
        status: 'published', // published or draft
        createdAt: new Date().toISOString(),
        bannerMedia: [] // Array of {url: '', type: 'image'/'video'}
    });

    const [newBannerUrl, setNewBannerUrl] = useState('');
    const [newBannerType, setNewBannerType] = useState('image');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            fetchBlog();
        }
    }, [id]);

    const fetchBlog = async () => {
        try {
            setFetching(true);
            const docRef = doc(db, "blogs", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                let bannerMedia = data.bannerMedia || [];
                if (!Array.isArray(bannerMedia)) bannerMedia = [];
                setFormData({ ...data, bannerMedia });
            } else {
                alert("Blog not found!");
                navigate('/aashasm-portal/blogs');
            }
        } catch (error) {
            console.error("Error fetching blog:", error);
        } finally {
            setFetching(false);
        }
    };

    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxWidth = 800; // Banner size limit
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

                    // Compress to JPEG with 0.6 quality
                    resolve(canvas.toDataURL('image/jpeg', 0.6));
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
            const compressedBase64 = await compressImage(file);
            setFormData(prev => ({
                ...prev,
                bannerMedia: [
                    ...(prev.bannerMedia || []),
                    { url: compressedBase64, type: 'image' }
                ]
            }));
        } catch (error) {
            console.error("Error processing image:", error);
            alert("Failed to process image");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            // For slugs, we still want to derive from the RAW title usually, 
            // but if title is HTML, we need to strip it for the slug.
            if (name === 'title' && (!prev.slug || !isEditMode)) {
                const cleanTitle = value.replace(/<[^>]*>/g, '');
                newData.slug = cleanTitle.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '');
            }
            return newData;
        });
    };

    const calculateReadTime = () => {
        const wordsPerMinute = 200;
        const text = (formData.content || '').replace(/<[^>]+>/g, '');
        const words = text.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        setFormData(prev => ({ ...prev, readTime: `${minutes} min` }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.content) {
            alert("Title and Content are required!");
            return;
        }
        try {
            setLoading(true);

            // Auto-set imageUrl from the first banner media item if available
            let mainImage = formData.imageUrl;
            if (formData.bannerMedia && formData.bannerMedia.length > 0) {
                mainImage = formData.bannerMedia[0].url;
            }

            const blogData = {
                ...formData,
                imageUrl: mainImage,
                updatedAt: new Date().toISOString()
            };

            if (isEditMode) {
                await updateDoc(doc(db, "blogs", id), blogData);
            } else {
                await addDoc(collection(db, "blogs"), blogData);
            }
            navigate('/aashasm-portal/blogs');
        } catch (error) {
            console.error("Error saving blog:", error);
            alert("Failed to save blog");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Loader /></div>;

    const cardStyle = {
        background: 'white',
        padding: '24px',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        border: '1px solid #f1f5f9',
        marginBottom: '24px'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '12px',
        fontWeight: '700',
        color: 'var(--secondary)',
        fontSize: '15px'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        fontSize: '16px',
        border: '2px solid #f1f5f9',
        borderRadius: '10px',
        outline: 'none',
        transition: 'all 0.2s',
        color: 'var(--secondary)'
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', paddingBottom: '100px', fontFamily: "'Merriweather', serif" }}>
            {/* Header Sticky Bar */}
            <div style={{
                position: 'sticky',
                top: '20px',
                zIndex: 100,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '16px 24px',
                borderRadius: '14px',
                marginBottom: '32px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                border: '1px solid rgba(255,255,255,0.5)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={() => navigate('/aashasm-portal/blogs')} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px', cursor: 'pointer', color: '#64748b' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--secondary)', margin: 0 }}>
                            {isEditMode ? 'Edit Publication' : 'New Publication'}
                        </h1>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Manage your blog content and assets</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => navigate('/aashasm-portal/blogs')} style={{ padding: '10px 20px', background: 'transparent', color: '#64748b', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                    <button onClick={handleSubmit} disabled={loading} style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px',
                        background: 'linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)',
                        color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)', opacity: loading ? 0.7 : 1
                    }}>
                        <Save size={18} /> {loading ? 'Saving...' : 'Publish Post'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
                {/* Main Content Flow */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                    {/* Post Title with Rich Text Editor */}
                    <div style={cardStyle}>
                        <label style={labelStyle}>Post Title</label>
                        <RichTextEditor
                            value={formData.title}
                            onChange={(value) => {
                                const cleanTitleForSlug = value.replace(/<[^>]*>/g, '');
                                setFormData(prev => ({
                                    ...prev,
                                    title: value,
                                    slug: (!prev.slug || !isEditMode) ? cleanTitleForSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug
                                }));
                            }}
                            placeholder="Enter a captivating title..."
                        />
                    </div>

                    {/* Excerpt with Rich Text Editor */}
                    <div style={cardStyle}>
                        <label style={labelStyle}>Excerpt / Short Description</label>
                        <RichTextEditor
                            value={formData.excerpt}
                            onChange={(value) => setFormData(prev => ({ ...prev, excerpt: value }))}
                            placeholder="A brief summary for the blog card (optional)..."
                        />
                    </div>

                    {/* Content Editor */}
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <FileText size={18} color="var(--accent)" />
                            <label style={{ ...labelStyle, marginBottom: 0 }}>Content</label>
                        </div>
                        <RichTextEditor
                            value={formData.content}
                            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                            placeholder="Write your story here..."
                        />
                    </div>

                    {/* SEO Slug - Kept as standard text for technical correctness */}
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <Link2 size={18} color="#10b981" />
                            <label style={{ ...labelStyle, marginBottom: 0 }}>Post URL Slug</label>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '2px solid #f1f5f9' }}>
                            <span style={{ color: '#94a3b8', fontSize: '14px', marginRight: '4px' }}>aashasmtechnologies.in/blog/</span>
                            <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="post-title-here"
                                style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '14px', fontWeight: '600', color: 'var(--secondary)', outline: 'none' }}
                            />
                        </div>
                    </div>

                    {/* Banner Media */}
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <Layout size={18} color="var(--accent)" />
                            <label style={{ ...labelStyle, marginBottom: 0 }}>Post Banner Slideshow</label>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <input
                                type="file"
                                id="banner-upload"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <button
                                type="button"
                                onClick={() => document.getElementById('banner-upload').click()}
                                disabled={uploading}
                                style={{
                                    padding: '0 16px',
                                    background: '#eff6ff',
                                    color: 'var(--primary)',
                                    border: '1px solid #bfdbfe',
                                    borderRadius: '10px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    height: '46px',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {uploading ? <Loader2 size={18} className="spin-anim" /> : <UploadCloud size={18} />}
                                {uploading ? 'Uploading...' : 'Upload Image'}
                            </button>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spin-anim { animation: spin 1s linear infinite; }`}</style>

                            <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600' }}>OR</span>

                            <input type="text" value={newBannerUrl} onChange={(e) => setNewBannerUrl(e.target.value)} placeholder="Enter banner image or video URL..." style={{ ...inputStyle, minWidth: '200px' }} />
                            <select value={newBannerType} onChange={(e) => setNewBannerType(e.target.value)} style={{ padding: '0 12px', border: '2px solid #f1f5f9', borderRadius: '10px', background: 'white', fontWeight: '600', height: '46px' }}>
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                            </select>
                            <button type="button" onClick={() => { if (newBannerUrl.trim()) { setFormData(prev => ({ ...prev, bannerMedia: [...(prev.bannerMedia || []), { url: newBannerUrl.trim(), type: newBannerType }] })); setNewBannerUrl(''); } }}
                                style={{ padding: '0 20px', background: 'var(--secondary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', height: '46px' }}>+ Add</button>
                        </div>

                        {formData.bannerMedia.length > 0 && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                                {formData.bannerMedia.map((item, index) => (
                                    <div key={index} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                                        {item.type === 'image' ? (
                                            <img src={item.url} alt="" style={{ width: '100%', height: '80px', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '80px', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>VIDEO</div>
                                        )}
                                        <button onClick={() => setFormData(prev => ({ ...prev, bannerMedia: prev.bannerMedia.filter((_, i) => i !== index) }))}
                                            style={{ position: 'absolute', top: '4px', right: '4px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', padding: '4px' }}>×</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Publishing */}
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                            <Settings size={18} color="#64748b" />
                            <h3 style={{ fontSize: '15px', fontWeight: '800', margin: 0 }}>Publish Settings</h3>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '6px' }}>Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} style={{ ...inputStyle, padding: '8px 12px', fontSize: '14px' }}>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '6px' }}>Author</label>
                            <RichTextEditor
                                value={formData.author}
                                onChange={(value) => setFormData(prev => ({ ...prev, author: value }))}
                                placeholder="Author name..."
                            />
                        </div>



                        <div>
                            <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '6px' }}>Publication Date</label>
                            <input type="date" value={formData.createdAt ? formData.createdAt.split('T')[0] : ''} onChange={(e) => setFormData(prev => ({ ...prev, createdAt: new Date(e.target.value).toISOString() }))} style={{ ...inputStyle, padding: '8px 12px', fontSize: '14px' }} />
                        </div>
                    </div>

                    {/* Categorization with Rich Text Support */}
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                            <List size={18} color="#64748b" />
                            <h3 style={{ fontSize: '15px', fontWeight: '800', margin: 0 }}>Categorization</h3>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '6px' }}>Category</label>
                            <RichTextEditor
                                value={formData.category}
                                onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                                placeholder="e.g. Technology..."
                            />
                        </div>
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '6px' }}>Tags (comma separated)</label>
                            <RichTextEditor
                                value={formData.tags}
                                onChange={(value) => setFormData(prev => ({ ...prev, tags: value }))}
                                placeholder="SEO, Design..."
                            />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default BlogEditor;
