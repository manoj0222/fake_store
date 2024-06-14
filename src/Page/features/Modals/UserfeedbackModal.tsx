import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";


export default function UserfeedbackModal({ open,setOpen,setText }) {
  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className="relative transform overflow-hidden 
              rounded-lg bg-white text-left shadow-xl 
              transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div className="bg-white px-2 pb-4 pt-5 sm:p-3">
                  <div className="sm:flex sm:items-start w-full flex-col">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <DialogTitle
                        as="h2"
                        className="text-base font-semibold leading-6 text-gray-900 "
                      >
                        Feedback
                      </DialogTitle>
                    </div>
                    <div className="mt-1 w-full">
                      <textarea className="text-sm text-black-500 w-full
                       py-4
                       px-2
                      outline-none border-2 rounded-2l"
                      onChange={(e)=>{setText(e.target.value)}}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    data-autofocus
                  >
                    Submit
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}