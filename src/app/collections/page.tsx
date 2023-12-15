import EmptyState from '@/components/ui/empty-state';
import { getCurrentUser } from '../_actions/user-actions';
import CollectionRecipes from './collection-recipes';
import { getFirstCollectionWithRecipes } from '../_actions/collection-actions';

interface CollectionsPageProps {}

export default async function CollectionsPage({}: CollectionsPageProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const collection = await getFirstCollectionWithRecipes();

  if (!collection) {
    return <EmptyState title="No collections" />;
  }

  return (
    <>
      <CollectionRecipes activeCollection={collection} />
    </>
  );
}
