import { Croissant } from 'lucide-react';
import Image from 'next/image';

interface RecipeImageProps {
  image?: string;
  alt: string;
}

const RecipeImage: React.FC<RecipeImageProps> = ({ image, alt }) => {
  if (!image) {
    return (
      <div className="bg-neutral-900 dark:bg-neutral-900 flex items-center justify-center object-cover transition group-hover:scale-110 aspect-square rounded-lg h-auto max-w-full">
        <Croissant className="text-white p-4 h-auto max-w-full" />
      </div>
    );
  }
  return (
    <>
      {image.includes('avatars.githubusercontent.com') ||
      image.includes('lh3.googleusercontent.com') ||
      image.includes('res.cloudinary.comm') ? (
        <Image
          src={image}
          alt={alt}
          decoding="async"
          className="object-cover transition"
          priority
          fill
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={alt}
          className="object-cover transition group-hover:scale-110 aspect-square rounded-lg"
        />
      )}
    </>
  );
};

export default RecipeImage;
