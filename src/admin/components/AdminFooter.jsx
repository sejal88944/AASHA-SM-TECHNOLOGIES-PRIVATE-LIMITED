import React from 'react';

const AdminFooter = () => {
    return (
        <footer style={{ textAlign: 'center', padding: '15px', backgroundColor: '#fff', borderTop: '1px solid #e1e4e8', color: '#666', fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} AASHA-SM TECHNOLOGIES. All rights reserved.
        </footer>
    );
};

export default AdminFooter;
