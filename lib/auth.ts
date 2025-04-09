import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  role: string; // 'doctor' or 'patient'
  token: string;
  message: string;
}


export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData extends LoginData {
  name: string;
}

export interface ValidationError {
  email?: string;
  password?: string;
  name?: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateSignupData = (data: SignupData): ValidationError | null => {
  const errors: ValidationError = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validatePassword(data.password)) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

export const validateLoginData = (data: LoginData): ValidationError | null => {
  const errors: ValidationError = {};

  if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const validationErrors = validateLoginData(data);
  if (validationErrors) {
    throw new Error(Object.values(validationErrors)[0]);
  }

  try {
    const response = await axios.post(`${API_URL}/login`, data);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));

    }
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('An error occurred during login');
  }
};

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  const validationErrors = validateSignupData(data);
  if (validationErrors) {
    throw new Error(Object.values(validationErrors)[0]);
  }

  try {
    const response = await axios.post(`${API_URL}/signup`, data);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('An error occurred during signup');
  }
};

export const logout = (): void => {
  localStorage.removeItem('user');

};

export const getCurrentUser = (): AuthResponse | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

