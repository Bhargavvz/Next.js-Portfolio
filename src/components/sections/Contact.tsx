'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ContactFormData, ContactFormState } from '@/types/contact';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { useToastContext } from '@/contexts/ToastContext';

const contactInfo = {
  email: 'adepuvaatsavasribhargav@gmail.com',
  phone: '+1 (123) 456-7890',
  linkedin: 'https://www.linkedin.com/in/bhargav-adepu',
  github: 'https://github.com/Bhargavvz'
};

const ContactItem = ({ icon: Icon, title, value, link }: any) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-start gap-4 p-4 rounded-lg bg-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-colors"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon className="w-6 h-6 text-purple-500 flex-shrink-0" />
    <div>
      <h3 className="font-medium text-white">{title}</h3>
      <p className="text-gray-400">{value}</p>
    </div>
  </motion.a>
);

export default function Contact() {
  const { showToast } = useToastContext();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [formState, setFormState] = useState<ContactFormState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    validationErrors: {}
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user starts typing
    if (formState.validationErrors[name]) {
      setFormState(prev => ({
        ...prev,
        validationErrors: {
          ...prev.validationErrors,
          [name]: ''
        }
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ 
      isLoading: true, 
      isSuccess: false, 
      isError: false,
      errorMessage: '',
      validationErrors: {}
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.errors) {
          const validationErrors = data.errors.reduce((acc: any, error: any) => {
            acc[error.field] = error.message;
            return acc;
          }, {});
          
          setFormState({
            isLoading: false,
            isSuccess: false,
            isError: true,
            errorMessage: 'Please fix the validation errors',
            validationErrors
          });
          showToast('Please fix the validation errors', 'error');
          return;
        }

        throw new Error(data.error || 'Failed to send message');
      }

      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      setFormState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        errorMessage: '',
        validationErrors: {}
      });

      showToast('Message sent successfully!', 'success');

    } catch (error: any) {
      console.error('Error sending message:', error);
      setFormState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage: error.message || 'Failed to send message',
        validationErrors: {}
      });
      showToast(error.message || 'Failed to send message', 'error');
    }
  };

  return (
    <section id="contact" className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <SectionHeading icon={<Mail className="h-8 w-8" />}>
          Get In Touch
        </SectionHeading>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <ContactItem
            icon={Mail}
            title="Email"
            value={contactInfo.email}
            link={`mailto:${contactInfo.email}`}
          />
          <ContactItem
            icon={Phone}
            title="Phone"
            value={contactInfo.phone}
            link={`tel:${contactInfo.phone}`}
          />
          <ContactItem
            icon={Linkedin}
            title="LinkedIn"
            value="Connect on LinkedIn"
            link={contactInfo.linkedin}
          />
          <ContactItem
            icon={Github}
            title="GitHub"
            value="View Projects"
            link={contactInfo.github}
          />
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6 p-8 rounded-2xl border border-purple-500/20 bg-black/40 backdrop-blur-sm"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md bg-black/40 border ${
                formState.validationErrors.name ? 'border-red-500' : 'border-purple-500/20'
              } px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500`}
              placeholder="Your name"
              disabled={formState.isLoading}
            />
            {formState.validationErrors.name && (
              <p className="mt-1 text-sm text-red-500">{formState.validationErrors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md bg-black/40 border ${
                formState.validationErrors.email ? 'border-red-500' : 'border-purple-500/20'
              } px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500`}
              placeholder="your.email@example.com"
              disabled={formState.isLoading}
            />
            {formState.validationErrors.email && (
              <p className="mt-1 text-sm text-red-500">{formState.validationErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-200">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`mt-1 block w-full rounded-md bg-black/40 border ${
                formState.validationErrors.message ? 'border-red-500' : 'border-purple-500/20'
              } px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500`}
              placeholder="Your message..."
              disabled={formState.isLoading}
            />
            {formState.validationErrors.message && (
              <p className="mt-1 text-sm text-red-500">{formState.validationErrors.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={formState.isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formState.isLoading ? (
                <>
                  <span className="animate-spin">⌛</span>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </div>

          {formState.isSuccess && (
            <p className="text-green-500 text-center">Message sent successfully!</p>
          )}
          
          {formState.isError && !Object.keys(formState.validationErrors).length && (
            <p className="text-red-500 text-center">{formState.errorMessage}</p>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
        </motion.div>
      </motion.div>
    </section>
  );
};
