import { useMemo, useState } from 'react';

import { Input } from '../inputs/Input';
import { Button } from '../ui/Button';
import { addComment } from '@/app/_actions/post-actions';
import { Icons } from '../Icons';
import toast from 'react-hot-toast';

const PostComments: React.FC<{ postId: number; commentsCount: number }> = ({
  postId,
  commentsCount,
}) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEmpty = useMemo(() => input.length === 0, [input]);

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addComment(e.target.value, postId);
      setInput('');
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2">
      {commentsCount === 0 ? null : (
        <div className="text-sm text-neutral-400 hover:text-neutral-300 cursor-pointer">{`View all ${commentsCount} comments`}</div>
      )}
      <div>
        <form className="relative flex flex-row" onSubmit={handleSubmit}>
          <Input
            id="add-comment"
            className="w-full max-w-[470px] mt-1 border-none p-0 focus:ring-0 focus-visible:ring-0 text-neutral-400"
            value={input}
            placeholder="Add a comment..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <Button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className={`absolute bottom-0 right-0 text-neutral-500 bg-transparent hover:bg-transparent m-2 h-8 px-2
          ${
            isEmpty
              ? 'cursor-default'
              : 'bg-amber-500 text-neutral-200 hover:bg-amber-500'
          }
          `}
          >
            <Icons.arrowRightCircle className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostComments;
