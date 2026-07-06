import { UploadCloud, Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import db from '../../firebase/firestore';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
// Removed: import { getStorage... } from "firebase/storage";
import app from '../../firebase/firebaseConfig';
import RichTextEditor from '../components/RichTextEditor';
import ConfirmModal from '../components/ConfirmModal';
import Loader from '../components/Loader';

// const storage = getStorage(app); // Removed storage init

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    // State for custom service types
    const [customServiceTypes, setCustomServiceTypes] = useState([]);
    const [newServiceType, setNewServiceType] = useState('');
    const [showAddTypeInput, setShowAddTypeInput] = useState(false);

    // States for custom Modals (to avoid browser 'localhost says' alerts)
    const [renameState, setRenameState] = useState({ show: false, oldType: '', newValue: '' });
    const [confirmState, setConfirmState] = useState({ show: false, message: '', onConfirm: null, type: 'danger' });

    // Use only custom types
    const serviceTypes = customServiceTypes;

    const [formData, setFormData] = useState({
        serviceType: '',
        title: '',
        icon: '', // Icon/Emoji for navbar
        description: '',
        bannerMedia: [], // Array of {url: '', type: 'image'/'video'} for hero section
        specialties: '',
        includes: '',
        workDescription: '',
        portfolioItems: [], // Array of {url: '', type: 'image' or 'video'}
        status: 'active'
    });

    // For adding new portfolio items
    const [newPortfolioUrl, setNewPortfolioUrl] = useState('');
    const [newPortfolioType, setNewPortfolioType] = useState('image');

    // For adding new banner media items
    const [newBannerUrl, setNewBannerUrl] = useState('');
    const [newBannerType, setNewBannerType] = useState('image');
    const [uploadingBanner, setUploadingBanner] = useState(false);
    const [uploadingPortfolio, setUploadingPortfolio] = useState(false);
    const [uploadingIcon, setUploadingIcon] = useState(false);

    useEffect(() => {
        fetchServices();
        loadCustomServiceTypes();
    }, []);

    // Load custom service types from localStorage
    const loadCustomServiceTypes = () => {
        const saved = localStorage.getItem('customServiceTypes');
        if (saved) {
            setCustomServiceTypes(JSON.parse(saved));
        }
    };



    // Helper: Compress Image to Base64
    const compressImage = (file, maxWidth = 800) => {
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

                    // Compress to JPEG with 0.6 quality
                    resolve(canvas.toDataURL('image/jpeg', 0.6));
                };
                img.onerror = (err) => reject(err);
            };
            reader.onerror = (err) => reject(err);
        });
    };

    // Upload Icon
    const handleIconUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploadingIcon(true);
            const compressedBase64 = await compressImage(file, 200); // Smaller size for icons
            setFormData({ ...formData, icon: compressedBase64 });
            console.log("Icon converted successfully!");
        } catch (error) {
            console.error("Error processing icon:", error);
            alert("Error processing icon: " + error.message);
        } finally {
            setUploadingIcon(false);
        }
    };

    // Upload Banner Image
    const handleBannerUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploadingBanner(true);
            const compressedBase64 = await compressImage(file, 800);

            const newBanner = { url: compressedBase64, type: 'image' };
            setFormData(prev => ({
                ...prev,
                bannerMedia: [...prev.bannerMedia, newBanner]
            }));
        } catch (error) {
            console.error("Error processing banner:", error);
            alert("Failed to process banner image");
        } finally {
            setUploadingBanner(false);
        }
    };

    // Upload Portfolio Image
    const handlePortfolioUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploadingPortfolio(true);
            const compressedBase64 = await compressImage(file, 600); // Moderate size for portfolio

            const newItem = {
                url: compressedBase64,
                type: 'image'
            };

            setFormData(prev => ({
                ...prev,
                portfolioItems: [...prev.portfolioItems, newItem]
            }));
        } catch (error) {
            console.error("Error processing portfolio item:", error);
            alert("Failed to process portfolio image");
        } finally {
            setUploadingPortfolio(false);
        }
    };

    // Add new custom service type
    const handleAddServiceType = () => {
        if (!newServiceType.trim()) {
            alert('Please enter a Service Type name');
            return;
        }

        if (serviceTypes.includes(newServiceType.trim())) {
            alert('This Service Type already exists');
            return;
        }

        const updatedTypes = [...customServiceTypes, newServiceType.trim()];
        setCustomServiceTypes(updatedTypes);
        localStorage.setItem('customServiceTypes', JSON.stringify(updatedTypes));
        setNewServiceType('');
        setShowAddTypeInput(false);
        console.log('New Service Type successfully added!');
    };

    // Remove custom service type
    const handleRemoveServiceType = (typeToRemove) => {
        setConfirmState({
            show: true,
            message: `Do you want to remove the "${typeToRemove}" Service Type?`,
            onConfirm: () => {
                const updatedTypes = customServiceTypes.filter(type => type !== typeToRemove);
                setCustomServiceTypes(updatedTypes);
                localStorage.setItem('customServiceTypes', JSON.stringify(updatedTypes));
                setConfirmState({ show: false });
            },
            type: 'danger'
        });
    };

    // Rename custom service type (Trigger Modal)
    const handleRenameClick = (oldType) => {
        setRenameState({ show: true, oldType: oldType, newValue: oldType });
    };

    // Actual Rename Logic (Called from Rename Modal)
    const handleRenameExecute = async () => {
        const { oldType, newValue } = renameState;
        const trimmedNewType = newValue.trim();

        if (!trimmedNewType || trimmedNewType === oldType) {
            setRenameState({ show: false, oldType: '', newValue: '' });
            return;
        }

        if (customServiceTypes.some(t => t.toLowerCase() === trimmedNewType.toLowerCase() && t !== oldType)) {
            alert('This Service Type name already exists');
            return;
        }

        // Update the list locally
        const updatedTypes = customServiceTypes.map(t => t === oldType ? trimmedNewType : t);
        setCustomServiceTypes(updatedTypes);
        localStorage.setItem('customServiceTypes', JSON.stringify(updatedTypes));

        // Check for existing services that need updating
        const servicesToUpdate = services.filter(s => s.serviceType === oldType);

        if (servicesToUpdate.length > 0) {
            setRenameState({ show: false, oldType: '', newValue: '' }); // Hide rename modal

            // Show custom confirmation for updating children services
            setConfirmState({
                show: true,
                message: `${servicesToUpdate.length} services found for "${oldType}". Do you want to update them to "${trimmedNewType}"?`,
                onConfirm: async () => {
                    try {
                        setLoading(true);
                        await Promise.all(servicesToUpdate.map(service =>
                            updateDoc(doc(db, "services", service.id), { serviceType: trimmedNewType })
                        ));
                        setServices(prev => prev.map(s =>
                            s.serviceType === oldType ? { ...s, serviceType: trimmedNewType } : s
                        ));
                        console.log("Services references updated!");
                    } catch (error) {
                        console.error("Error updating service references:", error);
                    } finally {
                        setLoading(false);
                        setConfirmState({ show: false });
                    }
                },
                cancelLabel: "Only rename type",
                onCancel: () => setConfirmState({ show: false }),
                type: 'primary'
            });
        } else {
            setRenameState({ show: false, oldType: '', newValue: '' });
        }
    };


    const fetchServices = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "services"));
            const servicesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setServices(servicesData);

            // Extract unique service types from database and merge with custom types
            const dbTypes = [...new Set(servicesData.map(s => s.serviceType).filter(Boolean))];
            setCustomServiceTypes(prev => {
                const combined = [...new Set([...prev, ...dbTypes])];
                localStorage.setItem('customServiceTypes', JSON.stringify(combined));
                return combined;
            });

        } catch (error) {
            console.error("Error fetching services:", error);
            alert("Failed to fetch services");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.serviceType || !formData.title || !formData.description) {
            alert("Please fill in the Service Type, Title, and Description");
            return;
        }

        try {
            setLoading(true);

            if (editingId) {
                await updateDoc(doc(db, "services", editingId), {
                    ...formData,
                    updatedAt: new Date().toISOString()
                });
                console.log("Service updated successfully!");
            } else {
                await addDoc(collection(db, "services"), {
                    ...formData,
                    createdAt: new Date().toISOString()
                });
                console.log("Service added successfully!");
            }

            resetForm();
            fetchServices();
            setShowModal(false);
        } catch (error) {
            console.error("Error saving service:", error);
            alert("Failed to save service");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (service) => {
        // Convert old bannerMedia object to array format for backward compatibility
        let bannerMediaArray = [];
        if (service.bannerMedia) {
            if (Array.isArray(service.bannerMedia)) {
                bannerMediaArray = service.bannerMedia;
            } else if (typeof service.bannerMedia === 'object' && service.bannerMedia.url) {
                // Old format: {url: '...', type: '...'}
                bannerMediaArray = [service.bannerMedia];
            }
        }

        setFormData({
            serviceType: service.serviceType || '',
            title: service.title || '',
            icon: service.icon || '',
            description: service.description || '',
            bannerMedia: bannerMediaArray,
            specialties: service.specialties || '',
            includes: service.includes || '',
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
            await deleteDoc(doc(db, "services", deleteId));
            console.log("Service deleted successfully!");
            fetchServices();
        } catch (error) {
            console.error("Error deleting service:", error);
            alert("Failed to delete service");
        } finally {
            setLoading(false);
            setDeleteId(null);
        }
    };

    const resetForm = () => {
        setFormData({
            serviceType: '',
            title: '',
            icon: '',
            description: '',
            bannerMedia: [],
            specialties: '',
            includes: '',
            workDescription: '',
            portfolioItems: [],
            status: 'active'
        });
        setNewPortfolioUrl('');
        setNewPortfolioType('image');
        setNewBannerUrl('');
        setNewBannerType('image');
        setEditingId(null);
    };

    const handleCancel = () => {
        resetForm();
        setShowModal(false);
    };

    // Portfolio management functions
    const handleAddPortfolioItem = () => {
        if (!newPortfolioUrl.trim()) {
            alert('Please enter a URL');
            return;
        }

        if (!newPortfolioUrl.startsWith('http://') && !newPortfolioUrl.startsWith('https://') && !newPortfolioUrl.startsWith('/')) {
            alert('Please enter a valid URL (starting with http:// or https://)');
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
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>Services Management</h1>
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
                    + Add New Service
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
                        <p>No services added yet. Click "Add New Service" to get started.</p>
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
                                        style={{
                                            fontSize: '18px',
                                            fontWeight: '700',
                                            color: '#1a1a1a',
                                            marginBottom: '8px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '100%'
                                        }}
                                        dangerouslySetInnerHTML={{ __html: service.title }}
                                    />
                                    <div
                                        style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}
                                        dangerouslySetInnerHTML={{ __html: service.description?.substring(0, 200) + '...' }}
                                    />
                                    {service.specialties && (
                                        <div style={{ marginTop: '12px' }}>
                                            <strong style={{ fontSize: '13px', color: '#667eea' }}>Who it's for:</strong>
                                            <div
                                                style={{ color: '#666', fontSize: '13px', marginTop: '4px' }}
                                                dangerouslySetInnerHTML={{ __html: service.specialties?.substring(0, 150) + '...' }}
                                            />
                                        </div>
                                    )}
                                    {service.includes && (
                                        <div style={{ marginTop: '12px' }}>
                                            <strong style={{ fontSize: '13px', color: '#667eea' }}>Includes:</strong>
                                            <div
                                                style={{ color: '#666', fontSize: '13px', marginTop: '4px' }}
                                                dangerouslySetInnerHTML={{ __html: service.includes?.substring(0, 150) + '...' }}
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
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        fontFamily: "'Merriweather', serif"
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
                                {editingId ? 'Edit Service' : 'Add New Service'}
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
                                    Service Type <span style={{ color: '#dc3545' }}>*</span>
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
                                    <option value="">-- Select Service Type --</option>
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
                                            + Add New Service Type
                                        </button>
                                    ) : (
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <input
                                                type="text"
                                                value={newServiceType}
                                                onChange={(e) => setNewServiceType(e.target.value)}
                                                placeholder="Enter new service type..."
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
                                            Custom Service Types:
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
                                                        onClick={() => handleRenameClick(type)}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            color: '#667eea',
                                                            cursor: 'pointer',
                                                            fontSize: '14px',
                                                            padding: '0 4px',
                                                            lineHeight: '1'
                                                        }}
                                                        title="Rename"
                                                    >
                                                        ✏️
                                                    </button>
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
                                    placeholder="Enter service title..."
                                />
                            </div>

                            {/* Icon/Emoji */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontWeight: '600',
                                    color: '#1a1a1a',
                                    fontSize: '14px'
                                }}>
                                    Icon/Emoji or Image (Optional)
                                    <span style={{ fontSize: '12px', color: '#666', fontWeight: '400', marginLeft: '8px' }}>
                                        (Will be visible in Navbar)
                                    </span>
                                </label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <input
                                        type="text"
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        placeholder="🎨 📱 💻 🚀 (Emoji किंवा Image URL)"
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: '2px solid #e1e4e8',
                                            borderRadius: '8px',
                                            fontSize: '18px',
                                            outline: 'none',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                        onBlur={(e) => e.target.style.borderColor = '#e1e4e8'}
                                    />

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
                                            {uploadingIcon ? (
                                                <span style={{ fontSize: '12px', color: '#666' }}>Processing...</span>
                                            ) : (
                                                <button type="button" style={{
                                                    padding: '8px 16px',
                                                    background: '#f0f0f0',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    width: '100%',
                                                    textAlign: 'center'
                                                }}>
                                                    Upload Icon Image (PNG/JPG)
                                                </button>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleIconUpload}
                                                disabled={uploadingIcon}
                                                style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 0,
                                                    opacity: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {formData.icon && formData.icon.toString().startsWith('http') && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '5px', border: '1px dashed #ccc', borderRadius: '4px' }}>
                                            <span style={{ fontSize: '12px', color: '#666' }}>Preview:</span>
                                            <img src={formData.icon} alt="Icon Preview" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                                        </div>
                                    )}
                                </div>
                                <p style={{ fontSize: '12px', color: '#666', marginTop: '0' }}>
                                    💡 Tip: तुम्ही Emoji वापरू शकता <b>किंवा</b> स्वतःची PNG image upload करू शकता.
                                </p>
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
                                    placeholder="Enter detailed service description..."
                                />
                            </div>

                            {/* Banner Media for Hero Section - Multiple Items */}
                            <div style={{ marginBottom: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '8px', border: '2px dashed #dee2e6' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '12px',
                                    fontWeight: '600',
                                    color: '#1a1a1a',
                                    fontSize: '14px'
                                }}>
                                    Banner Images/Videos (Optional)
                                    <span style={{ fontSize: '12px', color: '#666', fontWeight: '400', marginLeft: '8px' }}>
                                        (Hero section slideshow)
                                    </span>
                                </label>

                                {/* Add New Banner Item */}
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>

                                    {/* Upload Button */}
                                    <div style={{ position: 'relative' }}>
                                        <button
                                            type="button"
                                            disabled={uploadingBanner}
                                            style={{
                                                padding: '10px 16px',
                                                background: '#eff6ff',
                                                color: 'var(--primary)',
                                                border: '1px solid #bfdbfe',
                                                borderRadius: '6px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                height: '42px',
                                                fontSize: '13px',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {uploadingBanner ? <Loader2 size={16} className="spin-anim" /> : <UploadCloud size={16} />}
                                            {uploadingBanner ? 'Processing...' : 'Upload Image'}
                                        </button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleBannerUpload}
                                            disabled={uploadingBanner}
                                            style={{
                                                position: 'absolute',
                                                top: 0, left: 0, width: '100%', height: '100%',
                                                opacity: 0, cursor: 'pointer'
                                            }}
                                        />
                                    </div>
                                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spin-anim { animation: spin 1s linear infinite; }`}</style>

                                    <span style={{ fontSize: '12px', color: '#999', fontWeight: 'bold' }}>OR</span>

                                    <input
                                        type="text"
                                        value={newBannerUrl}
                                        onChange={(e) => setNewBannerUrl(e.target.value)}
                                        placeholder="Enter image or video URL..."
                                        style={{
                                            flex: 1,
                                            padding: '10px',
                                            border: '2px solid #e1e4e8',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            outline: 'none',
                                            minWidth: '200px'
                                        }}
                                    />
                                    <select
                                        value={newBannerType}
                                        onChange={(e) => setNewBannerType(e.target.value)}
                                        style={{
                                            padding: '10px',
                                            border: '2px solid #e1e4e8',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            outline: 'none',
                                            minWidth: '90px'
                                        }}
                                    >
                                        <option value="image">Image</option>
                                        <option value="video">Video</option>
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (newBannerUrl.trim()) {
                                                const newBanner = { url: newBannerUrl, type: newBannerType };
                                                setFormData({
                                                    ...formData,
                                                    bannerMedia: [...formData.bannerMedia, newBanner]
                                                });
                                                setNewBannerUrl('');
                                                setNewBannerType('image');
                                            } else {
                                                alert('Please enter a URL first!');
                                            }
                                        }}
                                        style={{
                                            padding: '10px 20px',
                                            background: '#667eea',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        + Add
                                    </button>
                                </div>

                                {/* Display Added Banner Items */}
                                {formData.bannerMedia.length > 0 && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginTop: '16px' }}>
                                        {formData.bannerMedia.map((item, index) => (
                                            <div key={index} style={{
                                                position: 'relative',
                                                background: 'white',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                border: '2px solid #e1e4e8'
                                            }}>
                                                {item.type === 'image' ? (
                                                    <img
                                                        src={item.url}
                                                        alt={`Banner ${index + 1}`}
                                                        style={{
                                                            width: '100%',
                                                            height: '120px',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                ) : (
                                                    <video
                                                        src={item.url}
                                                        style={{
                                                            width: '100%',
                                                            height: '120px',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                )}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '4px',
                                                    right: '4px',
                                                    background: 'rgba(0,0,0,0.7)',
                                                    color: 'white',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '10px',
                                                    fontWeight: '600',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {item.type}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData({
                                                            ...formData,
                                                            bannerMedia: formData.bannerMedia.filter((_, i) => i !== index)
                                                        });
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: '4px',
                                                        right: '4px',
                                                        background: '#dc3545',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        padding: '4px 8px',
                                                        fontSize: '11px',
                                                        fontWeight: '600',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <p style={{ fontSize: '12px', color: '#666', marginTop: '12px', marginBottom: 0 }}>
                                    💡 Multiple images/videos will show as a slideshow in hero section
                                </p>
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
                                    Who it’s for / Specialties (Optional)
                                </label>
                                <RichTextEditor
                                    value={formData.specialties}
                                    onChange={(value) => setFormData({ ...formData, specialties: value })}
                                    placeholder="List who this service is for..."
                                />
                            </div>

                            {/* Includes */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontWeight: '600',
                                    color: '#1a1a1a',
                                    fontSize: '14px'
                                }}>
                                    Includes (Optional)
                                </label>
                                <RichTextEditor
                                    value={formData.includes}
                                    onChange={(value) => setFormData({ ...formData, includes: value })}
                                    placeholder="What does this service include? (e.g., Expert team, 24/7 support...)"
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
                                    Add images and videos of your work for this service
                                </p>

                                {/* Add Portfolio Item */}
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                                    {/* Upload Portfolio Button */}
                                    <div style={{ position: 'relative' }}>
                                        <button
                                            type="button"
                                            disabled={uploadingPortfolio}
                                            style={{
                                                padding: '10px 16px',
                                                background: '#eff6ff',
                                                color: 'var(--primary)',
                                                border: '1px solid #bfdbfe',
                                                borderRadius: '6px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                height: '42px',
                                                fontSize: '13px',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {uploadingPortfolio ? <Loader2 size={16} className="spin-anim" /> : <UploadCloud size={16} />}
                                            {uploadingPortfolio ? 'Processing...' : 'Upload Image'}
                                        </button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePortfolioUpload}
                                            disabled={uploadingPortfolio}
                                            style={{
                                                position: 'absolute',
                                                top: 0, left: 0, width: '100%', height: '100%',
                                                opacity: 0, cursor: 'pointer'
                                            }}
                                        />
                                    </div>

                                    <span style={{ fontSize: '12px', color: '#999', fontWeight: 'bold', alignSelf: 'center' }}>OR</span>

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
                                            minWidth: '100px'
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
                                            minWidth: '200px',
                                            padding: '10px',
                                            border: '2px solid #e1e4e8',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            outline: 'none'
                                        }}
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
                                                        background: '#dc3545',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        width: '24px',
                                                        height: '24px',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        fontWeight: 'bold',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onMouseOver={(e) => e.target.style.background = '#c82333'}
                                                    onMouseOut={(e) => e.target.style.background = '#dc3545'}
                                                    title="Remove"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{
                                        padding: '30px',
                                        textAlign: 'center',
                                        color: '#9ca3af',
                                        background: 'white',
                                        borderRadius: '6px',
                                        border: '2px dashed #e1e4e8',
                                        marginTop: '16px'
                                    }}>
                                        <p style={{ fontSize: '13px' }}>📷 No portfolio items added yet</p>
                                        <p style={{ fontSize: '11px', marginTop: '4px' }}>Add images or videos to showcase your work</p>
                                    </div>
                                )}
                            </div>

                            {/* Status */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontWeight: '600',
                                    color: '#1a1a1a',
                                    fontSize: '14px'
                                }}>
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '20px', borderTop: '1px solid #e1e4e8' }}>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    style={{
                                        padding: '12px 24px',
                                        background: '#6c757d',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '14px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.background = '#5a6268'}
                                    onMouseOut={(e) => e.target.style.background = '#6c757d'}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        padding: '12px 24px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        fontWeight: '600',
                                        fontSize: '14px',
                                        opacity: loading ? 0.7 : 1,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {loading ? 'Saving...' : (editingId ? 'Update Service' : 'Add Service')}
                                </button>
                            </div>
                        </form >
                    </div >
                </div >
            )}

            {/* Delete Confirmation Modal */}
            {
                deleteId && (
                    <ConfirmModal
                        isOpen={true}
                        message="Are you sure you want to delete this service? This action cannot be undone."
                        onConfirm={handleDelete}
                        onClose={() => setDeleteId(null)}
                        onCancel={() => setDeleteId(null)}
                    />
                )
            }

            {/* Custom Rename Modal (Integrated) */}
            {
                renameState.show && (
                    <div style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2000,
                        backdropFilter: 'blur(4px)'
                    }}>
                        <div style={{
                            background: 'white',
                            padding: '30px',
                            borderRadius: '16px',
                            width: '100%',
                            maxWidth: '400px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                        }}>
                            <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '700' }}>Rename Service Type</h3>
                            <label style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '8px' }}>Enter new name:</label>
                            <input
                                type="text"
                                value={renameState.newValue}
                                onChange={(e) => setRenameState({ ...renameState, newValue: e.target.value })}
                                autoFocus
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '2px solid #e1e4e8',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    marginBottom: '24px'
                                }}
                            />
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => setRenameState({ show: false, oldType: '', newValue: '' })}
                                    style={{ padding: '10px 20px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRenameExecute}
                                    style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                                >
                                    Rename Now
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Custom Action Confirm Modal (Universal) */}
            {
                confirmState.show && (
                    <div style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2000,
                        backdropFilter: 'blur(4px)'
                    }}>
                        <div style={{
                            background: 'white',
                            padding: '30px',
                            borderRadius: '16px',
                            width: '100%',
                            maxWidth: '450px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>{confirmState.type === 'danger' ? '⚠️' : 'ℹ️'}</div>
                            <p style={{ fontSize: '16px', color: '#1a1a1a', marginBottom: '24px', lineHeight: '1.5' }}>{confirmState.message}</p>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                <button
                                    onClick={confirmState.onCancel || (() => setConfirmState({ show: false }))}
                                    style={{ padding: '10px 20px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                                >
                                    {confirmState.cancelLabel || 'Cancel'}
                                </button>
                                <button
                                    onClick={confirmState.onConfirm}
                                    style={{
                                        padding: '10px 24px',
                                        background: confirmState.type === 'danger' ? '#dc3545' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700'
                                    }}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Services;
