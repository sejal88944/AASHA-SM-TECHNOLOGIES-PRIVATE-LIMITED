import React, { useState, useEffect } from 'react';
import db from '../../firebase/firestore';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Layout, Briefcase, FileText, MessageSquare, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({
        services: 0,
        blogs: 0,
        inquiries: 0
    });
    const [recentInquiries, setRecentInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch counts
                const servicesSnap = await getDocs(collection(db, "services"));
                const blogsSnap = await getDocs(collection(db, "blogs"));
                const inquiriesSnap = await getDocs(collection(db, "inquiries"));

                setStats({
                    services: servicesSnap.size,
                    blogs: blogsSnap.size,
                    inquiries: inquiriesSnap.size
                });

                // Fetch recent 5 inquiries
                // Note: 'createdAt' field might vary, assuming ISO string or timestamp
                const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"), limit(5));
                const recentSnap = await getDocs(q);
                // Fallback if sorting fails due to missing index, just take the first 5 from the main snap for now if q fails (caught in catch)
                // but let's try the query. If it fails, we handle it.
                // Actually, standard fetch for small data is fine.
                const recent = recentSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRecentInquiries(recent);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);

                // Fallback for inquiries if index is missing
                if (error.code === 'failed-precondition') {
                    const inquiriesSnap = await getDocs(collection(db, "inquiries"));
                    const allInquiries = inquiriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    // Sort client side
                    allInquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setRecentInquiries(allInquiries.slice(0, 5));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const StatCard = ({ title, count, icon: Icon, color, link }) => (
        <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            transition: 'transform 0.2s',
            cursor: 'default'
        }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                    <h3 style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginBottom: '8px' }}>{title}</h3>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--secondary)' }}>{loading ? '-' : count}</div>
                </div>
                <div style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: `${color}20`,
                    color: color
                }}>
                    <Icon size={24} />
                </div>
            </div>
            {link && (
                <Link to={link} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: color, fontWeight: '600', textDecoration: 'none' }}>
                    View Details <ArrowRight size={14} />
                </Link>
            )}
        </div>
    );

    return (
        <div style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: 'var(--secondary)' }}>Dashboard Overview</h1>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
                marginBottom: '40px'
            }}>
                <StatCard title="Active Services" count={stats.services} icon={Briefcase} color="#7c3aed" link="/aashasm-portal/services" />
                <StatCard title="Published Blogs" count={stats.blogs} icon={FileText} color="var(--primary)" link="/aashasm-portal/blogs" />
                <StatCard title="Total Inquiries" count={stats.inquiries} icon={MessageSquare} color="#d97706" />
            </div>

            {/* Recent Inquiries Section */}
            <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', padding: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--secondary)' }}>Recent Inquiries</h2>
                    {/* <Link to="/admin/inquiries" style={{ fontSize: '14px', color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>View All</Link> */}
                </div>

                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Loading recent activity...</div>
                ) : recentInquiries.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <th style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Name</th>
                                    <th style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Email</th>
                                    <th style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Date</th>
                                    <th style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentInquiries.map((inquiry) => (
                                    <tr key={inquiry.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px', fontSize: '14px', color: '#334155', fontWeight: '500' }}>{inquiry.name || 'N/A'}</td>
                                        <td style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span>{inquiry.email}</span>
                                                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{inquiry.phone}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px', fontSize: '13px', color: '#64748b' }}>
                                            {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : 'Unknown'}
                                        </td>
                                        <td style={{ padding: '16px', fontSize: '14px', color: '#475569', maxWidth: '300px' }}>
                                            {inquiry.message ? (inquiry.message.length > 50 ? inquiry.message.substring(0, 50) + '...' : inquiry.message) : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', background: '#f8fafc', borderRadius: '8px' }}>
                        No inquiries received yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
