import React, { useState, useEffect } from 'react';
import db from '../../firebase/firestore';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import RichTextEditor from '../components/RichTextEditor';
import Loader from '../components/Loader';

const Developments = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    // State for custom service types
    const [customServiceTypes, setCustomServiceTypes] = useState([]);
    const [newServiceType, setNewServiceType] = useState('');
    const [showAddTypeInput, setShowAddTypeInput] = useState(false);

    // Use only custom types
    const serviceTypes = customServiceTypes;

    const [formData, setFormData] = useState({
        serviceType: '',
        title: '',
        description: '',
        specialties: '',
        workDescription: '',
        portfolioItems: [], // Array of {url: '', type: 'image' or 'video'}
        status: 'active'
    });

    // For adding new portfolio items
    const [newPortfolioUrl, setNewPortfolioUrl] = useState('');
    const [newPortfolioType, setNewPortfolioType] = useState('image');

    useEffect(() => {
        fetchServices();
        loadCustomServiceTypes();
    }, []);

    // Load custom service types from localStorage
    const loadCustomServiceTypes = () => {
        const saved = localStorage.getItem('customDevelopmentTypes'); // Changed key
        if (saved) {
            setCustomServiceTypes(JSON.parse(saved));
        }
    };

    // Add new custom service type
    const handleAddServiceType = () => {
        if (!newServiceType.trim()) {
            alert('Please enter Development Type name');
            return;
        }

        if (serviceTypes.includes(newServiceType.trim())) {
            alert('This Development Type already exists');
            return;
        }

        const updatedTypes = [...customServiceTypes, newServiceType.trim()];
        setCustomServiceTypes(updatedTypes);
        localStorage.setItem('customDevelopmentTypes', JSON.stringify(updatedTypes)); // Changed key
        setNewServiceType('');
        setShowAddTypeInput(false);
        alert('New Development Type added successfully!');
    };

    // Remove custom service type
    const handleRemoveServiceType = (typeToRemove) => {
        if (window.confirm(`Are you sure you want to remove "${typeToRemove}" type?`)) {
            const updatedTypes = customServiceTypes.filter(type => type !== typeToRemove);
            setCustomServiceTypes(updatedTypes);
            localStorage.setItem('customDevelopmentTypes', JSON.stringify(updatedTypes)); // Changed key
        }
    };


    const fetchServices = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "developments")); // Changed collection
            const servicesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setServices(servicesData);
        } catch (error) {
            console.error("Error fetching developments:", error);
            // alert("Failed to fetch developments");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.serviceType || !formData.title || !formData.description) {
            alert("Please fill in Service Type, Title and Description");
            return;
        }

        try {
            setLoading(true);

            if (editingId) {
                await updateDoc(doc(db, "developments", editingId), { // Changed collection
                    ...formData,
                    updatedAt: new Date().toISOString()
                });
                alert("Development updated successfully!");
            } else {
                await addDoc(collection(db, "developments"), { // Changed collection
                    ...formData,
                    createdAt: new Date().toISOString()
                });
                alert("Development added successfully!");
            }

            resetForm();
            fetchServices();
            setShowModal(false);
        } catch (error) {
            console.error("Error saving development:", error);
            alert("Failed to save development");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (service) => {
        setFormData({
            serviceType: service.serviceType || '',
            title: service.title || '',
            description: service.description || '',
            specialties: service.specialties || '',
            workDescription: service.workDescription || '',
            portfolioItems: service.portfolioItems || [],
            status: service.status || 'active'
        });
        setEditingId(service.id);
        setShowModal(true);
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            setLoading(true);
            await deleteDoc(doc(db, "developments", deleteId)); // Changed collection
            alert("Development deleted successfully!");
            fetchServices();
        } catch (error) {
            console.error("Error deleting development:", error);
            alert("Failed to delete development");
        } finally {
            setLoading(false);
            setDeleteId(null);
        }
    };

    const resetForm = () => {
        setFormData({
            serviceType: '',
            title: '',
            description: '',
            specialties: '',
            workDescription: '',
            portfolioItems: [],
            status: 'active'
        });
        setNewPortfolioUrl('');
        setNewPortfolioType('image');
        setEditingId(null);
    };

    const handleCancel = () => {
        resetForm();
        setShowModal(false);
    };

    // Portfolio management functions
    const handleAddPortfolioItem = () => {
        if (!newPortfolioUrl.trim()) {
            alert('Please enter URL');
            return;
        }

        if (!newPortfolioUrl.startsWith('http://') && !newPortfolioUrl.startsWith('https://') && !newPortfolioUrl.startsWith('/')) {
            alert('Please enter valid URL (starting with http:// or https://)');
            return;
        }

        const newItem = {
            url: newPortfolioUrl.trim(),
            type: newPortfolioType
        };

        setFormData({
            ...formData,
            portfolioItems: [...formData.portfolioItems, newItem]
        });

        setNewPortfolioUrl('');
        setNewPortfolioType('image');
    };

    const handleRemovePortfolioItem = (index) => {
        const updatedItems = formData.portfolioItems.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            portfolioItems: updatedItems
        });
    };


    return (
        <div style={{ padding: '24px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            {loading && <Loader />}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>Developments Management</h1>
                <button
                    onClick={() => setShowModal(true)}
                    style={{
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
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                    + Add New Development
                </button>
            </div>

            {/* Services List */}
            <div style={{ display: 'grid', gap: '16px' }}>
                {services.length === 0 ? (
                    <div style={{
                        padding: '40px',
                        textAlign: 'center',
                        color: '#666',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        border: '2px dashed #e1e4e8'
                    }}>
                        <p>No developments added yet. Click "Add New Development" to get started.</p>
                    </div>
                ) : (
                    services.map((service) => (
                        <div
                            key={service.id}
                            style={{
                                padding: '20px',
                                background: '#f8f9fa',
                                borderRadius: '8px',
                                border: '1px solid #e1e4e8',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '4px 12px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        marginBottom: '12px'
                                    }}>
                                        {service.serviceType}
                                    </div>
                                    <h3
                                        style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}
                                        dangerouslySetInnerHTML={{ __html: service.title }}
                                    />
                                    <div
                                        style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}
                                        dangerouslySetInnerHTML={{ __html: service.description?.substring(0, 200) + '...' }}
                                    />
                                    {service.specialties && (
                                        <div style={{ marginTop: '12px' }}>
                                            <strong style={{ fontSize: '13px', color: '#667eea' }}>Specialties:</strong>
                                            <div
                                                style={{ color: '#666', fontSize: '13px', marginTop: '4px' }}
                                                dangerouslySetInnerHTML={{ __html: service.specialties?.substring(0, 150) + '...' }}
                                            />
                                        </div>
                                    )}
                                    {service.portfolioItems && service.portfolioItems.length > 0 && (
                                        <div style={{
                                            marginTop: '12px',
                                            padding: '8px 12px',
                                            background: '#e7f3ff',
                                            borderRadius: '6px',
                                            display: 'inline-block'
                                        }}>
                                            <span style={{ fontSize: '13px', color: '#0066cc', fontWeight: '600' }}>
                                                📸 Portfolio: {service.portfolioItems.length} item{service.portfolioItems.length > 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    )}
                                    <div style={{
                                        marginTop: '12px',
                                        padding: '6px 12px',
                                        background: service.status === 'active' ? '#d4edda' : '#f8d7da',
                                        color: service.status === 'active' ? '#155724' : '#721c24',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        display: 'inline-block'
                                    }}>
                                        {service.status === 'active' ? 'Active' : 'Inactive'}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                                    <button
                                        onClick={() => handleEdit(service)}
                                        style={{
                                            padding: '8px 16px',
                                            background: '#667eea',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseOver={(e) => e.target.style.background = '#5568d3'}
                                        onMouseOut={(e) => e.target.style.background = '#667eea'}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => setDeleteId(service.id)}
                                        style={{
                                            padding: '8px 16px',
                                            background: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseOver={(e) => e.target.style.background = '#c82333'}
                                        onMouseOut={(e) => e.target.style.background = '#dc3545'}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
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
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        width: '100%',
                        maxWidth: '900px',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                    }}>
                        <div style={{
                            padding: '24px',
                            borderBottom: '1px solid #e1e4e8',
                            position: 'sticky',
                            top: 0,
                            background: 'white',
                            zIndex: 1
                        }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a' }}>
                                {editingId ? 'Edit Development' : 'Add New Development'}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
                            {/* Service Type Dropdown */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontWeight: '600',
                                    color: '#1a1a1a',
                                    fontSize: '14px'
                                }}>
                                    Development Type <span style={{ color: '#dc3545' }}>*</span>
                                </label>
                                <select
                                    value={formData.serviceType}
                                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '2px solid #e1e4e8',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        transition: 'border-color 0.3s ease',
                                        background: 'white'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                    onBlur={(e) => e.target.style.borderColor = '#e1e4e8'}
                                >
                                    <option value="">-- Select Development Type --</option>
                                    {customServiceTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>

                                {/* Add New Type Button */}
                                <div style={{ marginTop: '12px' }}>
                                    {!showAddTypeInput ? (
                                        <button
                                            type="button"
                                            onClick={() => setShowAddTypeInput(true)}
                                            style={{
                                                padding: '8px 16px',
                                                background: '#f0f0f0',
                                                color: '#667eea',
                                                border: '2px dashed #667eea',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '13px',
                                                fontWeight: '600',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseOver={(e) => e.target.style.background = '#e8e8ff'}
                                            onMouseOut={(e) => e.target.style.background = '#f0f0f0'}
                                        >
                                            + Add New Development Type
                                        </button>
                                    ) : (
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <input
                                                type="text"
                                                value={newServiceType}
                                                onChange={(e) => setNewServiceType(e.target.value)}
                                                placeholder="Enter new development type..."
                                                style={{
                                                    flex: 1,
                                                    padding: '10px',
                                                    border: '2px solid #667eea',
                                                    borderRadius: '6px',
                                                    fontSize: '13px',
                                                    outline: 'none'
                                                }}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleAddServiceType();
                                                    }
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddServiceType}
                                                style={{
                                                    padding: '10px 20px',
                                                    background: '#667eea',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '13px',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                Add
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowAddTypeInput(false);
                                                    setNewServiceType('');
                                                }}
                                                style={{
                                                    padding: '10px 20px',
                                                    background: '#dc3545',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '13px',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Show Custom Types with Delete Option */}
                                {customServiceTypes.length > 0 && (
                                    <div style={{ marginTop: '12px' }}>
                                        <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                                            Custom Development Types:
                                        </p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {customServiceTypes.map((type) => (
                                                <div
                                                    key={type}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        padding: '6px 12px',
                                                        background: '#e8e8ff',
                                                        borderRadius: '20px',
                                                        fontSize: '12px'
                                                    }}
                                                >
                                                    <span>{type}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveServiceType(type)}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            color: '#dc3545',
                                                            cursor: 'pointer',
                                                            fontSize: '16px',
                                                            fontWeight: 'bold',
                                                            padding: '0',
                                                            lineHeight: '1'
                                                        }}
                                                        title="Remove"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontWeight: '600',
                                    color: '#1a1a1a',
                                    fontSize: '14px'
                                }}>
                                    Title <span style={{ color: '#dc3545' }}>*</span>
                                </label>
                                <RichTextEditor
                                    value={formData.title}
                                    onChange={(value) => setFormData({ ...formData, title: value })}
                                    placeholder="Enter development title..."
                                />
                            </div>

                            {/* Description */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontWeight: '600',
                                    color: '#1a1a1a',
                                    fontSize: '14px'
                                }}>
                                    Description <span style={{ color: '#dc3545' }}>*</span>
                                </label>
                                <RichTextEditor
                                    value={formData.description}
                                    onChange={(value) => setFormData({ ...formData, description: value })}
                                    placeholder="Enter detailed development description..."
                                />
                            </div>

                            {/* Specialties */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontWeight: '600',
                                    color: '#1a1a1a',
                                    fontSize: '14px'
                                }}>
                                    Our Specialties (Optional)
                                </label>
                                <RichTextEditor
                                    value={formData.specialties}
                                    onChange={(value) => setFormData({ ...formData, specialties: value })}
                                    placeholder="List your specialties for this development..."
                                />
                            </div>

                            {/* Work Description */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontWeight: '600',
                                    color: '#1a1a1a',
                                    fontSize: '14px'
                                }}>
                                    Work Description (Optional)
                                </label>
                                <RichTextEditor
                                    value={formData.workDescription}
                                    onChange={(value) => setFormData({ ...formData, workDescription: value })}
                                    placeholder="Describe your work process or portfolio..."
                                />
                            </div>

                            {/* Portfolio Gallery Section */}
                            <div style={{
                                marginBottom: '20px',
                                padding: '20px',
                                background: '#f8f9fa',
                                borderRadius: '8px',
                                border: '2px dashed #667eea'
                            }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '12px',
                                    fontWeight: '600',
                                    color: '#1a1a1a',
                                    fontSize: '14px'
                                }}>
                                    📸 Work Portfolio Gallery (Images/Videos)
                                </label>
                                <p style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>
                                    Add images and videos of your work for this development
                                </p>

                                {/* Add Portfolio Item */}
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                                    <select
                                        value={newPortfolioType}
                                        onChange={(e) => setNewPortfolioType(e.target.value)}
                                        style={{
                                            padding: '10px',
                                            border: '2px solid #e1e4e8',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            outline: 'none',
                                            background: 'white',
                                            minWidth: '120px'
                                        }}
                                    >
                                        <option value="image">🖼️ Image</option>
                                        <option value="video">🎥 Video</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={newPortfolioUrl}
                                        onChange={(e) => setNewPortfolioUrl(e.target.value)}
                                        placeholder="Enter image/video URL"
                                        style={{
                                            flex: 1,
                                            minWidth: '300px',
                                            padding: '10px',
                                            border: '2px solid #e1e4e8',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            outline: 'none'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                        onBlur={(e) => e.target.style.borderColor = '#e1e4e8'}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddPortfolioItem}
                                        style={{
                                            padding: '10px 20px',
                                            background: '#667eea',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            transition: 'all 0.3s ease',
                                            whiteSpace: 'nowrap'
                                        }}
                                        onMouseOver={(e) => e.target.style.background = '#5568d3'}
                                        onMouseOut={(e) => e.target.style.background = '#667eea'}
                                    >
                                        + Add Item
                                    </button>
                                </div>

                                {/* Portfolio Items Grid */}
                                {formData.portfolioItems.length > 0 ? (
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                                        gap: '12px',
                                        marginTop: '16px'
                                    }}>
                                        {formData.portfolioItems.map((item, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    position: 'relative',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    background: 'white',
                                                    border: '2px solid #e1e4e8',
                                                    aspectRatio: '1/1'
                                                }}
                                            >
                                                {item.type === 'image' ? (
                                                    <img
                                                        src={item.url}
                                                        alt={`Portfolio ${index + 1}`}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover'
                                                        }}
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : (
                                                    <video
                                                        src={item.url}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover'
                                                        }}
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                )}
                                                <div style={{
                                                    display: 'none',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '100%',
                                                    height: '100%',
                                                    background: '#f3f4f6',
                                                    color: '#9ca3af',
                                                    fontSize: '12px',
                                                    textAlign: 'center',
                                                    padding: '10px'
                                                }}>
                                                    {item.type === 'image' ? '🖼️' : '🎥'}<br />
                                                    Preview unavailable
                                                </div>

                                                {/* Type Badge */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '6px',
                                                    left: '6px',
                                                    background: 'rgba(0,0,0,0.7)',
                                                    color: 'white',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '10px',
                                                    fontWeight: '600'
                                                }}>
                                                    {item.type === 'image' ? '🖼️ IMG' : '🎥 VIDEO'}
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemovePortfolioItem(index)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '6px',
                                                        right: '6px',
                                                        background: 'rgba(220, 53, 69, 0.9)',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '50%',
                                                        width: '24px',
                                                        height: '24px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '14px',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{
                                        padding: '20px',
                                        textAlign: 'center',
                                        color: '#999',
                                        fontSize: '13px',
                                        background: 'white',
                                        borderRadius: '8px'
                                    }}>
                                        No images/videos added yet.
                                    </div>
                                )}
                            </div>


                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '30px' }}>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    style={{
                                        padding: '12px 24px',
                                        background: '#f8f9fa',
                                        color: '#4b5563',
                                        border: '1px solid #e1e4e8',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '12px 24px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                                    }}
                                >
                                    {editingId ? 'Update Development' : 'Save Development'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
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
                            Are you sure you want to delete this development? This action cannot be undone.
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

export default Developments;
