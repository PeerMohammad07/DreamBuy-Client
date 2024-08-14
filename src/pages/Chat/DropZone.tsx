import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsFillImageFill } from 'react-icons/bs';

interface MyDropzoneProps {
  setPreview: React.Dispatch<React.SetStateAction<string[]>>;
  setFile: React.Dispatch<React.SetStateAction<File[]>>;
}

const MyDropzone: React.FC<MyDropzoneProps> = ({ setPreview, setFile }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const previews: string[] = [];

    setFile(prevFiles => [...prevFiles, ...acceptedFiles]);
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onloadend = () => {
        previews.push(reader.result as string);
        setPreview(prev => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    });

  }, [setPreview, setFile]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'image/*': [],
      'video/*': []
    },
  });

  return (
    <>
    <div className="flex flex-col items-center">
    <div
      {...getRootProps({
        className: 'dropzone p-4 rounded cursor-pointer flex flex-col items-center border-gray-300'
      })}
    >
      <input {...getInputProps()} onChange={()=> {}}/>
      <BsFillImageFill className="text-gray-600" size={24} />
    </div>
  </div></>
  );
};

export default MyDropzone;
