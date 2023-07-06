import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa';

// TODO: Add like and bookmark functionality
// change to filled icons if liked/bookmarked
const PostActions: React.FC = () => (
  <div className="flex flex-row justify-between items-center pl-1">
    <div className="flex flex-row justify-start items-center gap-4">
      <FaRegHeart
        size={20}
        className="hover:text-neutral-300  cursor-pointer transition duration-200"
      />
      <FaRegComment
        size={20}
        className="hover:text-neutral-300 cursor-pointer transition duration-200"
      />
    </div>
    <FaRegBookmark
      size={20}
      className="hover:text-neutral-300 cursor-pointer transition duration-200"
    />
  </div>
);

export default PostActions;
