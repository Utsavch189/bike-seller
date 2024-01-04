import React, { useContext } from 'react';
import RootContext from '../context/RootContext';

const ProtectedRoute = ({ children }) => {
	const context = useContext(RootContext);

	if (!context.isLogin) {
		return <div className="text-4xl font-semibold">Not Found 404</div>
	}

	return children;
}

export default ProtectedRoute;
