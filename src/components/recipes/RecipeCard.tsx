import Image from 'next/image';
import { FaHeart, FaMitten } from 'react-icons/fa';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { SafeRecipe } from '@/types';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: SafeRecipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { id, title, image } = recipe;
  return (
    <Link href={`/recipe/${id}`}>
      <Card>
        <CardHeader className="items-end">
          <FaHeart size={24} className="border:" />
        </CardHeader>
        <CardContent className="items-center">
          {image ? (
            <Image
              src={image}
              alt={title}
              width={300}
              height={300}
              decoding="async"
            />
          ) : (
            <FaMitten size={50} />
          )}
        </CardContent>
        <CardFooter className="text-center">
          <CardTitle>{title}</CardTitle>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
