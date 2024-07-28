'use client';

import { Pencil } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';
import FastAverageColor from 'fast-average-color';

declare global {
  var cloudinary: any;
}

const uploadPreset = 'gr2hwvgw';

interface ImageUploaderProps {
  handleMediaUpload: (value: string, color: string) => void;
  value: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  handleMediaUpload,
  value,
  ...props
}) => {
  const handleUpload = useCallback(
    async (result: any) => {
      const imageUrl = result.info.secure_url;

      // Create an image element
      const img = document.createElement('img');
      img.crossOrigin = 'Anonymous';
      img.src = imageUrl;

      img.onload = async () => {
        const fac = new FastAverageColor();
        const color = fac.getColor(img);
        handleMediaUpload(imageUrl, color.hex);
      };
    },
    [handleMediaUpload]
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
            className="relative flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-500 dark:border-neutral-600 rounded-xl aspect-square transition hover:opacity-70 whitespace-nowrap h-[200px] w-[200px]"
          >
            {value ? (
              <div>
                {value.includes('avatars.githubusercontent.com') ||
                value.includes('lh3.googleusercontent.com') ||
                value.includes('res.cloudinary.comm') ? (
                  <Image
                    className="relative object-cover"
                    src={value}
                    alt="recipe image"
                    height={200}
                    width={200}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={value}
                    alt="recipe image"
                    className="object-cover transition group-hover:scale-110 aspect-square rounded-lg"
                    height={200}
                    width={200}
                  />
                )}

                <div className="p-2 absolute bottom-[-12px] right-[-12px] border rounded-full dark:bg-secondary dark:text-white">
                  <Pencil height={20} width={20} />
                </div>
              </div>
            ) : (
              <>
                <div className="text-lg font-semibold">Click to upload</div>
                <TbPhotoPlus size={50} />
              </>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUploader;
