import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, Palette, Type, Image, UploadCloud, Loader2 } from 'lucide-react';

const RichTextEditor = ({ value, onChange, placeholder = "Write something amazing..." }) => {
    const editorRef = useRef(null);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const toolbarRef = useRef(null);
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (toolbarRef.current && !toolbarRef.current.contains(event.target)) {
                setShowColorPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        handleInput();
    };

    const handleInput = () => {
        if (onChange) {
            const content = editorRef.current?.innerHTML || '';
            onChange(content);
        }
    };

    const applyColor = (color) => {
        editorRef.current?.focus();

        // Ensure we use CSS styles (<span> tags) instead of deprecated <font> tags
        document.execCommand('styleWithCSS', false, true);
        document.execCommand('foreColor', false, color);

        setShowColorPicker(false);
        handleInput();
    };

    const addImage = () => {
        editorRef.current?.focus();
        const url = prompt('Enter the Image URL:');
        if (!url) return;

        const width = prompt('Enter Image Width (e.g., 50%, 300px) [Default: 100%]:', '100%');
        const alt = prompt('Enter Alt Text (Optional):', '');

        const imgHtml = `<img src="${url}" alt="${alt || ''}" style="width: ${width || '100%'} !important; display: block; margin: 10px auto;" />`;
        execCommand('insertHTML', imgHtml);
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
                    const maxWidth = 800;
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

                    // Compress to JPEG with 0.5 quality to significantly reduce size
                    resolve(canvas.toDataURL('image/jpeg', 0.5));
                };
                img.onerror = (err) => reject(err);
            };
            reader.onerror = (err) => reject(err);
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const compressedBase64 = await compressImage(file);



            editorRef.current?.focus();
            const imgHtml = `<img src="${compressedBase64}" style="width: 100% !important; display: block; margin: 10px auto;" />`;
            execCommand('insertHTML', imgHtml);
        } catch (error) {
            console.error("Error processing image:", error);
            alert("Failed to process image.");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    };

    const handleEditorClick = (e) => {
        if (e.target.tagName === 'IMG') {
            const currentWidth = e.target.style.width || '100%';
            const newWidth = prompt('Adjust Image Width (e.g., 50%, 300px):', currentWidth);
            if (newWidth) {
                e.target.style.width = newWidth;
                handleInput(); // Save changes
            }
        }
    };

    return (
        <div style={{
            border: '2px solid #eef2f6',
            borderRadius: '12px',
            overflow: 'hidden',
            background: 'white',
            transition: 'border-color 0.2s',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#eef2f6'}
        >
            {/* Professional Toolbar (Matching Screenshot Image 3) */}
            <div
                ref={toolbarRef}
                style={{
                    display: 'flex',
                    gap: '8px',
                    padding: '12px',
                    borderBottom: '1px solid #f1f5f9',
                    backgroundColor: '#ffffff',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => execCommand('bold')}
                    style={{
                        width: '36px',
                        height: '36px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        background: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#475569',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                    title="Bold"
                >
                    <Bold size={18} strokeWidth={2.5} />
                </button>

                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => execCommand('italic')}
                    style={{
                        width: '36px',
                        height: '36px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        background: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#475569',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                    title="Italic"
                >
                    <Italic size={18} strokeWidth={2.5} />
                </button>

                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => execCommand('underline')}
                    style={{
                        width: '36px',
                        height: '36px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        background: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#475569',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                    title="Underline"
                >
                    <Underline size={18} strokeWidth={2.5} />
                </button>

                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={addImage}
                    style={{
                        width: '36px',
                        height: '36px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        background: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#475569',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                    title="Insert Image URL"
                >
                    <Image size={18} strokeWidth={2.5} />
                </button>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleFileUpload}
                />

                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    style={{
                        width: '36px',
                        height: '36px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        background: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: uploading ? '#cbd5e1' : '#475569',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => { if (!uploading) { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; } }}
                    onMouseOut={(e) => { if (!uploading) { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e2e8f0'; } }}
                    title="Upload Image"
                >
                    {uploading ? <Loader2 size={18} className="spin-anim" /> : <UploadCloud size={18} strokeWidth={2.5} />}
                </button>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spin-anim { animation: spin 1s linear infinite; }`}</style>

                <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 4px' }}></div>

                <div style={{ position: 'relative' }}>
                    <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '0 12px',
                            height: '36px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            background: 'white',
                            cursor: 'pointer',
                            color: '#475569',
                            fontSize: '13px',
                            fontWeight: '600',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                    >
                        <Type size={16} />
                        Color
                    </button>

                    {showColorPicker && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            marginTop: '8px',
                            padding: '12px',
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                            zIndex: 9999,
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            gap: '8px',
                            minWidth: '180px'
                        }}>
                            {['var(--secondary)', '#334155', '#ef4444', '#f97316', '#f59e0b',
                                '#10b981', 'var(--accent)', '#6366f1', 'var(--accent)', '#d946ef',
                                '#000000', '#64748b', '#dc2626', 'var(--primary)', 'var(--accent)'].map(color => (
                                    <button
                                        key={color}
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => applyColor(color)}
                                        style={{
                                            width: '28px',
                                            height: '28px',
                                            background: color,
                                            border: '1px solid #f1f5f9',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            transition: 'transform 0.1s'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        title={color}
                                    />
                                ))}
                            <div style={{ gridColumn: '1 / -1', marginTop: '8px', borderTop: '1px solid #e2e8f0', paddingTop: '8px' }}>
                                <label
                                    onMouseDown={(e) => e.preventDefault()}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b', cursor: 'pointer' }}
                                >
                                    <input
                                        type="color"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onChange={(e) => { applyColor(e.target.value); }}
                                        style={{ width: '40px', height: '32px', cursor: 'pointer', border: 'none', background: 'transparent' }}
                                    />
                                    Custom color
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                <select
                    onChange={(e) => {
                        execCommand('formatBlock', e.target.value);
                        e.target.value = "p"; // Reset to Normal Text after selection
                    }}
                    style={{
                        height: '36px',
                        padding: '0 12px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        background: 'white',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#475569',
                        outline: 'none'
                    }}
                >
                    <option value="p">Normal Text</option>
                    <option value="h2">Heading 1</option>
                    <option value="h3">Heading 2</option>
                    <option value="h4">Heading 3</option>
                    <option value="blockquote">Quote</option>
                </select>

                <select
                    onChange={(e) => {
                        document.execCommand('styleWithCSS', false, true);
                        execCommand('fontName', e.target.value);
                    }}
                    style={{
                        height: '36px',
                        padding: '0 12px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        background: 'white',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#475569',
                        outline: 'none',
                        minWidth: '100px'
                    }}
                >
                    <option value="'Merriweather'">Merriweather</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Monospace</option>
                </select>
            </div>

            {/* Content Area */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onPaste={handlePaste}
                onClick={handleEditorClick}
                style={{
                    minHeight: '350px',
                    padding: '24px',
                    outline: 'none',
                    fontSize: '16px',
                    lineHeight: '1.7',
                    color: 'var(--secondary)',
                    background: '#ffffff',
                    fontFamily: "'Merriweather', serif"
                }}
            />

            <style dangerouslySetInnerHTML={{
                __html: `
                [contenteditable]:empty:before {
                    content: "${placeholder}";
                    color: #94a3b8;
                    font-style: italic;
                }
            `}} />
        </div>
    );
};

export default RichTextEditor;
