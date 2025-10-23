import { ContactInfo } from './types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactInfo: ContactInfo;
}

export default function ContactModal({ isOpen, onClose, contactInfo }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      zIndex: 1000,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        maxWidth: '380px',
        width: '100%',
        padding: '24px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            margin: 0,
            color: '#2c3e50'
          }}>Get in Touch</h3>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6c757d',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#f8f9fa';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            ×
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px', marginBottom: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            background: '#f8f9fa',
            borderRadius: '10px'
          }}>
            <span style={{ fontSize: '18px' }}>📧</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#2c3e50', marginBottom: '2px' }}>Email</div>
              <a href={`mailto:${contactInfo.email}`} style={{
                fontSize: '13px',
                color: '#2c3e50',
                textDecoration: 'none'
              }}>
                {contactInfo.email}
              </a>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            background: '#f8f9fa',
            borderRadius: '10px'
          }}>
            <span style={{ fontSize: '18px' }}>💼</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#2c3e50', marginBottom: '2px' }}>LinkedIn</div>
              <a href={contactInfo.linkedin} style={{
                fontSize: '13px',
                color: '#2c3e50',
                textDecoration: 'none'
              }}>
                LinkedIn Profile
              </a>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            background: '#f8f9fa',
            borderRadius: '10px'
          }}>
            <span style={{ fontSize: '18px' }}>💻</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#2c3e50', marginBottom: '2px' }}>GitHub</div>
              <a href={contactInfo.github} style={{
                fontSize: '13px',
                color: '#2c3e50',
                textDecoration: 'none'
              }}>
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => window.open(`mailto:${contactInfo.email}`)}
            style={{
              flex: 1,
              background: '#2c3e50',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#34495e';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#2c3e50';
            }}
          >
            Send Email
          </button>
          <button 
            onClick={onClose}
            style={{
              flex: 1,
              background: '#f8f9fa',
              color: '#2c3e50',
              border: '1px solid #e9ecef',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#e9ecef';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#f8f9fa';
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}