import { FolderPlus } from 'lucide-react';
import Searchbox from '../ui/searchbox';
import AddCollectionModal from './add-collection-modal';

interface CollectionsHeaderProps {}

const CollectionsHeader: React.FC<CollectionsHeaderProps> = () => {
  return (
    <div className="sticky top-0 z-[15] border border-border/60 dark:border-border/80 divide-border/60 dark:divide-border/80 ring-border dark:ring-border bg-background dark:bg-background">
      <div className="py-4 md:py-8 mx-auto max-w-screen-xl px-4 md:px-12 flex flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <FolderPlus size={30} />
          <h2 className="text-3xl">Collections</h2>
        </div>

        <div className="flex items-center justify-center max-w-md w-full">
          <Searchbox placeholder="Search your collections..." />
        </div>

        <AddCollectionModal />
      </div>
    </div>
  );
};

export default CollectionsHeader;
