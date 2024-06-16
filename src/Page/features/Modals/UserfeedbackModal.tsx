import React from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";

interface UserFeedbackModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setText: (value:string) => void;
}

const UserFeedbackModal: React.FC<UserFeedbackModalProps> = ({ open, setOpen, setText }) => {
  return (
    <Transition show={open}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={setOpen}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Panel className="fixed inset-0">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="flex items-center justify-center min-h-full">
                <DialogPanel className="relative w-full max-w-lg p-4 bg-white rounded-lg shadow-xl">
                  <div className="mb-4">
                    <DialogTitle as="h2" className="text-lg font-semibold text-gray-900">
                      Feedback
                    </DialogTitle>
                  </div>
                  <div>
                    <textarea
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none"
                      placeholder="Enter your feedback..."
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      onClick={() => setOpen(false)}
                    >
                      Submit
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </Transition.Child>
          </Dialog.Panel>
        </Transition.Child>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default UserFeedbackModal;
