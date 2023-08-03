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
  return (
    <div className="relative col-span-1 w-full overflow-hidden rounded-xl">
      {image ? (
        <Image
          height={height}
          width={width}
          src={image}
          alt={alt}
          decoding="async"
          className="object-cover transition group-hover:scale-110 aspect-square"
        />
      ) : (
        <div className="dark:bg-neutral-950 flex items-center justify-center h-full w-full rounded-xl aspect-square">
          <Croissant className="text-white" height={80} width={80} />
        </div>
      )}
    </div>
  );
};

export default RecipeImage;
