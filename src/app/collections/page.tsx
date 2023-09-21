import EmptyState from '@/components/ui/EmptyState';
import { getCurrentUser } from '../_actions/user-actions';
import { getCollectionsWithCount } from '../_actions/collection-actions';
import { CollectionWithRecipeNamesAndImage } from '@/types';
import CollectionsList from '@/components/collections/CollectionsList';

interface CollectionsPageProps {
  searchParams: {
    search: string;
  };
}

export default async function CollectionsPage({
  searchParams,
}: CollectionsPageProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const query: string = searchParams.search || '';

  const {
    collections,
    totalCount,
  }: {
    collections: CollectionWithRecipeNamesAndImage[];
    totalCount: number;
  } = await getCollectionsWithCount(query);

  return (
    <>
      <CollectionsList
        initialCollections={collections}
        totalCount={totalCount}
      />
    </>
  );
}
