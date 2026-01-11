import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  schoolName?: string;
  role: string;
}

const UserList: React.FC = () => {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Registry...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={styles.title}>Student & Teacher Registry</h2>
        <span style={styles.countBadge}>{user.length} Total Members</span>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Full Name</th>
              <th style={styles.th}>Email Address</th>
              <th style={styles.th}>School</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr key={user.id} style={styles.tr}>
                <td style={styles.td}><strong>{user.name}</strong></td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.schoolName || 'Not Assigned'}</td>
                <td style={styles.td}>
                  <span style={styles.roleTag}>{user.role}</span>
                </td>
                <td style={styles.td}>
                  <div style={styles.statusDot}></div> Active
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: '40px', maxWidth: '1200px', margin: '0 auto' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { fontSize: '24px', color: '#1a202c', margin: 0 },
  countBadge: { backgroundColor: '#ebf8ff', color: '#2b6cb0', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
  tableWrapper: { backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' as const },
  tableHeader: { backgroundColor: '#f7fafc', borderBottom: '2px solid #edf2f7' },
  th: { padding: '15px', color: '#718096', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' },
  tr: { borderBottom: '1px solid #edf2f7', transition: 'background 0.2s' },
  td: { padding: '15px', fontSize: '14px', color: '#2d3748' },
  roleTag: { backgroundColor: '#edf2f7', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', textTransform: 'uppercase' },
  statusDot: { display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#48bb78', borderRadius: '50%', marginRight: '5px' }
};

export default UserList;