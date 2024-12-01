'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BlogPostType } from '@/app/blog/page';
import Image from 'next/image';

interface AddPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Omit<BlogPostType, 'id' | 'createdAt'>) => void;
}

export default function AddPostModal({ isOpen, onClose, onSubmit }: AddPostModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, imageUrl });
    setTitle('');
    setDescription('');
    setImageUrl('');
    setPreviewUrl('');
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl 
                                   bg-gray-900 border border-white/10 p-6 text-left align-middle 
                                   shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-white mb-4"
                >
                  Add New Blog Post
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                               text-white placeholder-gray-400 focus:outline-none 
                               focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter post title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                               text-white placeholder-gray-400 focus:outline-none 
                               focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter post description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                               text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg 
                               file:border-0 file:bg-purple-500 file:text-white 
                               hover:file:bg-purple-600"
                    />
                    {previewUrl && (
                      <div className="mt-2 relative w-full h-48">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-400 
                               hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white 
                               bg-gradient-to-r from-purple-500 to-cyan-500 
                               rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Create Post
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
