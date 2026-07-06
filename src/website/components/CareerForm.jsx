import React, { useState } from 'react';
import { Send, User, Mail, Phone, Briefcase, UploadCloud, FileText, Link } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import db from '../../firebase/firestore';

const CareerForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        portfolioUrl: '',
        message: ''
    });
    const [submissionType, setSubmissionType] = useState('file'); // 'file' | 'link'
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 1048487) { // 1MB limit for Firestore
                alert("File size must be less than 1MB for database storage.");
                return;
            }
            setResumeFile(file);
        }
    };

    // Helper to convert file to Base64
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Specific Validation based on submission type
        if (submissionType === 'file' && !resumeFile) {
            alert("Please upload your resume file.");
            return;
        }
        if (submissionType === 'link' && !formData.portfolioUrl) {
            alert("Please provide your portfolio/resume link.");
            return;
        }

        setLoading(true);
        setStatus(null);

        try {
            let base64File = null;
            if (submissionType === 'file' && resumeFile) {
                // 1. Convert to Base64 for Firestore
                base64File = await toBase64(resumeFile);
            }

            // 2. Save to Firestore
            const docData = {
                ...formData,
                type: 'job_application',
                submissionType: submissionType,
                createdAt: new Date().toISOString()
            };

            if (submissionType === 'file' && resumeFile) {
                docData.resumeName = resumeFile.name;
                docData.resumeData = base64File;
            }

            await addDoc(collection(db, "job_applications"), docData);

            // 3. Send Email via FormSubmit AJAX
            const emailData = new FormData();
            emailData.append("Name", formData.name);
            emailData.append("Email", formData.email);
            emailData.append("Phone", formData.phone);
            emailData.append("Position", formData.position);

            if (submissionType === 'link') {
                emailData.append("Portfolio/Resume Link", formData.portfolioUrl);
            }

            emailData.append("Message", formData.message);

            // Conditional Attachment
            if (submissionType === 'file' && resumeFile) {
                // "attachment" is a reserved name in some form handlers
                emailData.append("attachment", resumeFile, resumeFile.name);
            }

            emailData.append("_template", "table");
            emailData.append("_subject", `New Job Application for ${formData.position}`);
            emailData.append("_captcha", "false");

            await fetch("https://formsubmit.co/ajax/adminsmtechsolution@gmail.com", {
                method: "POST",
                headers: {
                    'Accept': 'application/json'
                },
                body: emailData
            });

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', position: '', portfolioUrl: '', message: '' });
            setResumeFile(null);
            setTimeout(() => setStatus(null), 5000);
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '14px 14px 14px 48px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        outline: 'none',
        fontSize: '15px',
        transition: 'all 0.2s',
        color: '#334155',
        background: '#f8fafc'
    };

    const focusHandler = (e) => {
        e.target.style.background = 'white';
        e.target.style.borderColor = 'var(--primary)';
        e.target.style.boxShadow = '0 0 0 3px rgba(55, 180, 111, 0.1)';
    };

    const blurHandler = (e) => {
        e.target.style.background = '#f8fafc';
        e.target.style.borderColor = '#e2e8f0';
        e.target.style.boxShadow = 'none';
    };

    return (
        <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '24px',
            boxShadow: '0 20px 40px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #f1f5f9',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: '800', fontFamily: "'Merriweather', serif", fontStyle: 'italic', color: 'var(--secondary)', marginBottom: '10px' }}>
                    Apply for a Position
                </h3>
                <p style={{ color: '#64748b' }}>Fill out the form below and attach your resume.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Full Name */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#334155' }}>Full Name</label>
                    <div style={{ position: 'relative' }}>
                        <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Full Name"
                            required
                            style={inputStyle}
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                        />
                    </div>
                </div>

                {/* Email */}
                <div style={{ gridColumn: 'span 1' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#334155' }}>Email Address</label>
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Email Address"
                            required
                            style={inputStyle}
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                        />
                    </div>
                </div>

                {/* Phone */}
                <div style={{ gridColumn: 'span 1' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#334155' }}>Phone Number</label>
                    <div style={{ position: 'relative' }}>
                        <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter Phone Number"
                            required
                            style={inputStyle}
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                        />
                    </div>
                </div>

                {/* Position */}
                <div style={{ gridColumn: 'span 1' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#334155' }}>Position Applying For</label>
                    <div style={{ position: 'relative' }}>
                        <Briefcase size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            placeholder="Enter Applying Position"
                            required
                            style={inputStyle}
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                        />
                    </div>
                </div>

                {/* Resume / Portfolio Toggle Field */}
                <div style={{ gridColumn: 'span 1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Resume / Portfolio</label>
                        <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
                            <span
                                onClick={() => setSubmissionType('file')}
                                style={{
                                    cursor: 'pointer',
                                    color: submissionType === 'file' ? 'var(--primary)' : '#94a3b8',
                                    fontWeight: submissionType === 'file' ? 'bold' : 'normal',
                                    borderBottom: submissionType === 'file' ? '2px solid var(--primary)' : 'none'
                                }}
                            >
                                Upload File
                            </span>
                            <span style={{ color: '#cbd5e1' }}>|</span>
                            <span
                                onClick={() => setSubmissionType('link')}
                                style={{
                                    cursor: 'pointer',
                                    color: submissionType === 'link' ? 'var(--primary)' : '#94a3b8',
                                    fontWeight: submissionType === 'link' ? 'bold' : 'normal',
                                    borderBottom: submissionType === 'link' ? '2px solid var(--primary)' : 'none'
                                }}
                            >
                                Share Link
                            </span>
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        {submissionType === 'file' ? (
                            <>
                                <div style={{
                                    position: 'absolute',
                                    left: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    pointerEvents: 'none',
                                    zIndex: 1
                                }}>
                                    {resumeFile ? <FileText size={18} color="var(--primary)" /> : <UploadCloud size={18} color="#94a3b8" />}
                                </div>
                                <input
                                    type="file"
                                    accept=".pdf, .doc, .docx"
                                    onChange={handleFileChange}
                                    required={submissionType === 'file'}
                                    style={{
                                        ...inputStyle,
                                        padding: '11px 14px 11px 48px',
                                        cursor: 'pointer',
                                        color: resumeFile ? 'var(--primary)' : '#64748b'
                                    }}
                                    onFocus={focusHandler}
                                    onBlur={blurHandler}
                                />
                            </>
                        ) : (
                            <>
                                <Link size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="url"
                                    name="portfolioUrl"
                                    value={formData.portfolioUrl}
                                    onChange={handleChange}
                                    placeholder="Paste Portfolio/Resume Link"
                                    required={submissionType === 'link'}
                                    style={inputStyle}
                                    onFocus={focusHandler}
                                    onBlur={blurHandler}
                                />
                            </>
                        )}
                    </div>
                </div>

                {/* Message (Optional) */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#334155' }}>Why should we hire you? (Short Note)</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your skills and experience..."
                        required
                        rows="3"
                        style={{ ...inputStyle, padding: '14px', resize: 'vertical' }}
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                    />
                </div>

                {/* Submit Button */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '16px',
                            background: 'var(--secondary)', // Black
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '700',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Uploading & Submitting...' : (
                            <>
                                Submit Application <Send size={18} />
                            </>
                        )}
                    </button>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                    <div style={{ gridColumn: '1 / -1', padding: '12px', background: '#dcfce7', color: '#166534', borderRadius: '8px', fontSize: '14px', textAlign: 'center', fontWeight: '500' }}>
                        Application submitted successfully! HR will review and contact you.
                    </div>
                )}
                {status === 'error' && (
                    <div style={{ gridColumn: '1 / -1', padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', fontSize: '14px', textAlign: 'center', fontWeight: '500' }}>
                        Something went wrong. Please try again later.
                    </div>
                )}
            </form>

            {/* Mobile Responsive Styles */}
            <style>
                {`
                    @media (max-width: 600px) {
                        /* Form Container Mobile */
                        form[style*="grid-template-columns"] {
                            grid-template-columns: 1fr !important;
                            gap: 16px !important;
                        }
                        
                        /* Form Fields Mobile */
                        form > div {
                            grid-column: 1 / -1 !important;
                        }
                        
                        /* Reduce Padding on Mobile */
                        form {
                            padding: 0 !important;
                        }
                        
                        /* Outer Container Padding Mobile */
                        div[style*="padding: 40px"] {
                            padding: 25px 20px !important;
                        }
                        
                        /* Heading Size Mobile */
                        h3 {
                            font-size: 20px !important;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default CareerForm;
