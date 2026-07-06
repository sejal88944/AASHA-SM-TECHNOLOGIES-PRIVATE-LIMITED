import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import db from '../../firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import ConfirmModal from '../components/ConfirmModal';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "blogs"));
            const items = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Sort by date descending (Newest first)
            items.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });
            setBlogs(items);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            setLoading(true);
            await deleteDoc(doc(db, "blogs", deleteId));
            setBlogs(blogs.filter(b => b.id !== deleteId));
            setDeleteId(null);
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("Failed to delete blog");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '24px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>Blog Management</h1>
                <button
                    onClick={() => navigate('/aashasm-portal/blogs/new')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px',
                        boxShadow: '0 4px 6px rgba(102, 126, 234, 0.3)',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <Plus size={18} /> Add New Blog
                </button>
            </div>

            {loading ? (
                <Loader />
            ) : blogs.length === 0 ? (
                <div style={{
                    padding: '60px',
                    textAlign: 'center',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    border: '2px dashed #e1e4e8',
                    color: '#6c757d'
                }}>
                    <p style={{ fontSize: '18px', marginBottom: '16px' }}>No blogs found</p>
                    <button
                        onClick={() => navigate('/aashasm-portal/blogs/new')}
                        style={{
                            color: '#667eea',
                            fontWeight: '600',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        Create your first blog post
                    </button>
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
                                <th style={{ padding: '16px', color: '#64748b', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Article</th>

                                <th style={{ padding: '16px', color: '#64748b', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category & Tags</th>
                                <th style={{ padding: '16px', color: '#64748b', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', width: '120px' }}>Status</th>
                                <th style={{ padding: '16px', color: '#64748b', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', width: '120px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map(blog => (
                                <tr key={blog.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '10px',
                                                overflow: 'hidden',
                                                background: '#f1f5f9',
                                                flexShrink: 0,
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                            }}>
                                                {blog.imageUrl ? (
                                                    <img
                                                        src={blog.imageUrl}
                                                        alt=""
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        onError={(e) => e.target.style.display = 'none'}
                                                    />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}>
                                                        <Eye size={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div
                                                    style={{ fontWeight: '700', color: 'var(--secondary)', fontSize: '15px', marginBottom: '4px' }}
                                                    dangerouslySetInnerHTML={{ __html: blog.title }}
                                                />
                                                <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{ display: 'flex', gap: '4px' }}>By <span dangerouslySetInnerHTML={{ __html: blog.author || 'Admin' }} /></span>
                                                    <span style={{ color: '#e2e8f0' }}>|</span>
                                                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '2px 10px',
                                                background: '#ecf2ff',
                                                borderRadius: '6px',
                                                fontSize: '11px',
                                                color: '#4483eb',
                                                fontWeight: '700',
                                                width: 'fit-content'
                                            }} dangerouslySetInnerHTML={{ __html: blog.category || 'Uncategorized' }}></span>
                                            {blog.tags && (
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                    {blog.tags.split(',').slice(0, 2).map((tag, i) => (
                                                        <span key={i} style={{ fontSize: '11px', color: '#94a3b8' }} dangerouslySetInnerHTML={{ __html: '#' + tag.trim() }}></span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            padding: '6px 12px',
                                            background: blog.status === 'published' ? '#dcfce7' : '#fff7ed',
                                            color: blog.status === 'published' ? '#15803d' : '#ea580c',
                                            border: `1px solid ${blog.status === 'published' ? '#bbf7d0' : '#ffedd5'}`,
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: '700'
                                        }}>
                                            <div style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: 'currentColor',
                                                marginRight: '8px'
                                            }}></div>
                                            {blog.status === 'published' ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <button
                                                onClick={() => navigate(`/aashasm-portal/blogs/${blog.id}`)}
                                                style={{
                                                    padding: '10px',
                                                    color: 'var(--primary)',
                                                    background: '#f1f5f9',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => setDeleteId(blog.id)}
                                                style={{
                                                    padding: '10px',
                                                    color: '#ef4444',
                                                    background: '#fff1f2',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {deleteId && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        padding: '24px',
                        borderRadius: '12px',
                        width: '400px',
                        textAlign: 'center',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#dc3545' }}>Delete Confirmation</h3>
                        <p style={{ color: '#666', marginBottom: '24px' }}>
                            Are you sure you want to delete this blog post? This action cannot be undone.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                            <button
                                onClick={() => setDeleteId(null)}
                                style={{
                                    padding: '10px 20px',
                                    background: '#f8f9fa',
                                    color: '#4b5563',
                                    border: '1px solid #e1e4e8',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                style={{
                                    padding: '10px 20px',
                                    background: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blogs;
