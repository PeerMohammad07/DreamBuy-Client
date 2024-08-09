import { useState, useEffect } from 'react';
import { useDropzone, DropzoneProps } from 'react-dropzone';
import { BsFillImageFill } from 'react-icons/bs';

interface MyDropzoneProps {
  setPreview: (previews: string[]) => void;
}

export default function MyDropzone({ setPreview }: MyDropzoneProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const dropzoneOptions: DropzoneProps = {
    onDrop: (acceptedFiles) => {
      const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
      setPreview([...previews, ...newPreviews]);
    },
    accept: {
      'image/*': [],
      'video/*': []
    }
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  useEffect(() => {
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previews]);

  return (
    <div className="flex flex-col items-center">
      <div
        {...getRootProps({
          className: 'dropzone p-4 rounded cursor-pointer flex flex-col items-center border-gray-300'
        })}
      >
        <input {...getInputProps()} />
        <BsFillImageFill className="text-gray-600" size={24} />
      </div>
    </div>
  );
}
