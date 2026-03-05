import React from 'react';

const BetaBanner = ({ 
  show = true,
  title = "Beta Notice:",
  message = "These Helm charts are currently in beta. While stable for testing and development environments, please thoroughly test in your specific environment before production deployment.",
  link = "https://docs.netboxlabs.com/enterprise",
  linkText = "main documentation"
}) => {
  if (!show) return null;

  return (
    <div style={{
      background: '#fff3cd', 
      border: '1px solid #ffeaa7', 
      borderRadius: '4px', 
      padding: '15px', 
      margin: '20px 0', 
      color: '#856404'
    }}>
      <strong>{title}</strong> {message} For the most up-to-date information, please refer to the{' '}
      <a href={link} target="_blank" rel="noopener noreferrer">{linkText}</a>.
    </div>
  );
};

export default BetaBanner; 