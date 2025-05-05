import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Changed from FaHome to FaArrowLeft

function BackButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)} // Changed to go back in history instead of always home
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Center the icon
                gap: '8px',
                padding: '8px',
                background: 'transparent', // More subtle background
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                margin: '10px',
                fontSize: '1.2rem',
                color: '#333' // Customize color as needed
            }}
            aria-label="Go back" // Accessibility improvement
        >
            <FaArrowLeft />
            {/* Removed the "Back to Home" text */}
        </button>
    );
}

export default BackButton;