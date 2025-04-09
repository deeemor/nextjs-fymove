"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, CheckCircle, Activity, Facebook } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import ThemeToggle from "@/components/ThemeToggle";
import axios from 'axios';
import Image from 'next/image';
import { signIn } from 'next-auth/react';


type FormType = 'login' | 'signup' | 'forgot';
type UserRole = 'patient' | 'doctor';

interface FormState {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
  role?: UserRole;
}

interface FormError {
  field: string;
  message: string;
}

interface SuccessMessage {
  title: string;
  text: string;
}

export default function Auth() {
  const router = useRouter();
  const [activeForm, setActiveForm] = useState<FormType>('login');
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    role: 'patient'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<FormError[]>([]);
  const [rememberMe, setRememberMe] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState<SuccessMessage>({
    title: '',
    text: ''
  });

   // Add this useEffect hook here  sehr wichtig
   useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === 'doctor') {
        router.push('/doctor-dashboard'); // Redirect to doctor dashboard
      } else if (userData.role === 'patient') {
        router.push('/patient-dashboard'); // Redirect to patient dashboard
      }
    }
  }, [router]);

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setFormErrors(prev => prev.filter(error => error.field !== name));
  };

  const validateForm = (): boolean => {
    const errors: FormError[] = [];

    if (!formState.email.trim()) {
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }

    if (activeForm === 'forgot') {
      // No additional validation for forgot password
    } else if (!formState.password) {
      errors.push({ field: 'password', message: 'Password is required' });
    } else if (formState.password.length < 6) {
      errors.push({ field: 'password', message: 'Password must be at least 6 characters long' });
    }

    if (activeForm === 'signup') {
      if (!formState.name?.trim()) {
        errors.push({ field: 'name', message: 'Name is required' });
      } else if (formState.name.trim().length < 2) {
        errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
      }

      if (formState.password !== formState.confirmPassword) {
        errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
      }

      if (!formState.role) {
        errors.push({ field: 'role', message: 'Please select a role' });
      }
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const getFieldError = (fieldName: string): string => {
    const error = formErrors.find(err => err.field === fieldName);
    return error ? error.message : '';
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login will come soon`, { autoClose: 2000 });
  };


  


//sehrrrrrrrrrrrrrrrrrrrrrrrrrrrrr wichtig
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsLoading(true);

  try {
    if (activeForm === 'login') {
      // Handle login
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formState.email,
        password: formState.password,
      });

      // Save the token and user data in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));

      // Display success message for login
      setSuccessMessage({
        title: 'Welcome Back!',
        text: `Welcome back, ${response.data.name}! Redirecting to dashboard...`,
      });
      setShowSuccess(true);

      // Redirect based on role
      setTimeout(() => {
        router.push(response.data.role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
      }, 1500); // Redirect after 1.5 seconds
    } else if (activeForm === 'signup') {
      // Handle signup
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        email: formState.email,
        password: formState.password,
        name: formState.name,
        role: formState.role,
      });

      // Save the token and user data in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));

      // Display success message for account creation
      setSuccessMessage({
        title: 'Account Created',
        text: `Your ${formState.role} account has been successfully created. Redirecting to dashboard...`,
      });
      setShowSuccess(true);

      // Redirect based on role
      setTimeout(() => {
        router.push(formState.role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
      }, 1500); // Redirect after 1.5 seconds
    } else if (activeForm === 'forgot') {
      // Handle forgot password
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', {
        email: formState.email,
      });
      toast.success(response.data.message || 'Password reset link sent to your email');
      setActiveForm('login');
    }
  } catch (error: any) {
    console.error('Error:', error);
    toast.error(error.response?.data?.message || error.message || 'An error occurred');
    if (error.message.includes('already exists')) {
      setFormErrors([{ field: 'email', message: 'This email is already registered' }]);
    }
  } finally {
    setIsLoading(false);
  }
};

  const renderRoleSelection = () => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Select Role
      </label>
      <select
        name="role"
        value={formState.role}
        onChange={handleInputChange}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
      >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>
      {getFieldError('role') && (
        <p className="mt-1 text-sm text-red-500">{getFieldError('role')}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center"
            >
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {successMessage.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {successMessage.text}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeForm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center text-blue-500 mb-4">
                  <Activity className="w-8 h-8" />
                  <h2 className="text-2xl font-bold block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-2">FyMove</h2>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {activeForm === 'login' && 'Welcome Back'}
                  {activeForm === 'signup' && 'Create Account'}
                  {activeForm === 'forgot' && 'Reset Password'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {activeForm === 'login' && 'Please sign in to your account'}
                  {activeForm === 'signup' && 'Please fill in your information'}
                  {activeForm === 'forgot' && 'Enter your email to reset your password'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {activeForm === 'signup' && (
                  <div className="relative">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                        getFieldError('name') ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Full name"
                    />
                    {getFieldError('name') && (
                      <p className="mt-1 text-sm text-red-500">{getFieldError('name')}</p>
                    )}
                  </div>
                )}

                <div className="relative">
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                      getFieldError('email') ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Email address"
                  />
                  {getFieldError('email') && (
                    <p className="mt-1 text-sm text-red-500">{getFieldError('email')}</p>
                  )}
                </div>

                {activeForm !== 'forgot' && (
                  <div className="relative">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                        getFieldError('password') ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Password"
                    />
                    {getFieldError('password') && (
                      <p className="mt-1 text-sm text-red-500">{getFieldError('password')}</p>
                    )}
                  </div>
                )}

                {activeForm === 'signup' && (
                  <>
                    <div className="relative">
                      <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formState.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                          getFieldError('confirmPassword') ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="Confirm password"
                      />
                      {getFieldError('confirmPassword') && (
                        <p className="mt-1 text-sm text-red-500">{getFieldError('confirmPassword')}</p>
                      )}
                    </div>

                    {renderRoleSelection()}
                  </>
                )}

                {activeForm === 'login' && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="mr-2 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveForm('forgot')}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <Activity className="animate-spin h-5 w-5" />
                  ) : (
                    activeForm === 'login' ? 'Sign in' :
                    activeForm === 'signup' ? 'Sign up' :
                    'Reset Password'
                  )}
                </button>

                {(activeForm === 'login' || activeForm === 'signup') && (
                  <>
                    <div className="relative flex items-center justify-center my-4">
                      <div className="absolute border-t border-gray-300 dark:border-gray-600 w-full"></div>
                      <span className="relative bg-white dark:bg-gray-800 px-4 text-sm text-gray-500 dark:text-gray-400">
                        Or continue with
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                    <button
  type="button"
  onClick={() => handleSocialLogin("google")}
  className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-200"
>
  <Image
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google"
    width={20}
    height={20}
    className="mr-2"
  />
  Google
</button>

<button
  type="button"
  onClick={() => handleSocialLogin("facebook")}
  className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-200"
>
  <Image
    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
    alt="Facebook"
    width={20}
    height={20}
    className="mr-2"
  />
  Facebook
</button>

                    </div>
                  </>
                )}
              </form>

              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => setActiveForm(activeForm === 'login' ? 'signup' : 'login')}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {activeForm === 'login'
                    ? "Don't have an account? Sign up"
                    : activeForm === 'signup'
                    ? 'Already have an account? Sign in'
                    : 'Back to sign in'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}