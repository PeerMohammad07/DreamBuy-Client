import React from "react";

const KycVerification = () => {
  const handleSubmit = () => {};

  const handleImage = () => {};

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg md:max-w-3xl">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">
              Verification
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Thank you for choosing to host with us
            </p>
            <p className="text-lg text-gray-600 mb-6">
              We kindly request your cooperation in completing the verification
              process by following these steps:
            </p>
          </div>
          <ul className="text-left list-disc list-inside text-gray-700 space-y-3 mb-8 px-8 md:px-16">
            <li>
              Upload a clear image of your government-issued ID or passport.
            </li>
            <li>
              Ensure that the image is high-quality and all details are clearly
              visible.
            </li>
          </ul>
          <div className="text-gray-600 mb-8 text-center font-medium">
            Our team will review the uploaded document for verification
            purposes. This is a standard procedure to ensure the safety and
            security of our platform.
          </div>
          <div className="flex justify-center">
            <div className="space-y-4">
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-4"
              >
                <input
                  type="file"
                  className="file-input w-full max-w-xs text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleImage}
                />
            <div className="mt-4 text-center">
              <button
                type="submit"
                className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition duration-300"
              >
                Upload
              </button>
              <div className="text-gray-500 mt-2">😊 Waiting to upload...</div>
            </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycVerification;
