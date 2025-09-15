import React from 'react';


const Nav: React.FC = () => {
    return (
        <nav style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: '1rem 2rem',
            backgroundColor: '#222',
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
        }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' , fontFamily: 'Poppins, sans-serif'}}>
                BITS Cred Manager 
            </div>
        
        </nav>
    );
};

export default Nav;