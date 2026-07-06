import React from 'react';

const AdminNavbar = () => {
    return (
        <div style={{ height: '60px', backgroundColor: '#fff', borderBottom: '1px solid #e1e4e8', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/ASM Logo.jpeg" alt="AASHA-SM TECHNOLOGIES" style={{ height: '40px', objectFit: 'contain' }} />
                <h2 style={{ margin: 0, color: '#333', fontSize: '1.25rem', fontWeight: '600' }}>ADMIN</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>Administrator</span>
                <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>A</div>
            </div>
        </div>
    );
};

export default AdminNavbar;
