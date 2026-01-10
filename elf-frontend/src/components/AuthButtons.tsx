import React from 'react';
import { handleSocialLogin } from '../services/authService';

const AuthButtons: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Google Button */}
      <button onClick={() => handleSocialLogin('google')} style={styles.googleBtn}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" 
          alt="G" 
          style={styles.icon} 
        />
        Continue with Google
      </button>

      {/* Facebook Button */}
      <button onClick={() => handleSocialLogin('facebook')} style={styles.facebookBtn}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" 
          alt="F" 
          style={styles.icon} 
        />
        Continue with Facebook
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
    marginTop: '20px'
  },
  googleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '12px',
    backgroundColor: '#ffffff',
    color: '#3c4043',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  facebookBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '12px',
    backgroundColor: '#1877F2', // Official Facebook Blue
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  icon: {
    width: '20px',
    height: '20px'
  }
};

export default AuthButtons;