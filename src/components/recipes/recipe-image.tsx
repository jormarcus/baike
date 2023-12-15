import { Croissant } from 'lucide-react';
import Image from 'next/image';

interface RecipeImageProps {
  image: string | null;
  alt: string;
  height: number;
  width: number;
}

const RecipeImage: React.FC<RecipeImageProps> = ({
  image,
  alt,
  height,
  width,
}) => {
  if (!image) {
    return (
      <div className="bg-neutral-900 dark:bg-neutral-900 flex items-center justify-center h-full w-full rounded-lg aspect-square">
        <Croissant
          className="text-white"
          height={height / 3}
          width={width / 3}
        />
      </div>
    );
  }
  return (
    <div className="">
      {image.includes('avatars.githubusercontent.com') ||
      image.includes('lh3.googleusercontent.com') ||
      image.includes('res.cloudinary.comm') ? (
        <Image
          src={image}
          alt={alt}
          decoding="async"
          className="object-cover transition group-hover:scale-110 aspect-square rounded-lg"
          priority
          height={height}
          width={width}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={alt}
          className="object-cover transition group-hover:scale-110 aspect-square rounded-lg"
          height={height}
          width={width}
        />
      )}
    </div>
  );
};

export default RecipeImage;
