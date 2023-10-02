import { Flag, MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ReportUserButtonProps {
  content: string;
}

const ReportUserButton: React.FC<ReportUserButtonProps> = ({ content }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex flex-nowrap items-center gap-4 cursor-pointer">
          <Flag />
          {content}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReportUserButton;
