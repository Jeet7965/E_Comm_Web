import { createContext, useState, useEffect } from 'react';
import { loginUser } from '../Services/authServices';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        const loggedInUser = await loginUser(credentials);
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
