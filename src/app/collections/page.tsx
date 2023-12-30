import EmptyState from '@/components/ui/empty-state';
import { getCurrentUser } from '../_actions/user-actions';
import CollectionRecipes from './collection-recipes';
import {
  getCollectionsWithCount,
  getFirstCollectionWithRecipes,
} from '../_actions/collection-actions';
import CollectionsSidebar from './collections-sidebar';

export default async function CollectionsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const collection = await getFirstCollectionWithRecipes();

  if (!collection) {
    return <EmptyState title="No collections" />;
  }

  const { collections, totalCount } = await getCollectionsWithCount();

  return (
    <div className="flex min-h-screen">
      <CollectionsSidebar
        initialCollections={collections}
        totalCount={totalCount}
      />
      <CollectionRecipes activeCollection={collection} />
    </div>
  );
}
