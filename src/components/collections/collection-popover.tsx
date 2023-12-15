'use client';

import DeleteModal from '../ui/delete-modal';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { MoreVertical, Plus } from 'lucide-react';
import { SafeCollection } from '@/types';
import { cn } from '@/lib/utils';
import { useCollections } from '@/context/collections-context';

interface CollectionPopoverProps {
  collection: SafeCollection;

  isActive: boolean; // to determine btn hover color
}

const CollectionPopover: React.FC<CollectionPopoverProps> = ({
  collection,
  isActive,
}) => {
  const { handleDelete } = useCollections();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn('px-2', isActive ? 'hover:bg-primary' : '')}
        >
          <MoreVertical className="transition duration-300 hover:text-neutral-300" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" align="center" className="max-w-fit">
        <Button
          // onClick={addRecipeToCollection}
          className="flex items-center gap-2 px-0 pb-4 transition duration-300 hover:text-amber-500"
        >
          <Plus size={24} /> <span>Add recipe</span>
        </Button>
        <DeleteModal
          deleteFieldName="collection"
          deleteFieldItemName={collection.name}
          deleteFieldId={collection.id}
          handleDelete={handleDelete}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CollectionPopover;
