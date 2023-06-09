'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MdOutlineBakeryDining } from 'react-icons/md';

import { SafeRecipe } from '@/types';
import { Avatar, AvatarImage } from '@/components/ui/Avatar';
import PostDescription from './PostDescription';
import PostActions from './PostActions';
import PostComments from './PostComments';

interface PostProps {
  recipe: SafeRecipe;
}

const PostHeader: React.FC<{
  username: string;
  avatar: string | null;
}> = ({ username, avatar }) => (
  <div className="flex flex-row items-center justify-start gap-3 pb-6 pt-6 mb-1 pl-1 h-8">
    <Link href={`/${username}`}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar || '/images/placeholder.jpg'} alt={username} />
      </Avatar>
    </Link>
    <Link
      href={`/${username}`}
      className="text-md font-semibold cursor-pointer"
    >
      {username}
    </Link>
  </div>
);

const PostContent: React.FC<{
  image: string | null;
  title: string;
}> = ({ image, title }) => (
  <div className="aspect-square overflow-hidden rounded-xl h-[460px]">
    {image ? (
      <Image
        fill
        src={image}
        alt={title}
        width={468}
        height={468}
        decoding="async"
        className="h-full w-full object-cover transition group-hover:scale-110"
      />
    ) : (
      <div className="flex items-center justify-center p-12 border border-neutral-500 rounded-xl">
        <MdOutlineBakeryDining size={350} />
      </div>
    )}
  </div>
);

const PostFooter: React.FC<{
  id: string;
  title: string;
  likesCount: number;
  description?: string;
}> = ({ id, title, likesCount, description = '' }) => (
  <div className="flex flex-col h-40 my-1 space-y-2">
    <PostActions />

    {likesCount > 0 && (
      <div className="text-md font-semibold">{`${likesCount} likes`}</div>
    )}

    <div>
      <Link
        href={`/recipe/${id}`}
        className="pr-2 font-bold dark:hover:text-neutral-300 whitespace-nowrap"
      >
        {title}
      </Link>
      <PostDescription description={description} />
      <PostComments commentsCount={12} postId={id} />
    </div>
  </div>
);

const Post: React.FC<PostProps> = ({ recipe }) => {
  const { id, title, image, likesCount } = recipe;
  return (
    <div className="flex flex-col justify-center items-center py-4 group col-span-1 dark:bg-neutral-950 rounded-lg max-w-[630px] w-full h-[700px] overflow-hidden shadow-lg shadow-neutral-950/50">
      <article className="flex flex-col w-[470px] pb-4">
        <PostHeader username="username" avatar={null} />
        <PostContent image={image} title={title} />
        <PostFooter id={id} title={title} likesCount={likesCount} />
      </article>
    </div>
  );
};

export default Post;
