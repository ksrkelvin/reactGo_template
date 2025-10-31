import React from 'react';

const Loading: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <div style={{ padding: 20, background: 'white', borderRadius: 8, boxShadow: '0 0 10px rgba(0,0,0,0.3)', fontSize: 18 }}>
        Carregando...
      </div>
    </div>
  );
};

export default Loading;
