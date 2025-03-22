import React from "react";

const ErrorAlert = ({ title, message, onClose }) => {
  return (
    <div
      id="custom-alert"
      className="fixed inset-0 flex items-center justify-center z-50 p-6">
      {/* Overlay */}
      <div
        className="fixed z-40 inset-0 bg-gray-500 dark:bg-gray-900 opacity-80"
        onClick={onClose}
        aria-hidden="true"></div>

      {/* Trick to center modal */}
      <span
        className="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"></span>

      {/* Error Dialog */}
      <div
        id="modal-content"
        className="relative z-50 inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-visible shadow-xl my-8 w-full max-w-sm sm:max-w-md">
        {/* Close button */}
        <div className="absolute top-0 right-0 pt-4 pr-4">
          <button
            type="button"
            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onClose}>
            <span className="sr-only">Close</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-4 pt-5 pb-4 sm:p-6 rounded-md">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2a10 10 0 110 20 10 10 0 010-20zm-4 8l8 8m0-8l-8 8"
              />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3
              id="alert-title"
              className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <div className="mt-2">
              <p id="alert-message" className="text-sm text-gray-500">
                {message}
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 sm:flex sm:space-x-6">
            <button
              onClick={onClose}
              className="button w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
