import EmptyState from '@/components/ui/empty-state';
import { getCurrentUser } from '../_actions/user-actions';
import { getCollectionsWithCount } from '../_actions/collection-actions';
import { CollectionWithRecipeNamesAndImage } from '@/types';
import Collections from '@/components/collections/collections';

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
      <Collections initialCollections={collections} totalCount={totalCount} />
    </>
  );
}
