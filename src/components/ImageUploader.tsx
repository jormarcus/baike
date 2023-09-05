'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

const uploadPreset = 'gr2hwvgw';

interface ImageUploaderProps {
  handleChange: (value: string) => void;
  value: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  handleChange,
  value,
  ...props
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      handleChange(result.info.secure_url);
    },
    [handleChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
      {...props}
    >
      {({ open }: any) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-500 dark:border-neutral-600 rounded-xl p-3 aspect-square transition hover:opacity-70 whitespace-nowrap
          "
          >
            <TbPhotoPlus size={50} />
            <div className="text-lg font-semibold">Click to upload</div>
            {value && (
              <div
                className="
              absolute inset-0 h-full w-full"
              >
                <Image
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                  alt="recipe image"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUploader;
