import EmptyState from '@/components/ui/EmptyState';
import { getCurrentUser } from '../_actions/user-actions';
import { getCollectionsWithRecipesByUserId } from '../_actions/collection-actions';
import CollectionCard from '@/components/collections/CollectionCard';
import { Button } from '@/components/ui/Button';
import AddCollectionModal from '@/components/modals/AddCollectionModal';

interface CollectionsPageProps {}

export default async function CollectionsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const collections = await getCollectionsWithRecipesByUserId(currentUser.id);

  return (
    <div className="mt-16 flex flex-col justify-center gap-2 px-12">
      <div className="flex flex-row justify-end">
        <AddCollectionModal />
      </div>
      <div className="mt-1">
        {collections && collections.length > 0 ? (
          collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))
        ) : (
          <div className="flex flex-col items-center">
            <EmptyState title="No collections available" />
          </div>
        )}
      </div>
    </div>
  );
}
