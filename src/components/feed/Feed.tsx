'use client';

import { SafePost, SafeRecipe } from '@/types';
import Post from './Post';
import { useEffect, useState } from 'react';

interface FeedProps {
  initialPosts: SafePost[];
}

const Feed: React.FC<FeedProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<SafePost[]>([]);

  useEffect(() => {
    console.log('Feed.tsx: useEffect()');
    setPosts(initialPosts);
  }, [initialPosts]);
  return (
    <div className="flex flex-col items-center gap-4 w-full h-full">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
