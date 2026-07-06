import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Loader2 size={24} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
);
export default Loader;