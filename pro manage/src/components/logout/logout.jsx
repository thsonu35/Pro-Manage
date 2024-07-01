import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        toast.success('Logged out successfully');
        navigate('/login');
    }, [navigate]);

    return null; // This component doesn't render anything
};

export default Logout;
