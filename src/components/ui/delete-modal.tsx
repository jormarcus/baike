import { MoreVertical, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogFooter,
} from './alert-dialog';

interface DeleteModalProps {
  deleteFieldName: string;
  deleteFieldItemName: string;
  deleteFieldId: number;
  handleDelete: (id: number) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  deleteFieldName,
  deleteFieldItemName,
  deleteFieldId,
  handleDelete,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger name="delete">
        <span className="flex gap-2 text-sm items-center hover:text-amber-500 transition duration-300">
          <Trash2 /> <span>{`Delete ${deleteFieldName}`}</span>
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {`Are you sure you want to delete ${deleteFieldName} - ${deleteFieldItemName}?`}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(deleteFieldId)}
            className="bg-rose-500 hover:bg-rose-600 text-white"
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
