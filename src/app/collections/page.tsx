import EmptyState from '@/components/ui/EmptyState';
import { getCurrentUser } from '../_actions/user-actions';
import { getCollections } from '../_actions/collection-actions';
import AddCollectionModal from '@/components/modals/AddCollectionModal';
import { CollectionWithRecipeNamesAndImage } from '@/types';
import CollectionsList from '@/components/collections/CollectionsList';

interface CollectionsPageProps {}

export default async function CollectionsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const {
    collections,
    totalCount,
  }: {
    collections: CollectionWithRecipeNamesAndImage[];
    totalCount: number;
  } = await getCollections();

  return (
    <div className="mt-16 flex flex-col justify-center gap-2 px-12">
      <div className="flex flex-row justify-end">
        <AddCollectionModal />
      </div>
      <CollectionsList
        initialCollections={collections}
        totalCount={totalCount}
      />
    </div>
  );
}
