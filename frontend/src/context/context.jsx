/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';

export let contextdata = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('auth-token') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = 'http://localhost:4000/api/user';

  // Helper function to get headers with token
  const getHeaders = (includeAuth = false) => {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (includeAuth && token) {
      headers['auth-token'] = token;
    }
    return headers;
  };

  // Auto-fetch user credentials when token is available
  useEffect(() => {
    if (token) {
      localStorage.setItem('auth-token', token);
      getCredentials();
    }
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setToken(data.token);
      localStorage.setItem('auth-token', data.token);
      return { success: true, token: data.token };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          user: userData.username,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
          county: userData.county,
          description: userData.location_description
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign up failed');
      }

      setToken(data.token);
      localStorage.setItem('auth-token', data.token);
      return { success: true, token: data.token };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth-token');
    window.location.reload();
  };

  // Get user credentials
  const getCredentials = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/getcredentials`, {
        method: 'GET',
        headers: getHeaders(true)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get credentials');
      }

      setUser(data.credentials);
      return { success: true, credentials: data.credentials };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Upload document - IMPROVED VERSION
  const uploadDocument = async (file) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Starting upload for file:', file.name, file.type, file.size);

      const formData = new FormData();
      formData.append('document', file);

      const response = await fetch(`${BASE_URL}/uploaddocument`, {
        method: 'POST',
        body: formData,
      });

      console.log('Upload response status:', response.status, response.statusText);

      // Check if response is OK before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Upload JSON response:', data);

      if (!data.success) {
        throw new Error(data.message || 'Upload failed on server');
      }

      if (!data.url) {
        throw new Error('No URL returned from upload');
      }

      return { success: true, url: data.url };
      
    } catch (err) {
      console.error('Upload error in context:', err);
      const errorMessage = err.message || 'Upload failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Upload image
  const uploadImage = async (file) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${BASE_URL}/uploadimage`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      return { success: true, url: data.url };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Get news
  const getNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/getnews`, {
        method: 'GET',
        headers: getHeaders()
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get news');
      }

      return { success: true, news: data.news };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Get products
  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/getproducts`, {
        method: 'GET',
        headers: getHeaders()
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get products');
      }

      return { success: true, products: data.products };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Get jobs
  const getJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/getjobs`, {
        method: 'GET',
        headers: getHeaders()
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get jobs');
      }

      return { success: true, jobs: data.jobs };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Create a post (news, product, or job)
  const createPost = async (postData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/post`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(postData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create post');
      }

      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Submit resume/application
  const submitResume = async (applicationData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/resume`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(applicationData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit resume');
      }

      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Get my applications
  const getMyApplications = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/myapplication`, {
        method: 'GET',
        headers: getHeaders(true)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get applications');
      }

      return { success: true, applications: data.myapplication };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Get received applications
  const getReceivedApplications = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/receivedapplication`, {
        method: 'GET',
        headers: getHeaders(true)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get received applications');
      }

      return { success: true, applications: data.receivedapplication };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update application status
  const updateApplicationStatus = async (applicationId, status) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/updatestatus`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify({
          id: applicationId,
          status: status
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update status');
      }

      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    // State
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token,

    // Auth functions
    login,
    signUp,
    logout,
    getCredentials,

    // Upload functions
    uploadDocument,
    uploadImage,

    // Content functions
    getNews,
    getProducts,
    getJobs,
    createPost,

    // Application functions
    submitResume,
    getMyApplications,
    getReceivedApplications,
    updateApplicationStatus,

    // Utility
    clearError: () => setError(null)
  };

  return (
    <contextdata.Provider value={contextValue}>
      {children}
    </contextdata.Provider>
  );
};

export default ContextProvider;