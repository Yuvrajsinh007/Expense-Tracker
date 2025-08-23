import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      navigate('/home');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      // Specific error handling for different scenarios
      if (errorMessage.includes('Invalid credentials')) {
        return { success: false, message: 'Invalid email or password.' };
      } else if (errorMessage.includes('User not found')) {
        return { success: false, message: 'User not found, please register.' };
      }
      return { success: false, message: errorMessage };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post('/api/auth/register', { name, email, password });
      // Automatically log in the user after successful registration
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      navigate('/home');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      // Specific error handling for different scenarios
      if (errorMessage.includes('User already exists')) {
        return { success: false, message: 'User already exists.' };
      }
      return { success: false, message: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const updateProfile = async (name, email) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      
      const { data } = await axios.put('/api/auth/profile', {
        name,
        email
      }, config);
      
      // Update localStorage and state
      const updatedUser = { ...user, name: data.name, email: data.email };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update profile'
      };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      
      await axios.put('/api/auth/password', {
        currentPassword,
        newPassword
      }, config);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to change password'
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;