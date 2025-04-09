import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  datetime: string;
  department: string;
  doctor: string;
  message: string;
  symptoms: string[];
  preferredTime: string;
}

export interface SubFormData {
  email: string;
}

export const sendContactForm = async (data: ContactFormData): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/api/contact`, data);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to send message');
    }
  } catch (error: any) {
    console.error('Contact form error:', error);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to send message'
    );
  }
};

export const sendAppointmentForm = async (data: AppointmentFormData): Promise<void> => {
  try {
    if (!data.name || !data.email || !data.phone || !data.datetime || !data.department || !data.doctor) {
      throw new Error('Please fill all required fields');
    }

    const response = await axios.post(`${API_URL}/api/appointment`, data);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to book appointment');
    }
  } catch (error: any) {
    console.error('Appointment form error:', error);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to book appointment'
    );
  }
};

export const sendSubForm = async (data: SubFormData): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/api/sub`, data);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to subscribe');
    }
  } catch (error: any) {
    console.error('Subscription error:', error);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to subscribe'
    );
  }
};