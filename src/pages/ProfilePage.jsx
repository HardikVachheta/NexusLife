import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { User, Mail, CalendarDays, Edit, Save, XCircle, Loader2, CheckCircle, AlertCircle } from 'lucide-react'; // Icons from lucide-react
import { colors } from '../components/lib/utils';
import axiosInstance from '../services/axios';

const ProfilePage = () => {
  // State to hold the fetched user data
  const [user, setUser] = useState(null);
  // State to manage form input values for editing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  // State to indicate loading status during API calls
  const [loading, setLoading] = useState(true);
  // State to store any error messages from API calls
  const [error, setError] = useState(null);
  // State to toggle between view mode and edit mode for the profile
  const [editMode, setEditMode] = useState(false);
  // State for displaying success or error messages to the user
  const [message, setMessage] = useState({ type: '', text: '' }); // type: 'success' or 'error'

  // Retrieve the authentication token from local storage
  // This token is expected to be set during the login process
  const token = localStorage.getItem('token');

  const [isHovered, setIsHovered] = useState(false);

  // useEffect hook to fetch user profile data when the component mounts or token changes
  useEffect(() => {
    // Clear any previous messages when the effect runs
    setMessage({ type: '', text: '' });

    // If no token is found, set an error and stop loading
    if (!token) {
      setError('Authentication token not found. Please log in to view your profile.');
      setLoading(false);
      return;
    }

    // Asynchronous function to fetch user profile from the backend
    const fetchUserProfile = async () => {
      try {
        setLoading(true); // Start loading
        setError(null);   // Clear any previous errors

        // Configure Axios request with the Authorization header
        const config = {
          headers: {
            // Use 'Bearer ' prefix as per standard practice
            'Authorization': `Bearer ${token}`,
          },
        };
        // Make the GET request to the profile API endpoint
        // Ensure this URL matches your backend's profile endpoint
        const res = await axiosInstance.get('/profile');
        setUser(res.data); // Set the fetched user data to state
        // Initialize form data with the current user's name and email
        setFormData({ name: res.data.name, email: res.data.email });
      } catch (err) {
        console.error('Error fetching profile:', err);
        // Set an error message based on the API response or a generic one
        setError(err.response?.data?.msg || 'Failed to fetch profile data. Please try again.');
      } finally {
        setLoading(false); // End loading, regardless of success or failure
      }
    };

    fetchUserProfile(); // Call the fetch function
  }, [token]); // Dependency array: re-run this effect if the token changes

  // Handler for changes in form input fields
  const handleChange = (e) => {
    // Update the formData state with the new input value
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for form submission (updating profile)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setMessage({ type: '', text: '' }); // Clear previous messages
    setError(null);                     // Clear previous errors
    setLoading(true);                   // Start loading

    try {
      // Configure Axios request with Content-Type and Authorization header
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };
      // Make the PUT request to the profile API endpoint with updated data
      // Ensure this URL matches your backend's profile endpoint
      const res = await axiosInstance.put('/profile', formData);
      setUser(res.data); // Update the user state with the newly saved data
      setMessage({ type: 'success', text: 'Profile updated successfully!' }); // Show success message
      setEditMode(false); // Exit edit mode
    } catch (err) {
      console.error('Error updating profile:', err);
      // Set an error message based on the API response or a generic one
      setError(err.response?.data?.msg || 'Failed to update profile. Please check your input.');
    } finally {
      setLoading(false); // End loading
    }
  };

  // Handler for canceling the edit mode
  const handleCancelEdit = () => {
    setEditMode(false); // Exit edit mode
    // Reset form data to the current user's data to discard unsaved changes
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
    setError(null); // Clear any errors
    setMessage({ type: '', text: '' }); // Clear any messages
  };

  // Conditional rendering based on loading, error, or user data availability
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
        <p className="ml-3 text-lg text-gray-700">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md flex items-center">
          <AlertCircle className="w-6 h-6 mr-2" />
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg shadow-md flex items-center">
          <AlertCircle className="w-6 h-6 mr-2" />
          <span>User data not available. Please ensure you are logged in.</span>
        </div>
      </div>
    );
  }

  return (
    // This outer div ensures the content is centered and takes up full height on all devices
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-md md:max-w-lg lg:max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
          <User className="w-8 h-8 mr-3 text-blue-600" />
          My Profile
        </h1>

        {/* Message display for success or error */}
        {message.text && (
          <div className={`p-4 mb-6 rounded-lg flex items-center ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-red-100 text-red-700 border border-red-400'}`}>
            {message.type === 'success' ? <CheckCircle className="w-5 h-5 mr-2" /> : <AlertCircle className="w-5 h-5 mr-2" />}
            <span>{message.text}</span>
          </div>
        )}

        {!editMode ? (
          // Display mode: Show user details
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg shadow-inner">
              <User className="w-6 h-6 text-blue-600 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-lg font-medium text-gray-800">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-blue-50 rounded-lg shadow-inner">
              <Mail className="w-6 h-6 text-blue-600 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-medium text-gray-800">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-blue-50 rounded-lg shadow-inner">
              <CalendarDays className="w-6 h-6 text-blue-600 mr-4" />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-lg font-medium text-gray-800">
                  {/* Format the date nicely */}
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Button to switch to edit mode */}
            <button
              onClick={() => setEditMode(true)}
              style={{ backgroundColor: colors.blue600 }}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <Edit className="w-5 h-5 mr-2" />
              Edit Profile
            </button>
          </div>
        ) : (
          // Edit mode: Show form for updating details
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <div className="relative rounded-md"> {/* Added rounded-md here */}
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ borderColor: colors.green300, color: colors.black }}
                  className="mt-1 block w-full text-black pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative rounded-md"> {/* Added rounded-md here */}
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ borderColor: colors.green300, color: colors.black }}
                  className="mt-1 block w-full text-black pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              {/* Cancel button */}
              <button
                type="button"
                onClick={handleCancelEdit}
                style={{
                  borderColor: colors.gray900, // Equivalent to border-gray-900
                  color: colors.gray700,     // Equivalent to text-gray-700
                  backgroundColor: colors.white // Equivalent to bg-white
                }}
                className="inline-flex items-center px-5 py-2 border hover:bg-gray-50 shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <XCircle className="w-5 h-5 mr-2" />
                Cancel
              </button>
              {/* Save Changes button */}
              <button
                type="submit"
                disabled={loading} // Disable button while saving
                style={{
                  backgroundColor: colors.green600,
                  color: colors.white,
                  borderColor: 'transparent'
                }}
                className="inline-flex bg-green-600 text-white hover:bg-green-700 items-center px-5 py-2 border border-transparent  text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5 mr-2" /> // Show spinner when loading
                ) : (
                  <Save className="w-5 h-5 mr-2" />
                )}
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
