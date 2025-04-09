'use client';

import React from 'react';
import {
  Settings,
  User,
  Bell,
  Lock,
  CreditCard,
  Globe,
  HelpCircle,
  Shield
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

interface DoctorProfile{
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
  bio?: string;
  
}







export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading]= useState(true);
  const [isSaving , setIsSaving]= useState(false);
  const [profile , setProfile] =useState<DoctorProfile | null>(null);
  const [formData , setFormData] =useState({
    name: '',
    email: '',
    bio: '',
    profilePicture:  ''
  })


  useEffect(() => {
    fetchProfile();
  }, []);

const fetchProfile = async () => {
  try{
    const token = localStorage.getItem('token');
    if(!token){
      router.push('/login');
      return;
    }

    const response = await fetch('http://localhost:5000/api/auth/profile',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if(!response.ok){
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfile(data);
      setFormData({
        name: data.name || '',
        email: data.email || '',
        profilePicture: data.profilePicture || '',
        bio: data.bio || ''
      });
   }catch(error){
    console.error(error);
    toast.error('Failed to load profile')
   }
   finally{
    setIsLoading(false);
   }
}

const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
  const {name , value} = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};






  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <nav className="space-y-1 p-4">
              {[
                { icon: User, label: 'Profile', active: true },
                { icon: Bell, label: 'Notifications' },
                { icon: Lock, label: 'Password & Security' },
                { icon: CreditCard, label: 'Billing' },
                { icon: Globe, label: 'Language' },
                { icon: Shield, label: 'Privacy' },
                { icon: HelpCircle, label: 'Help & Support' }
              ].map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="max-w-2xl">
                {/* Profile Photo */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Profile Photo
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                      JD
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Change Photo
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialty
                    </label>
                    <input
                      type="text"
                      defaultValue="Cardiologist"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      defaultValue="Experienced cardiologist with over 10 years of practice..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:opacity-90">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}