import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const isAdmin = sessionStorage.getItem('isAdmin');

    return isAdmin ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;