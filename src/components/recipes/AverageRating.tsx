import { Star } from 'lucide-react';

interface AverageRatingProps {
  averageRating: number;
}

const AverageRating: React.FC<AverageRatingProps> = ({ averageRating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((star, index) => (
        <Star
          key={index}
          className={`text-amber-500 ${
            index < averageRating ? 'fill-amber-500' : ''
          }`}
        />
      ))}
    </div>
  );
};

export default AverageRating;
