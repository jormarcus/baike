'use client';

import { upsertRating } from '@/app/_actions/rating-actions';
import { Rating } from '@prisma/client';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface RatingProps {
  userRating: Rating | null;
  recipeId: number;
}

const Rating: React.FC<RatingProps> = ({ userRating, recipeId }) => {
  const [rating, setRating] = useState(userRating?.rating || 0);
  const [hover, setHover] = useState(0);

  const handleSetRating = (rating: number) => {
    setRating(rating);
    upsertRating(rating, recipeId, userRating?.id);
  };

  return (
    <div className="flex col-span-1">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <Star
            key={index}
            className={`cursor-pointer ${
              index <= (hover || rating) ? 'fill-amber-500 text-amber-500' : ''
            }`}
            onClick={() => handleSetRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          />
        );
      })}
    </div>
  );
};

export default Rating;
