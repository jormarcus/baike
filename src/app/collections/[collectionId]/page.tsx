import { getCollectionWithRecipesById } from '@/app/_actions/collection-actions';
import EmptyState from '@/components/ui/empty-state';
import { SafeCollection } from '@/types';
import CollectionRecipes from '../collection-recipes';

interface CollectionPageProps {
  params: {
    collectionId: string;
  };
}

export default async function CollectionPage({
  params: { collectionId },
}: CollectionPageProps) {
  const collection: SafeCollection | null = await getCollectionWithRecipesById(
    Number(collectionId)
  );

  if (!collection) {
    return <EmptyState title="Recipe not found" />;
  }

  return <CollectionRecipes activeCollection={collection} />;
}
