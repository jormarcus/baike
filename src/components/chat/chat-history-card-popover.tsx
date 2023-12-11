'use client';

import DeleteModal from '../ui/delete-modal';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { MoreVertical, PencilIcon } from 'lucide-react';
import { SafeChat } from '@/types';

type ChatHistoryCardPopoverProps = {
  chat: SafeChat;
  handleClickEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete: (id: number) => void;
};

const ChatHistoryCardPopover: React.FC<ChatHistoryCardPopoverProps> = ({
  chat,
  handleClickEdit,
  handleDelete,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="px-2">
          <MoreVertical className="hover:text-neutral-300 transition duration-300" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" className="max-w-fit">
        <Button
          onClick={handleClickEdit}
          className="flex gap-2 px-0 pb-4 items-center hover:text-amber-500 transition duration-300"
        >
          <PencilIcon size={24} /> <span>Edit title</span>
        </Button>
        <DeleteModal
          deleteFieldName="chat"
          deleteFieldItemName={chat.title}
          deleteFieldId={chat.id}
          handleDelete={handleDelete}
        />
      </PopoverContent>
    </Popover>
  );
};

export default ChatHistoryCardPopover;
