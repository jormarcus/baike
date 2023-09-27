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
      <div className="dark:bg-neutral-950 flex items-center justify-center h-full w-full rounded-xl aspect-square">
        <Croissant className="text-white" height={80} width={80} />
      </div>
    );
  }
  return (
    <div className="relative col-span-1 w-full overflow-hidden rounded-xl">
      {image.includes('avatars.githubusercontent.com') ||
      image.includes('lh3.googleusercontent.com') ||
      image.includes('res.cloudinary.comm') ? (
        <Image
          height={height}
          width={width}
          src={image}
          alt={alt}
          decoding="async"
          className="object-cover transition group-hover:scale-110 aspect-square"
          priority
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={alt}
          className="object-cover transition group-hover:scale-110 aspect-square"
        />
      )}
    </div>
  );
};

export default RecipeImage;
