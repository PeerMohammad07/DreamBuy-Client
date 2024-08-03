import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { useForm, Controller } from 'react-hook-form';

Modal.setAppElement('#root');

export interface AmenityFormData {
  id?: string;
  name: string;
}

interface AmenityModalProps {
  isOpen: boolean;
  onClose: (state: { state: boolean; role: string }) => void;
  status: string;
  submitHandler: (data: AmenityFormData) => void;
  initialData?: AmenityFormData; 
}

const AddAndEditAmenity: React.FC<AmenityModalProps> = ({
  isOpen,
  onClose,
  status,
  submitHandler,
  initialData = { name: '' }
}) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<AmenityFormData>({
    defaultValues: initialData
  });

  useEffect(() => {
    setValue('name', initialData.name);
  }, [initialData, setValue]);

  const onSubmit = (data: AmenityFormData) => {
    submitHandler(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose({ state: false, role: '' })}
      contentLabel="Form Modal"
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      overlayClassName="fixed "
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 relative">
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => onClose({ state: false, role: '' })}
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-xl font-bold text-center mb-6">
          {status === 'add' ? 'Add Amenity' : 'Edit Amenity'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Name is required',
                pattern: {
                  value: /^[^\s]+(?:\s+[^\s]+)*$/,
                  message: 'Name cannot be just spaces'
                }
              }}
              render={({ field }) => (
                <input
                  id="name"
                  {...field}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                />
              )}
            />
            {errors.name && <p className="mt-2 text-red-600 text-sm">{errors.name.message}</p>}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 bg-gray-500 text-white font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={() => onClose({ state: false, role: '' })}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {status === 'add' ? 'Add' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddAndEditAmenity;
