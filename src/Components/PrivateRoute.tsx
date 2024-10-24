import React from 'react';
import { Navigate } from 'react-router-dom';
import * as jwtDecodeModule from "jwt-decode";

// Cast the imported module as a function
const jwtDecode = jwtDecodeModule.jwtDecode as <T>(token: string) => T;

interface PrivateRouteProps {
    children: JSX.Element;
}

interface DecodedToken {
    exp: number;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string; // Adjust this to match the token structure
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(token);

        console.log("Decoded token:", decoded);

        // Check if the user has the 'Admin' role using the full claim name
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        if (role !== "Admin") {
            return <Navigate to="/unauthorized" />;
        }

        // Check if the token is expired
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            return <Navigate to="/login" />;
        }
    } catch (error) {
        console.error("Invalid token:", error);
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
