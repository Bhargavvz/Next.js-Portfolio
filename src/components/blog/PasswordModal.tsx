'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
}

export default function PasswordModal({ isOpen, onClose, onSubmit }: PasswordModalProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
    setPassword('');
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl 
                                   bg-gray-900 border border-white/10 p-6 text-left align-middle 
                                   shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white mb-4"
                >
                  Enter Password
                </Dialog.Title>

                <form onSubmit={handleSubmit}>
                  <input
                    type="password"
                    maxLength={6}
                    placeholder="Enter 6-digit password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white 
                             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />

                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white 
                               transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={password.length !== 6}
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r 
                               from-purple-500 to-cyan-500 rounded-lg disabled:opacity-50
                               hover:opacity-90 transition-opacity"
                    >
                      Submit
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
