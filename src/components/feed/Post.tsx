'use client';

import Link from 'next/link';
import Image from 'next/image';

import { SafeRecipe } from '@/types';
import { MdOutlineBakeryDining } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';

interface PostProps {
  recipe: SafeRecipe;
}

const PostHeader: React.FC<{
  username: string;
  avatar: string | null;
}> = ({ username, avatar }) => (
  <div className="flex flex-row items-center justify-start gap-3 pb-3 pl-1 h-8">
    {avatar ? (
      <Image
        src={avatar}
        alt={username}
        width={32}
        height={32}
        decoding="async"
        className="rounded-full"
      />
    ) : (
      <div className="flex items-center justify-center rounded-full w-8 h-8 bg-neutral-500" />
    )}
    <div className="text-md font-semibold">{username}</div>
  </div>
);

const PostContent: React.FC<{
  image: string | null;
  title: string;
}> = ({ image, title }) => (
  <div className="relative aspect-square overflow-hidden rounded-xl h-[470px]">
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
      <div className="flex items-center justify-center p-12 border border-neutral-500">
        <MdOutlineBakeryDining size={468} />
      </div>
    )}
  </div>
);

const PostFooter: React.FC<{
  id: string;
  title: string;
  likesCount: number;
}> = ({ id, title, likesCount }) => (
  <div className="flex flex-col h-40">
    <div className="flex flex-row justify-between items-center gap-3">
      <Link href={`/recipe/${id}`}>
        <div className="text-md font-semibold truncate">{title}</div>
      </Link>
      <div className="flex flex-row gap-2 items-center">
        <FaHeart
          size={20}
          className="hover:fill-red-500 transition duration-200"
        />
        <div className="text-md font-semibold">{likesCount}</div>
      </div>
    </div>
  </div>
);

const Post: React.FC<PostProps> = ({ recipe }) => {
  const { id, title, image, likesCount } = recipe;
  return (
    <div className="flex flex-col justify-center items-center group col-span-1 dark:bg-neutral-950 rounded-lg max-w-[630px] w-full h-[700px] overflow-y-scroll shadow-lg shadow-neutral-950/50">
      <article className="flex flex-col w-[470px] pb-4">
        <PostHeader username="username" avatar={null} />
        <PostContent image={image} title={title} />
        <PostFooter id={id} title={title} likesCount={likesCount} />
      </article>
    </div>
  );
};

export default Post;
