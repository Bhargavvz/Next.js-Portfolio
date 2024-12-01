"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${contactInfo.email}?subject=Message from ${formData.name}&body=${formData.message}`;
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
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm text-gray-400">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-purple-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-purple-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm text-gray-400">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-purple-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="group w-full px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-white font-semibold flex items-center justify-center gap-2"
          >
            Send Message
            <Send className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-300">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
