'use client';

import DeleteModal from '../ui/delete-modal';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { MoreVertical, Plus } from 'lucide-react';
import { CollectionWithRecipeNamesAndImage } from '@/types';
import { cn } from '@/lib/utils';

interface CollectionPopoverProps {
  collection: CollectionWithRecipeNamesAndImage;
  handleDelete: (id: number) => void;
  isActive: boolean;
}

const CollectionPopover: React.FC<CollectionPopoverProps> = ({
  collection,
  handleDelete,
  isActive,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn('px-2', isActive ? 'hover:bg-primary' : '')}
        >
          <MoreVertical className="hover:text-neutral-300 transition duration-300" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" align="center" className="max-w-fit">
        <Button
          // onClick={addRecipeToCollection}
          className="flex gap-2 px-0 pb-4 items-center hover:text-amber-500 transition duration-300"
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
