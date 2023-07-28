'use client';

import { Rating } from '@prisma/client';
import { Star } from 'lucide-react';
import { useState } from 'react';

import { upsertRating } from '@/app/_actions/rating-actions';

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
    <div className="flex items-center sm:items-start justify-center sm:justify-start">
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
