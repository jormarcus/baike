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
    <div className="relative aspect-square w-full overflow-hidden rounded-xl">
      {image ? (
        <Image
          height={height}
          width={width}
          src={image}
          alt={alt}
          decoding="async"
          className="h-full w-full object-cover transition group-hover:scale-110"
        />
      ) : (
        <div className="dark:bg-neutral-950 p-2 flex items-center justify-center h-full w-full border border-neutral-500 rounded-xl">
          <Croissant height={50} width={50} />
        </div>
      )}
    </div>
  );
};

export default RecipeImage;
