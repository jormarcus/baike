import { Recipe } from '@prisma/client';

interface FeedItemProps {
  recipe: Recipe;
}

const FeedItem: React.FC<FeedItemProps> = ({ recipe }) => {
  return <div>Feed Item</div>;
};

export default FeedItem;
